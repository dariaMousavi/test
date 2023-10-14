import prisma from "@/lib/components/prismadb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, {params}:{params: {id:string}}) => {
  try {
    const {id} = params
    const allMeals = await prisma.meal.findMany({
    where: {
      userId: id,
    },
   })
    return NextResponse.json({allMeals, status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'GET Error', error}, {status: 500})
  }
}
