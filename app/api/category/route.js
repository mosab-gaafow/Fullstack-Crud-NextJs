import { NextResponse } from "next/server";
import prisma from "../../../prisma/client"


export const POST = async(request) => {

    try{

       const body = await request.json();

    //    const isExists = await prisma.category.findUnique({where: {id: NextResponse.na}})

       const registerCategory = await prisma.category.create({data: body});

       return NextResponse.json(
        {message: "Registered Successful✅", registerCategory},
        {status: 200}
    );

    }catch(e){
        console.log("error at registering category", e);
        return NextResponse.json(
            {message: e.message},
            {status: 400}
        )
    }

}


// export const GET = async () => {

//     const categs = await prisma.category.findMany();

//     if(!categs) {
//         return NextResponse.json(
//             {message: "Sorry no categories found..."},
//             {status: 400}
//         )
//     }

//     return NextResponse.json(
//         {message: categs},
//         {status: 200}
//     )

// }

// in my frontend

export const GET = async () => {
    try {
        const categs = await prisma.category.findMany();

        if (!categs || categs.length === 0) {
            return NextResponse.json(
                { message: "Sorry, no categories found." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: categs },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error retrieving categories." },
            { status: 500 }
        );
    }
};
