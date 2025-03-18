import { auth } from '@/auth';
import UserAvatar from '@/components/UserAvatar';
import { getUser } from '@/lib/actions/user.action';
import { notFound } from 'next/navigation';
import React from 'react';

const Profile = async ({ params }: RouteParams) => {
    const {id} = await params;
    if (!id) notFound();

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

    </div>

    </div>

</section>
        
</>
    );
};

export default Profile;