//url: http://localhost:3000/api/users/signUp
//TODO fixed the objet assign to body, now only username, email and password

import prisma from "@/lib/components/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/lib/components/validation";
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const POST = async (request: NextRequest, res: NextResponse) => {
  try {
    const body = await request.json();
    const {password, userName, email} = SignupSchema.parse(body);
   // Check if email or username already exists
   const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  const existingUsername = await prisma.user.findUnique({
    where: { userName },
  });

  if (existingEmail) {
    return NextResponse.json({ message: 'User with this email already exists.' }, {status: 400});
  }

  if (existingUsername) {
    return NextResponse.json({ message: 'User with this username already exists.' }, {status: 400});
  }

    //TODO change to ts  const hashedPassword:string
    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });


    const token = jwt.sign({ userId: newUser.id }, String(secretKey), {
      expiresIn: "1h",
    });    
    // const data = NextResponse.json({newUser, token})
    // console.log(data,"data")

    //TODO should not send back password in response, use select
    return NextResponse.json({token});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};