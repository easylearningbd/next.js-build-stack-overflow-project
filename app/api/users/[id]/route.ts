import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";


/// Get USER By ID DATA
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


/// Delete USER By ID  
export async function DELETE( _: Request, {params} : { params: Promise<{ id: string}>}) 
{
    const {id} = await params;
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }  
}

/// Update or Edit USER By ID  
export async function PUT( request: Request, {params} : { params: Promise<{ id: string}>}) 
{
    const {id} = await params;
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();

        const body = await request.json();
        const validateData = UserSchema.partial().parse(body);


        const updateUser = await User.findByIdAndUpdate(id,validateData ,{
            new: true,
        });

        if (!updateUser) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: updateUser }, { status: 200 });
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }  
}