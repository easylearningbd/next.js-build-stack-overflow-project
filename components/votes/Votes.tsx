"use client"
import { toast } from '@/hooks/use-toast';
import { createVote } from '@/lib/actions/vote.action';
import { formatNumber } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useState } from 'react';

interface Params {
    targetType: "question" | "answer";
    targetId: string;
    upvotes: number; 
    downvotes: number; 
    hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({upvotes,downvotes,hasVotedPromise,targetType,targetId }: Params) => {
    const session = useSession();
    const userId = session?.data?.user?.id;

    const { success, data } = use(hasVotedPromise);

    const [isLoading, setIsLoading] = useState(false); 

    const { hasUpvoted, hasDownvoted } =  data || {};

    const handleVote = async (voteType: "upvote" | "downvote") => {
        if(!userId)
            return toast({
            title: "Please login to vote",
            description: "Only logged-in users can vote",
         });
         setIsLoading(true);

    try {

        const result = await createVote({
            targetId,
            targetType,
            voteType
        });

        if (!result.success) {
            return toast({
                title: "Failed to vote",
                description: result.error?.message,
                variant: "destructive"
            });
        } 

        const successMessage = 
        voteType === "upvote"
        ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
        : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;

    toast({
        title: successMessage,
        description: "Your vote has been recorded",
    });
        
    } catch (error) {
        toast({
            title: "Faidled to vote",
            description: "An error occurred while voting",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
     } 
    }

    return (
<div className='flex-center gap-2.5'>
    <div className='flex-center gap-1.5'>
        <Image 
            src={success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
            width={18}
            height={18}
            alt='upvote'
            className={`cursor-pointer ${isLoading && "opacity-50"}`}
            aria-label='Upvote'
            onClick={() => !isLoading && handleVote("upvote")}  
        />

        <div className='flex-center background-light700_dark400 min-w-5 rounded-sm p-1'>
            <p className='suble-medium text-dark400_light900'>
                {formatNumber(upvotes)}
            </p> 
        </div> 
    </div> 


    <div className='flex-center gap-1.5'>
        <Image 
            src={success && hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
            width={18}
            height={18}
            alt='downvote'
            className={`cursor-pointer ${isLoading && "opacity-50"}`}
            aria-label='Downvote'
            onClick={() => !isLoading && handleVote("downvote")}  
        />

        <div className='flex-center background-light700_dark400 min-w-5 rounded-sm p-1'>
            <p className='suble-medium text-dark400_light900'>
                {formatNumber(downvotes)}
            </p> 
        </div> 
    </div>  

</div>
    );
};

export default Votes;