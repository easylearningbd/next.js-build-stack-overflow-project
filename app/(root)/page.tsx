import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import handleError from '@/lib/handlers/error';
import { ForbiddenError, NotFoundError, ValidationError } from '@/lib/http-errors';
import Link from 'next/link';
import React from 'react';

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

// query=ariyan
interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>
}

  const test = async () => {
    try {
      throw new ValidationError({
        title: ["Required"],
        tags: [' "Javascript" is not a valid tag' ],
      })
    } catch (error) {
      return handleError(error);
    }
  }



const Home = async ({searchParams}: SearchParams) => { 

  const result = await test();
  console.log(result);




  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter(( question ) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
      const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
      return matchesQuery && matchesFilter;
  });

  return (
    <>
    <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
      <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
      <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900' asChild>
        <Link href={ROUTES.ASK_QUESTION}> Ask a Question </Link> 
      </Button> 
    </section>

    <section className='mt-11'>
      <LocalSearch
        route="/"
        imgSrc="/icons/search.svg"
        placeholder="Search questions..." 
        otherClasses="flex-1"      
      />
    </section>

     <HomeFilter/>

    <div className='mt-10 flex w-full flex-col gap-6'>
      {filteredQuestions.map((question) => ( 
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>

       
    </>
  );
};

export default Home;