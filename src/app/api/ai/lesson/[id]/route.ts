import connectDB from "@/lib/db";
import Lesson from "@/models/lesson";
import Module from "@/models/module";
import { NextRequest, NextResponse } from "next/server";
import {
  GEMINI_GEN_CONFIG,
  GEMINI_SAFETY_CONFIG,
  GEMINI_MODEL as model,
} from "@/lib/geminiConfig";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lessonId = params.id;
  const { moduleId } = await request.json();

  if (!lessonId || !moduleId) {
    return new Response("Lesson ID and Module ID are required", {
      status: 400,
    });
  }

  await connectDB();

  try {
    const moduleDb = await Module.findById(moduleId);

    if (!moduleDb) {
      return new Response("Module not found", { status: 404 });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return new Response("Lesson not found", { status: 404 });
    }

    if (lesson.text && lesson.text.length > 0) {
      console.log("Lesson content already generated");
      return NextResponse.json({
        message: "Lesson content already generated",
        lesson: lesson,
      });
    }

    if (!moduleDb.withAI) {
      return new Response("AI is not enabled for this module", { status: 400 });
    }

    console.log("Generating content for lesson...");

    const chat = model.startChat({
      generationConfig: GEMINI_GEN_CONFIG,
      safetySettings: GEMINI_SAFETY_CONFIG,
      history: moduleDb.AIChatHistory,
    });

    const prompt = `Generate a comprehensive and easily digestible plain text content for the lesson titled "${lesson.title}" in the module "${moduleDb.title}". The content should be thorough yet accessible, aimed at providing a deep understanding of the subject matter. Structure the content into 6 or more separate paragraphs ensuring clarity and coherence throughout. Return only the content of the lesson.`;

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const lessonContent = response.text();
    console.log("Lesson Generated Successfully!");

    const chatHistory = await chat.getHistory();
    moduleDb.AIChatHistory = chatHistory;
    await moduleDb.save();

    console.log("Saving lesson content to db...");
    lesson.text = lessonContent;
    await lesson.save();
    console.log("Lesson content saved to db");

    return NextResponse.json({
      message: "Lesson content generated",
      lesson: lesson,
    });
  } catch (error) {
    console.error("Error generating content for lesson: ", lessonId, error);
    return new Response("Error generating content for lesson", { status: 500 });
  }
}
