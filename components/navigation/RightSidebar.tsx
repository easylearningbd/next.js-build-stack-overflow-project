import ROUTES from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TagCard from '../cards/TagCard';
import { getHotQuestions } from '@/lib/actions/question.action';
import DataRenderer from '../DataRenderer';
import { getTopTags } from '@/lib/actions/tag.action';
  

const RightSidebar = async () => {
    const { success, data: hotQuestions, error} = await getHotQuestions();

    const { success: tagSuccess, data: tags, error: tagError} = await getTopTags();

    return (
<section className='pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-1 p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
    <div>
        <h3 className='h3-bold text-dark200_light_900'>Top Questions</h3>
    <div className='mt-7 flex w-full flex-col gap-[30px]'>
        
        <DataRenderer
            data={hotQuestions}
            empty={{
                title: "No Question Found",
                message: "No question have been asked yet"
            }}
            success={success}
            error={error}
            render={(hotQuestions ) => (
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
            { hotQuestions.map(( { _id,title }) => (
            <Link 
                key={_id}
                href={ROUTES.QUESTION(_id)}
                className='flex cursor-pointer items-center justify-between gap-7' >
            <p className='body-medium text-dark500_light700'>
                {title}
            </p>
        <Image
            src="/icons/chevron-right.svg"
            alt='Chevron'
            width={20}
            height={20}
            className='invert-colors' 
        />   
            </Link>
          ))  
        } 
                </div> 
            )}  
        /> 
        
    </div> 
    </div>

    <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>

        <DataRenderer
            data={tags}
            empty={{
                title: "No Tags Found",
                message: "No Tags have been created yet"
            }}
            success={tagSuccess}
            error={tagError}
            render={(tags ) => (
                <div className='mt-7 flex flex-col gap-4'>
            {tags.map(( { _id, name, questions}) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compack 
                />
            ))}

        </div>

            )}
        
        /> 
        
    </div>
    
</section>
    );
};

export default RightSidebar;