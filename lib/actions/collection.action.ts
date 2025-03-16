"use server";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { CollectionBaseSchema } from "../validations";

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

        
        
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }


}