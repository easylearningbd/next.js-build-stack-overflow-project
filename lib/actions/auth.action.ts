"use server";

import mongoose from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignInSchema } from "../validations";


export async function signUpWithCredentials( params: AuthCredentials) : Promise<ActionResponse> {
    const validationResult = await action({ params, schema: SignInSchema});

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { name, username, email, password } = validationResult.params!;

    const session = await mongoose.startSession();
    session.startTransaction(); 


}