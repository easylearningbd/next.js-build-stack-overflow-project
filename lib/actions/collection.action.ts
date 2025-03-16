"use server";

import { Collection, Question } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { CollectionBaseSchema, PaginatedSearchParamsSchema } from "../validations";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";

export async function toggleSaveQuestion( params: CollectionBaseParams) : Promise<ActionResponse<{ saved: boolean }>>{

    const validationResult = await action({
        params,
        schema: CollectionBaseSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { questionId } = validationResult.params!;
    const userId = validationResult.session?.user?.id;

    try {
        const question = await Question.findById(questionId);
        if (!question) throw new Error("Question not found");

        const collection = await Collection.findOne({
            question: questionId,
            author: userId
        });

    if (collection) {
        await Collection.findByIdAndDelete(collection._id);

        revalidatePath(ROUTES.QUESTION(questionId));
        return {
            success: true,
            data: {
                saved: false,
            },
        };
    }

    await Collection.create({
        question: questionId,
        author: userId
    });
    revalidatePath(ROUTES.QUESTION(questionId));

    return {
        success: true,
        data: {
            saved: true,
        },
    }; 
    } catch (error) {
        return handleError(error) as ErrorResponse;
    } 

}




export async function hasSavedQuestion( params: CollectionBaseParams) : Promise<ActionResponse<{ saved: boolean }>>{

    const validationResult = await action({
        params,
        schema: CollectionBaseSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { questionId } = validationResult.params!;
    const userId = validationResult.session?.user?.id;

    try { 

        const collection = await Collection.findOne({
            question: questionId,
            author: userId
        });

        return {
            success: true,
            data: {
                saved: !!collection,
            },
        }; 
     
    } catch (error) {
        return handleError(error) as ErrorResponse;
    } 

}

export async function getSavedQuestions( params: PaginatedSearchParams) : Promise<ActionResponse<{ collection: Collection[]; isNext: boolean }>> {

    const validationResult = await action({
        params,
        schema: PaginatedSearchParamsSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const userId = validationResult.session?.user?.id;
    const { page = 1, pageSize = 10, query,filter} = params;

    const skip = (Number(page) -1 ) * pageSize;
    const limit = pageSize;

    const sortOptions = Record<string, Record<string, 1 | - 1>> = {
        mostrecent: { "question.createdAt": -1},
        oldest: { "question.createdAt": 1},
        mostvoted: { "question.upvotes": -1},
        mostviewed: { "question.views": -1},
        mostanswered: { "question.answers": -1}, 
    };

    const sortCriteria = sortOptions[filter as keyof sortOptions] || {
        "question.createdAt": -1
    };

    try {
        
    } catch (error) {
        
    }


}



