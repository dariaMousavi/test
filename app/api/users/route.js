//url: http://localhost:3000/api/users

import prisma from '@/lib/components/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'GET Error', error }, { status: 500 });
  }
};
