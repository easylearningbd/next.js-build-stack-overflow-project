"use server";
import Question from "@/database/question.model";
import action from "../handlers/action";
import { AskQuestionSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from 'mongoose';

export async function createQuestion(
    params: CreateQuestionParams
) : Promise<ActionResponse<Question>> {

    const validationResult = await action({
        params,
        schema: AskQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags} = validationResult.params!;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const [question] = await Question.create(
            [{ title, content, author: userId }], {session}
        );

    if (!question) {
        throw new Error("Failed to create question");
    }


    } catch (error) {
        
    }




}