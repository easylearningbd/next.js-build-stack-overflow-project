"use client";

import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';

  interface Filter {
    name: string;
    value: string;
  }  

  interface Props {
    filters : Filter[];
    otherClasses?: string;
    containerClasses?: string;
  }

const CommonFilter = ({filters,otherClasses="",containerClasses="" } : Props) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const paramsFilter = searchParams.get("filter");


    return (
        <div>
            
        </div>
    );
};

export default CommonFilter;