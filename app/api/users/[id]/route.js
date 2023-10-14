//url: http://localhost:3000/api/users/id

import prisma from "@/lib/components/prismadb";
import { NextResponse } from "next/server"



export const GET = async (request, { params }) => {
    try {

        const { id } = params;
       
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user){
            return NextResponse.json(
                {message: "User not found", error},
                {status: 404}
            )
        }

        return NextResponse.json(user);

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "GET Error", error}, {status:500})
    }
}


export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {userName, email, password} = body;

        const { id } = params;
    
        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                userName,
                email, 
                password
            }
        })

        if(!updateUser){
            return NextResponse.json(
                {message: "update Error", error},
                {status: 404}
            )
        }

        return NextResponse.json(updateUser);


    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "PATCH Error", error}, {status:500})
    }
}

export const DELETE = async (request, { params }) => {
    try {

        const { id } = params;

        console.log(params.id)
       
       await prisma.user.delete({
            where: {
                id
            }
        })


        return NextResponse.json("User has been deleted");

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "DELETE Error", error}, {status:500})
    }
}