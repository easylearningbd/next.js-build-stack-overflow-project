import Image from 'next/image';
import React from 'react';

interface Props {
    totalQuestions:number;
    totalAnswers: number;
    badges: BadgeCounts;
}

interface StatsCardProps{
    imgUrl: string;
    value: number;
    title: string;
}

const StartsCard = ({imgUrl,value,title }: StatsCardProps) => (
    <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
        <Image src={imgUrl} alt={title} width={40} height={50} />
        <div>
     <p className='paragraph-semibold text-dark200_light900'>{value}</p>
     <p className='body-medium text-dark300_light700'>{title}</p> 
        </div>

    </div>
)



const Stats = ({ totalQuestions, totalAnswers,badges }: Props) => {
    return (
<div className='mt-3'>
    <h4 className='h3-semibold text-dark200_light900'>Stats</h4>
    <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>


   <StartsCard
    imgUrl='/icons/gold-medal.svg'
    value={badges.GOLD}
    title='Gold Badges'
   />
   <StartsCard
    imgUrl='/icons/silver-medal.svg'
    value={badges.SILVER}
    title='Silver Badges'
   />
   <StartsCard
    imgUrl='/icons/bronze-medal.svg'
    value={badges.BRONZE}
    title='Bronze Badges'
   />


    </div> 
</div>
    );
};

export default Stats;