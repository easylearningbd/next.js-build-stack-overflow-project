import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";


/// Get USER ID DATA
export async function GET( _: Request, {params} : { params: Promise<{ id: string}>}) 
{
    const {id} = await params;
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();
        const user = await User.findById(id);
        if (!user) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }  
}