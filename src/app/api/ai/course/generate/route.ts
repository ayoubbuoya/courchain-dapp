import connectDB from "@/lib/db";
import {
  GEMINI_GEN_CONFIG,
  GEMINI_SAFETY_CONFIG,
  GEMINI_MODEL as model,
} from "@/lib/geminiConfig";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Module from "@/models/module";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mentorId } = await request.json();

  if (!topic) {
    return new Response("Please provide topic", { status: 400 });
  }

  if (!mentorId) {
    return new Response("Please provide mentorId", { status: 400 });
  }

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
    ]
}.Course Description should be short and concise.`;

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response;

    let genCourse = response.text();
    console.log("Course Generated Successfully!");
    // console.log("Course generated: ", genCourse);
    genCourse = genCourse
      .replace("```", "")
      .replace("json", "")
      .replace("JSON", "");
    // console.log("Course After Cleaning : ", genCourse);

    const chatHistory = await chat.getHistory();
    // console.log("Chat History: ", chatHistory);

    try {
      const course = JSON.parse(genCourse);
      console.log("Course JSON: ", course);
      console.log("Saving Course to DB...");

      await connectDB();

      const modules = [];

      for (let i = 0; i < course.modules.length; i++) {
        const courseModule = course.modules[i];
        const lessons = [];

        for (let j = 0; j < courseModule.lessons.length; j++) {
          const lesson = courseModule.lessons[j];
          const newLesson = new Lesson({
            title: lesson.title,
            order: lesson.order,
            withAI: true,
          });
          await newLesson.save();
          lessons.push(newLesson._id);
        }

        const newModule = new Module({
          title: courseModule.title,
          order: courseModule.order,
          withAI: true,
          AIChatHistory: chatHistory,
          lessons,
        });
        await newModule.save();
        modules.push(newModule._id);
      }

      // Save the course to the database
      const newCourse = new Course({
        title: course.title,
        duration: course.duration,
        level: course.level,
        tags: course.tags,
        requirements: course.requirements,
        objectives: course.objectives,
        mentors: [mentorId],
        withAI: true,
        AIChatHistory: chatHistory,
        modules,
      });

      await newCourse.save();
      console.log("Course saved to db successfully");

      return NextResponse.json({
        message: "Course generated successfully",
        course: course,
        chatHistory: chatHistory,
        courseId: newCourse._id,
        modulesIds: modules,
      });
    } catch (error) {
      console.log("Error in JSON parsing: ", error);
      return new Response("Failed to generate course", { status: 500 });
    }
  } catch (e) {
    return new Response("Failed to generate course", { status: 500 });
  }
}
