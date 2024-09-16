import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";


export const POST = async (request) => {

    try{

        const body = await request.json();
        const {categoryId, name} = body;

        if(!categoryId) {
            return NextResponse.json(
                {message: "CategoryId is required.."},
                {status: 400}
            )
        }

        const isExists = await prisma.category.findUnique({where: {id: categoryId}});
        if(!isExists) {
            return NextResponse.json(
                {message: "No Id Found with this categoryId"}
            )
        }
        
        // const isProductExists = await prisma.product.findUnique({where: { name: name }});  

        // if(isProductExists) {
        //     return NextResponse.json(
        //         {message: "This Product name Already Exists"}
        //     )
        // }

        const registerProduct = await prisma.product.create({data: body});
        
           

        return NextResponse.json(
            {message: "Product Registered Successful✅"},
            {status: 200}
        );




    }catch(e){
        console.log("error at registering product..", e);
        return NextResponse.json(
            {message: e.message}
        )
    }

}


// export const GET = async() => {

//     const products = await prisma.product.findMany();

//     if(!products) {
//         return NextResponse.json(
//             {message: "No products found sorry.."},
//             {status: 400}
//         )
//     }

//     return NextResponse.json(
//         {message: products},
//         {status: 200}
//     )

// }


// frontend
//  
export const GET = async () => {
    const products = await prisma.product.findMany({
        include: {
            category: true,  // Ensure that category data is included
        }
    });

    if (!products || products.length === 0) {
        return NextResponse.json(
            { message: "No products found sorry.." },
            { status: 400 }
        );
    }

    return NextResponse.json(products, { status: 200 });
}
