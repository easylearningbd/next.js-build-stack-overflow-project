"use client"
import { formatNumber } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Params {
    upvotes: number;
    hasupVoted: boolean;
    downvotes: number;
    hasdownVoted: boolean
}

const Votes = ({upvotes,downvotes,hasupVoted,hasdownVoted }: Params) => {
    const session = useSession();
    const userId = session?.data?.user?.id;

    const [isLoading, setIsLoading] = useState(false); 

    const handleVote = async (voteType: "upvote" | "downvote") => {

    }

    return (
<div className='flex-center gap-2.5'>
    <div className='flex-center gap-1.5'>
        <Image 
            src={hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
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
            src={hasdownVoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
            width={18}
            height={18}
            alt='downvote'
            className={`cursor-pointer ${isLoading && "opacity-50"}`}
            aria-label='Downvote'
            onClick={() => !isLoading && handleVote("upvote")}  
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