import connectDB from "@/lib/db";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    // get all courses from the database
    const courses = await Course.find();
    return NextResponse.json({
      success: true,
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
