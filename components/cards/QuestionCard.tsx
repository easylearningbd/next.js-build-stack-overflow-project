import ROUTES from '@/constants/routes';
import { getTimeStamp } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import TagCard from './TagCard';

interface Props {
    question : Question;
}

const QuestionCard = ({ question: { _id,title,tags,author,upvotes,answers,views,createdAt },} : Props) => {
    return (
<div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
    <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
                {getTimeStamp(createdAt)}
            </span>
        <Link href={ROUTES.QUESTION(_id)}>
         <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>{title}</h3> 
        </Link> 
        </div> 
    </div>

    <div className='mt-3.5 flex w-full flex-wrap gap-2'>
        {
            tags.map(( tag:Tag ) => (
                <TagCard key={tag._id} _id={tag._id} name={tag.name} compack />
            ))
        } 
    </div>

    <div className='flex-between mt-6 w-full flex-wrap gap-3'>

    </div>


    
</div>
    );
};

export default QuestionCard;