"use client"
import React from 'react';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const NavLinks = ({ isMobileNav = false } : {isMobileNav?: boolean}) => {
    const pathname = usePathname();
    const userId = 1; 
     

    return (
        <div>
            <h1>nav links here </h1>
        </div>
    );
};

export default NavLinks;