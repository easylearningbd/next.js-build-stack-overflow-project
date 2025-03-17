import QuestionCard from '@/components/cards/QuestionCard';
import DataRenderer from '@/components/DataRenderer';
import CommonFilter from '@/components/filters/CommonFilter';
import HomeFilter from '@/components/filters/HomeFilter';
import Pagination from '@/components/Pagination';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import { CollectionFilters } from '@/constants/filters';
import ROUTES from '@/constants/routes'; 
import { EMPTY_QUESTION } from '@/constants/states';
import { getSavedQuestions } from '@/lib/actions/collection.action'; 
import Link from 'next/link';
import React from 'react';

  
interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>
}
 

const Collection = async ({searchParams}: SearchParams) => { 
  
  const { query, filter ,page, pageSize} = await searchParams;

  const { success, data, error} = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query: query || "",
    filter: filter || "",

  });

  const { collection,isNext } = data || {};
 

  return (
    <> 
      <h1 className='h1-bold text-dark100_light900'>Saved Questions</h1>
       
    <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
      <LocalSearch
        route={ROUTES.COLLECTION}
        imgSrc="/icons/search.svg"
        placeholder="Search questions..." 
        otherClasses="flex-1"      
      />

        <CommonFilter
        filters={CollectionFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
         
      />

    </div>
 
     <DataRenderer
      success={success}
      error={error}
      data={collection}
      empty={EMPTY_QUESTION}
      render={(collection) => (
        <div className='mt-10 flex w-full flex-col gap-6'>
        {collection.map((item) => ( 
          <QuestionCard key={item._id} question={item.question} />
        ))}
      </div>
      )} 
     /> 
      <Pagination page={page} isNext={isNext || false} /> 
    </>
  );
};

export default Collection;