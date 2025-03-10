"use server"

import mongoose from "mongoose";
import { IAnswerDoc } from "@/database/answer.model";
import action from "../handlers/action";
import { AnswerServerSchema } from "../validations";
import handleError from "../handlers/error";

export async function createAnswer( params: CreateAnswerParams) : Promise<ActionResponse<IAnswerDoc>> {

    const validationResult = await action({
        params,
        schema: AnswerServerSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { content,questionId } = validationResult.params!;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
    } catch (error) {
        
    } 

}