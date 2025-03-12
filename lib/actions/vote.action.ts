"use server"
import mongoose, { ClientSession } from "mongoose";
import action from "../handlers/action"
import handleError from "../handlers/error";
import { CreateVoteSchema, UpdateVoteCountSchema } from "../validations"
import { Answer, Question } from "@/database";


export async function updateVoteCount( params: UpdateVoteCountParams, session?: ClientSession) : Promise<ActionResponse> {

    const validationResult = await action({
        params,
        schema: UpdateVoteCountSchema, 
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { targetId, targetType, voteType,change } = validationResult.params!;

    const Model = targetType === "question" ? Question : Answer;
    const voteField = voteType === "upvote" ? "upvote" : "downvote";

    try {
        const result = await Model.findByIdAndUpdate(
            targetId,
            { $inc: {[voteField]: change} },
            { new: true, session}
        );

        if(!result)
            return handleError( 
        new Error("Failed to update vote count")) as ErrorResponse;

        return { success: true }; 

    } catch (error) {
        return handleError(error) as ErrorResponse;
    } 
}


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
