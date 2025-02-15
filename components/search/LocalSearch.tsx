import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';

interface Props {
    route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string
}

const LocalSearch = ({ route,imgSrc,placeholder,otherClasses }: Props) => {
    return (
        <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
        <Image
            src={imgSrc}
            width={24}
            height={24}
            alt='Search'
            className='cursor-pointer' 
        />
        <Input type='text' placeholder={placeholder} className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none' /> 
        </div>
    );
};

export default LocalSearch;