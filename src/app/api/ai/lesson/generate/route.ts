import initAdminBlockchainConnection from "@/lib/blockchain";
import { CONTRACTID } from "@/lib/config";
import connectDB from "@/lib/db";
import {
  GEMINI_GEN_CONFIG,
  GEMINI_GEN_TEXT_CONFIG,
  GEMINI_MODEL,
  GEMINI_SAFETY_CONFIG,
  GEMINI_MODEL as model,
} from "@/lib/geminiConfig";
import AICourseHistory from "@/models/AICourseHistory";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { course_id, lesson_id, mentor_id } = await request.json();

  if (!course_id) {
    return NextResponse.json(
      { message: "Please provide course_id" },
      { status: 400 }
    );
  }

  if (!lesson_id) {
    return NextResponse.json(
      { message: "Please provide lesson_id" },
      { status: 400 }
    );
  }

  if (!mentor_id) {
    return NextResponse.json(
      { message: "Please provide mentor_id" },
      { status: 400 }
    );
  }

  const lessonId: number = Number(lesson_id);

  try {
    // Initialize Near Blockchain Connection
    console.log("Connecting to Near Blockchain...");
    const ayoubNearAccount = await initAdminBlockchainConnection();

    console.log(
      "Connected to Near Blockchain With account: ",
      ayoubNearAccount.accountId
    );

    console.log(`Getting Lesson ${lesson_id}...`);
    // check if the lesson content is already generated in the blockchain
    let lesson = await ayoubNearAccount.viewFunction({
      contractId: CONTRACTID,
      methodName: "get_lesson_by_id",
      args: { lesson_id: lessonId },
    });

    if (!lesson) {
      return NextResponse.json(
        {
          message: `Lesson ${lesson_id} not found`,
        },
        {
          status: 404,
        }
      );
    }

    console.log("Lesson Found: ", lesson);

    if (lesson.article && lesson.article.length > 0) {
      return NextResponse.json(
        {
          message: `Lesson ${lesson_id} already has content`,
          lesson,
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      `Generate Lesson ${lesson_id} content for Course ${course_id}...`
    );

    // Get the AI Course History
    console.log("Getting AI Course History...");

    await connectDB();

    const aiCourseHistory = await AICourseHistory.findOne({
      course_id,
      mentor_id,
    });

    if (!aiCourseHistory) {
      return NextResponse.json(
        {
          message: `AI History not found for Course ${course_id}`,
        },
        {
          status: 404,
        }
      );
    }

    console.log("AI Course History Found: ", aiCourseHistory);

    const chat = GEMINI_MODEL.startChat({
      generationConfig: GEMINI_GEN_TEXT_CONFIG,
      safetySettings: GEMINI_SAFETY_CONFIG,
      history: aiCourseHistory.chatHistory,
    });

    const prompt = `Generate a comprehensive and easily digestible plain text content for the lesson titled "${lesson.title}". The content should be thorough yet accessible, aimed at providing a deep understanding of the subject matter. Structure the content into 6 or more separate paragraphs ensuring clarity and coherence throughout.Return Response in Markdown format. Return only the content.`;

    try {
      const result = await chat.sendMessage(prompt);
      const lessonResponse = result.response.text();

      console.log("Lesson response :", lessonResponse);
      // parse the lesson response to json
      const lessonContent = lessonResponse.trim();

      console.log("Lesson Content: ", lessonContent);

      // check if there is any error in the lesson content
      if (!lessonContent) {
        return NextResponse.json(
          { message: "Invalid lesson content" },
          {
            status: 400,
          }
        );
      }

      console.log("Lesson Content : ", lessonContent);

      console.log("Lesson Generated Successfully!");

      // save the new chatHistory
      const chatHistory = await chat.getHistory();
      aiCourseHistory.chatHistory = chatHistory;
      await aiCourseHistory.save();

      // save the lesson content to the blockchain
      console.log("Saving Lesson Content to Blockchain...");
      await ayoubNearAccount.functionCall({
        contractId: CONTRACTID,
        methodName: "update_lesson_by_admin",
        args: {
          lesson_id: lessonId,
          title: lesson.title,
          description: lesson.description,
          video_url: lesson.video_url,
          article: lessonContent,
          order: lesson.order,
          with_ai: true,
          updated_at: new Date().getTime(),
        },
        gas: "300000000000000",
      });

      const updatedLesson = await ayoubNearAccount.viewFunction({
        contractId: CONTRACTID,
        methodName: "get_lesson_by_id",
        args: { lesson_id: lessonId },
      });

      console.log("Lesson Content Saved Successfully!");

      return NextResponse.json(
        {
          message: "Lesson content generated",
          lesson: updatedLesson,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Gemini API Error" },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
