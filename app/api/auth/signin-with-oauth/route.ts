import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-errors";
import slugify from "slugify";

export async function POST(request: Request){
    const {provider, providerAccountId,user} = await request.json();
    
    await dbConnect();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const validatedData = SignInWithOAuthSchema.safeParse({
            provider,
            providerAccountId, 
            user
        });

    if(!validatedData.success) 
        throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const {name, username, email, image} = user;

    const slugifiedUsername = slugify(username,{
        lower: true,
        strict: true,
        trim: true
    });
 


    } catch (error) {
        
    }




}