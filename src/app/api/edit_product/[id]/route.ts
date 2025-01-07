import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params; // Await the Promise to resolve `params`
        const body = await request.json();
        const { name, category, price } = body;

        await connectMongoDB();

        const data = await Product.findByIdAndUpdate(
            id,
            { name, category, price },
            { new: true } // Return the updated document
        );

        return NextResponse.json({ msg: "Updated Successfully", data });
    } catch (error) {
        return NextResponse.json(
            {
                error: String(error), // Ensure error is serializable
                msg: "Something Went Wrong",
            },
            {
                status: 400,
            }
        );
    }
}
