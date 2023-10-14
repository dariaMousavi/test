//url: http://localhost:3000/api/users/login

import { hashPassword } from '../../../../lib/components/auth';
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/components/prismadb"; 
import { loginSchema } from "@/lib/components/validation";

interface SignInRequestBody {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body: SignInRequestBody = await req.json();
    // Validate the request body
    const { email, password } = loginSchema.parse(body);
    console.log(email, password)
    // Find the user by username using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: "Authentication failed." }, { status: 401 })
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Authentication failed." }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY || "Secret", {
      expiresIn: "1h",
    });

    // Return the token in the response
    return NextResponse.json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "An error occurred during login." }, {status: 500});
  }
}