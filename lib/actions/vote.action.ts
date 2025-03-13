"use server"
import mongoose, { ClientSession } from "mongoose";
import action from "../handlers/action"
import handleError from "../handlers/error";
import { CreateVoteSchema, HasVotedSchema, UpdateVoteCountSchema } from "../validations"
import { Answer, Question, Vote } from "@/database";


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
        const existingVote = await Vote.findOne({
            author: userId,
            actionId: targetId,
            actionType: targetType,
        }).session(session);

    if (existingVote) {
        if (existingVote.voteType === voteType) {
            // If the user has already voted with the same voteType, remove the vote
            await Vote.deleteOne({ _id:existingVote._id }).session(session);
            await updateVoteCount(
                { targetId, targetType, voteType, change: -1},
                session
            );
            
        }else {
            /// If the user has already voted with a dfferent voteType, Update the vote
            await Vote.findByIdAndUpdate(
                existingVote._id,
                { voteType },
                {new: true, session}
            );
            await updateVoteCount(
                { targetId, targetType, voteType, change: 1},
                session
            );
        }
    } else {
        // if the user has not voted yet, create a new vote
        await Vote.create([{ targetId, targetType, voteType, change: 1}],{session});
        await updateVoteCount(
            {targetId, targetType, voteType, change: 1},
            session
        );
    }
    await session.commitTransaction();
    session.endSession();
    return {success: true};
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return handleError(error) as ErrorResponse
    } 
 
 }



 export async function hasVoted( params: HasVotedParams) : Promise<ActionResponse<HasVotedResponse>> {

    const validationResult = await action({
        params,
        schema: HasVotedSchema,
        authorize: true
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const{ targetId, targetType } = validationResult.params!;
    const userId = validationResult.session?.user?.id;

    try {
        const vote = await Vote.findOne({
            author: userId,
            actionId: targetId,
            actionType: targetType,
        });

        if (!vote) {
            return {
                success: false,
                data: { hasUpvoted: false, hasDownvoted: false}
            };
        }

    return {
        success: true,
        data: {
            hasUpvoted: vote.voteType === "upvote",
            hasDownvoted: vote.voteType === "downvote",
        },
    };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    } 
 }
