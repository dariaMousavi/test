import prisma from "@/lib/components/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  const res = await prisma.user.findUnique({
    where: {
      id: '652560db8f962632ac04d15f'
    }, 
    include: {
      exerciseHistory: true,
      mealHistory: true
    }
  })
  console.log(res)
  return NextResponse.json(res)
}
