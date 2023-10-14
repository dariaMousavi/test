import prisma from '@/lib/components/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { Meal } from '@/lib/types';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { ingredients, userId, type, totalCals } = body;
    const newMeal = await prisma.meal.create({
      data: {
        ingredients,
        userId,
        type,
        totalCals,
      },
    });
    return NextResponse.json(newMeal, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'GET Error', error }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const body = await request.json();
    const { id } = body;
    const deletedItem = await prisma.meal.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ deletedItem, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Delete request failed', error },
      { status: 500 }
    );
  }
};
