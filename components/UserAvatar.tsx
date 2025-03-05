import ROUTES from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';

interface Props {
    id: string;
    name: string;
    imageUrl?: string | null;
    className?: string
}

const UserAvatar = ({ id, name, imageUrl, className= "h-9 w-9" } : Props) => {
    const initials = name
        .split("")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0,2);

    return (
<Link href={ROUTES.PROFILE(id)}>
    <Avatar className={className}>
        {
            imageUrl ? (
            <Image
                src={imageUrl}
                alt={name}
                className='object-cover'
                width={36}
                height={36}
                quality={100}
                    /> 
            ) : (
    <AvatarFallback className='primary-gradient font-space-grotesk font-bold tracking-wider text-white'>
        {initials}
    </AvatarFallback>
            ) 
        }

    </Avatar>
    
</Link>
    );
};

export default UserAvatar;