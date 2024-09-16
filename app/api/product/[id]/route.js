import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"


export const GET = async( req, {params}) => {

    const getProduct = await prisma.product.findUnique({where: {id: params.id}});

    if(!getProduct) {
        return NextResponse.json(
            {message: "No Product found with this Id.."},
            {status: 400}
        )
    }

    return NextResponse.json(
        {message: getProduct},
        {status: 200}
    )


}


// update

export const PUT = async (req, {params}) => {

    try{

        const body = await req.json(); 

        const isExists = await prisma.product.findUnique({where: {id: params.id}});
        if(!isExists) {
            return NextResponse.json(
                {message: "No Product found with this Id.."}
            )

        }

        const updateProduct = await prisma.product.update({where: {id: params.id}, data: {
            name: body.name,
            description: body.description,
            price: body.price,
            categoryId: body.categoryId
        }});

        return NextResponse.json(
            {message: "Product Updated Successful✅", product: updateProduct},
            {status: 200}
        );


    }catch(e) {
        console.log("Error at updating Product", e)
        return NextResponse.json(
            {message: e.message},
            {status: 400}
        )
    }


}


export const DELETE = async (req,{params}) => {

    const isExists = await prisma.product.findUnique({where: {id: params.id}});

    if(!isExists) {
        return NextResponse.json(
            {message: "No Product Found with this Id."},
            {status: 400}
        )
    }

    const deleteProduct = await prisma.product.delete({where: {id: params.id}});

    return NextResponse.json(
        {message: "Product Deleted Successful✅"}
    )


}
