import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params; // Await the Promise to get `id`

        await connectMongoDB();

        await Product.findByIdAndDelete(id);

        return NextResponse.json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        return NextResponse.json(
            {
                error: String(error), // Ensure `error` is a string or JSON-serializable
                msg: "Something Went Wrong",
            },
            {
                status: 400,
            }
        );
    }
}
