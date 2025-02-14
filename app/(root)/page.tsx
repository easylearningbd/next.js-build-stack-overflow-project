import { auth } from '@/auth';
import React from 'react';

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <h1 className='h1-bold'>Welcome to our home page </h1>
      <h1 className='h1-bold'>Welcome to our home page </h1>
      <h1 className='h1-bold'>Welcome to our home page </h1>
    </div>
  );
};

export default Home;