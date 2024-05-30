import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    const hashedPassword = await hash(password, 15);

    await connectDB();
    const userr = await User.create({
      name,
      email,
      username: email.split("@")[0],
      password: hashedPassword,
      role,
    });

    console.log("User created : ", userr);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }

  return NextResponse.json({
    message: "success",
  });
}
