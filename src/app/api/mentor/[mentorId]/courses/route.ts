import connectDB from "@/lib/db";
import Course from "@/models/course";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { mentorId: string } }
) {
  const { mentorId } = params;

  console.log("Mentor ID : ", mentorId);

  try {
    await connectDB();

    const mentor = await User.findById(mentorId);

    if (!mentor) {
      return new Response("Mentor not found", { status: 404 });
    }

    if (mentor.role !== "mentor") {
      return new Response("User is not a mentor", { status: 400 });
    }

    // get courses that have mentorId in the array of course.mentors
    const courses = await Course.find({
      mentors: mentorId,
    });

    console.log("Created Courses : By Mentor : ", mentor.name, " : ", courses);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error : ", error);
    return NextResponse.error();
  }
}
