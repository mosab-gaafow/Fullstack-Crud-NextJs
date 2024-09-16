import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"


export const GET = async (req, {params}) => {

    const categs = await prisma.category.findUnique({where: {id: params.id}});

    if(!categs) {
        return NextResponse.json(
            {message: "No category found with this Id..."},
            {status: 400}
        )
    }

    return NextResponse.json(
        {message: categs},
        {status: 200}
    )


}

// Update

export const PUT = async (req, {params}) => {

    try{

        const body = await req.json();

        const isExists = await prisma.category.findMany();
        if(!isExists) {
            return NextResponse.json(
                {message: "No Category Found with this Id.."},
                {status: 400}
            )
        }


       const updateCategory = await prisma.category.update({where: {id: params.id}, data: {
        name: body.name
       }});

       return NextResponse.json(
        {message: "Updated Successful✅", category: updateCategory},
        {status: 200}
       )

       

    }catch(e){
        console.log("error at updating",e)
        return NextResponse.json({message: e.message}),
        {status: 400}
    }

}


export const DELETE = async(req, {params}) => {

    const isExists = await prisma.category.findUnique({where: {id: params.id}});

    if(!isExists) {
        return NextResponse.json(
            {message: "No Post Found with this Id.."},
            {status: 400}
        )
    }

    const deleteCategory = await prisma.category.delete({where: {id: params.id}});

    return NextResponse.json(
        {message: "Category Deleted Successful✅"}
    )

}
