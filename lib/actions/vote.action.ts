"use server"
import mongoose from "mongoose";
import action from "../handlers/action"
import handleError from "../handlers/error";
import { CreateVoteSchema } from "../validations"

export async function createVote( params: CreateVoteParams)
 : Promise<ActionResponse> {

    const validationResult = await action({
        params,
        schema: CreateVoteSchema,
        authorize: true
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { targetId, targetType, voteType } = validationResult.params!;
    const userId = validationResult.session?.user?.id;

    if(!userId) handleError(new Error("Unauthorized")) as ErrorResponse;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return handleError(error) as ErrorResponse
    } 


 }
