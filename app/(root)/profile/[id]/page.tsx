import { auth } from '@/auth';
import ProfileLink from '@/components/user/ProfileLink';
import UserAvatar from '@/components/UserAvatar';
import { getUser, getUserQuestions, getUsersAnswers } from '@/lib/actions/user.action';
import { notFound } from 'next/navigation';
import React from 'react';
import dayjs from 'dayjs';
import { P } from 'pino';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Stats from '@/components/user/Stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataRenderer from '@/components/DataRenderer';
import QuestionCard from '@/components/cards/QuestionCard';
import Pagination from '@/components/Pagination';
import { EMPTY_ANSWERS, EMPTY_QUESTION } from '@/constants/states';
import AnswerCard from '@/components/cards/AnswerCard';


const Profile = async ({ params, searchParams }: RouteParams) => {
    const {id} = await params;
    if (!id) notFound();

    const { page, pageSize } = await searchParams;

    const loggedInUser = await auth();
    const { success, data, error} = await getUser({
        userId: id
    });

    if(!success)
        return (
     <div>
    <div className='h1-bold text-dark100_light900'>{error?.message}</div>
    </div>
    );

    const {user, totalQuestions,totalAnswers} = data!;
    // console.log(user);

    const {
        success: userQuestionsSuccess,
        data: userQuestions,
        error: userQuestionsError,
    } = await getUserQuestions({
        userId:id,
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 2
    });

    const {
        success: userAnswersSuccess,
        data: userAnswers,
        error: userAnswersError,
    } = await getUsersAnswers({
        userId:id,
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 2
    });

    const { questions, isNext: hasMoreQuestions} = userQuestions!;
    const { answers, isNext: hasMoreAnswers} = userAnswers!;
    
   const {_id, name, image, portfolio,location, createdAt, username, bio} = user;



    return (
<>
<section className='flex flex-col-reverse items-start justify-between sm:flex-row'>
    <div className='flex flex-col items-start gap-4 lg:flex-row'>
        <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className='size-[140px] rounded-full object-cover'
            fallbackClassName='text-6xl fond-bolder' 
        />

    <div className='mt-3'>
        <h2 className='h2-bold text-dark100_light900'>{name}</h2>
        <p className='paragraph-regular text-dark200_light800'>@{username}</p>

    <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
        {portfolio && (
            <ProfileLink
                imgUrl="/icons/link.svg"
                href={portfolio}
                title="Portfolio"
            />
        )}

        {location && (
            <ProfileLink imgUrl="/icons/location.svg" title="Location" />
        )}
        <ProfileLink
            imgUrl="/icons/calendar.svg"
            title={dayjs(createdAt).format("MMMM YYYY")}
        /> 
    </div> 

    {bio && (
            <p className='paragraph-regular text-dark400_light800'>{bio}</p>
        )} 
    </div> 
    </div>

    <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
        {loggedInUser?.user?.id === id && (
            <Link href="/profile/edit">
                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-12 min-w-44 px-4 py-3'>
                    Edit Profile 
                </Button> 
            </Link>
        )}

    </div> 
</section>

<Stats
    totalQuestions={totalQuestions}
    totalAnswers={totalAnswers}
    badges={{
        GOLD:0,
        SILVER:0,
        BRONZE:0
    }} 
/>

<section className='mt-10 flex gap-10'>
<Tabs defaultValue="top-posts" className="w-full">
  <TabsList className='bckground-light800_dark400 min-h-[42px] p-1'>
    <TabsTrigger value="top-posts" className='tab'>
        Top Posts
    </TabsTrigger>
    <TabsTrigger value="answers" className='tab'>
        Answers
    </TabsTrigger>
  </TabsList>
  <TabsContent value="top-posts" className='mt-5 flex w-full flex-col gap-6'>
    
  <DataRenderer
      success={userQuestionsSuccess}
      error={userQuestionsError}
      data={questions}
      empty={EMPTY_QUESTION}
      render={(hotQuesitons) => (
        <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.map((question) => ( 
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
      )} 
     /> 

    <Pagination page={page} isNext={hasMoreQuestions} />


  </TabsContent>

  <TabsContent value="answers" className='flex w-full flex-col gap-6'>
  <DataRenderer
      success={userAnswersSuccess}
      error={userAnswersError}
      data={answers}
      empty={EMPTY_ANSWERS}
      render={(answers) => (
        <div className='flex w-full flex-col gap-6'>
        {answers.map((answer) => ( 
          <AnswerCard key={answer._id} {...answer}
          content={answer.content.slice(0,100)}
          containerClasses="card-wrapper rounded-[10px] px-7 py-9 sm:px-11" 
          showReadMore
          />
        ))}
      </div>
      )} 
     /> 

    <Pagination page={page} isNext={hasMoreAnswers || false} />


  </TabsContent>
</Tabs> 

</section>


        
</>
    );
};

export default Profile;