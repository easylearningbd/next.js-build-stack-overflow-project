import { getTagQuestions } from '@/lib/actions/tag.action';
import React from 'react';

const page = async ({ params, searchParams }: RouteParams) => {
    const { id } = await params;
    const { page, pageSize, query } = await searchParams;

    const { success, data, error } = await getTagQuestions({
        tagId:id,
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query,
    });
 
    const { tag, questions} = data || {};
    console.log(tag,questions);
 

    return (
        <div>
            
        </div>
    );
};

export default page;