import initAdminBlockchainConnection from "@/lib/blockchain";
import { CONTRACTID } from "@/lib/config";
import connectDB from "@/lib/db";
import {
  GEMINI_GEN_CONFIG,
  GEMINI_SAFETY_CONFIG,
  GEMINI_MODEL as model,
} from "@/lib/geminiConfig";
import AICourseHistory from "@/models/AICourseHistory";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mentorId } = await request.json();
  console.log("Topic: ", topic);
  console.log("MentorId: ", mentorId);

  if (!topic) {
    return NextResponse.json(
      { message: "Please provide topic" },
      { status: 400 }
    );
  }

  if (!mentorId) {
    return NextResponse.json(
      { message: "Please provide mentorId" },
      { status: 400 }
    );
  }

  // Initialize Near Blockchain Connection
  console.log("Connecting to Near Blockchain...");
  const ayoubNearAccount = await initAdminBlockchainConnection();

  console.log(
    "Connected to Near Blockchain With account: ",
    ayoubNearAccount.accountId
  );

  // Generate the course
  console.log("Generating course for topic: ", topic);

  const chat = model.startChat({
    generationConfig: GEMINI_GEN_CONFIG,
    safetySettings: GEMINI_SAFETY_CONFIG,
    history: [],
  });

  const prompt = `Generate a course on ${topic}.The Course should have at least 5 modules.Each module should have at least 5 Lessons.Response should be a valid JSON object.Response should follows this Json structure: {
    "title": "Course Title",
    "description": "Course Description",
    "level": "Course Level",
    "duration": "Course Duration",
    "category": "Course Category",
    "requirements": [
        "Requirement 1",
        "Requirement 2",
        "Requirement 3",
        "Requirement 4",
        "Requirement 5"
    ],
    "objectives": [
        "Objective 1",
        "Objective 2",
        "Objective 3",
        "Objective 4",
        "Objective 5"
    ],
    "tags": [
        "Tag 1",
        "Tag 2",
        "Tag 3",
        "Tag 4",
        "Tag 5"
    ],
    "modules": [
        {
            "order": 1,
            "title": "Module Title",
            "description": "Module Description",
            "lessons": [
                {
                    "order": 1,
                    "title": "Lesson Title"
                }
            ]
        },
        {
            "order": 2,
            "title": "Module Title",
            "description": "Module Description",
            "lessons": [
                {
                    "order": 1,
                    "title": "Lesson Title"
                }
            ]
        }
  ]}.Course Description should be short and concise.`;

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response;

    let genCourse = response.text();
    console.log("Course Generated Successfully!");
    console.log("Course generated: ", genCourse);
    genCourse = genCourse
      .replace("```", "")
      .replace("json", "")
      .replace("JSON", "");
    // console.log("Course After Cleaning : ", genCourse);

    const chatHistory = await chat.getHistory();
    // console.log("Chat History: ", chatHistory);

    try {
      const course = JSON.parse(genCourse);
      // console.log("Course JSON: ", course);
      console.log("Saving Course to Blockchain...");

      console.log("Course: ", course);

      //save the course to the blockchain
      const result = await ayoubNearAccount.functionCall({
        contractId: CONTRACTID,
        methodName: "save_course_by_admin",
        args: {
          mentor_id: mentorId,
          title: course.title,
          description: course.description,
          level: course.level,
          duration: course.duration,
          category: course.category,
          requirements: course.requirements,
          objectives: course.objectives,
          with_ai: true,
          picture: "",
          price: 0,
          created_at: new Date().getTime(),
        },
      });

      const courseId = Buffer.from(
        result.status.SuccessValue,
        "base64"
      ).toString("utf-8");
      console.log("Result: ", result);

      console.log("Course Id : ", courseId);

      // save course modules to the blockchain
      const modules = course.modules;
      const modulesChains = [];

      console.log(`Saving ${modules.length} Modules to Blockchain...`);
      for (let i = 0; i < modules.length; i++) {
        console.log(`Create Module ${i + 1}...`);
        const module = modules[i];
        const result = await ayoubNearAccount.functionCall({
          contractId: CONTRACTID,
          methodName: "save_module_by_admin",
          args: {
            course_id: Number(courseId),
            order: module.order,
            title: module.title,
            description: module.description,
            status: "",
            with_ai: true,
            created_at: new Date().getTime(),
          },
        });

        console.log(`Module ${i + 1} Created Successfully!`);

        const decodedResult = Buffer.from(
          result.status.SuccessValue,
          "base64"
        ).toString("utf-8");

        const moduleChain = JSON.parse(decodedResult);
        console.log("Module Chain: ", moduleChain);

        modulesChains.push(moduleChain);

        const moduleId = moduleChain.id;

        console.log(`Create Module ${moduleId} Lessons...`);

        const lessons = module.lessons;
        for (let j = 0; j < lessons.length; j++) {
          const lesson = lessons[j];
          console.log(`Create Lesson ${j + 1}...`);
          const result = await ayoubNearAccount.functionCall({
            contractId: CONTRACTID,
            methodName: "save_lesson_by_admin",
            args: {
              module_id: Number(moduleId),
              order: lesson.order,
              title: lesson.title,
              description: lesson.description || "",
              video_url: "",
              article: "",
              with_ai: true,
              created_at: new Date().getTime(),
            },
          });
          console.log(`Lesson ${j + 1} Created Successfully!`);
        }

        console.log(`Module ${moduleId} Lessons Created Successfully!`);
      }

      console.log("Course Saved to Blockchain Successfully!");

      console.log("Saving the Chat History to Database...");

      await connectDB();

      const newAICourseHistory = new AICourseHistory({
        course_id: courseId,
        mentor_id: mentorId,
        chatHistory: chatHistory,
      });

      await newAICourseHistory.save();

      console.log("Chat History Saved to Database Successfully!");

      return NextResponse.json(
        {
          message: "Course Generated Successfully",
          courseId: courseId,
          course,
          modules: modulesChains,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.log(error);
      NextResponse.json(
        { message: "Internal Server Error" },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
