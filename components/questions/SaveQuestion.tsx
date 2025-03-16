"use client"
import { toast } from '@/hooks/use-toast';
import { toggleSaveQuestion } from '@/lib/actions/collection.action';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

const SaveQuestion = ({ questionId,
     hasSaved: initialHasSaved, // Renamed to avoid confusion 
    }: { questionId : string;
        hasSaved: boolean;
    }) => {

    const session = useSession();
    const userId = session?.data?.user?.id;


    const [hasSaved, setHasSaved] = useState(initialHasSaved);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if(isLoading) return;
        if(!userId)
            return toast({
                title: "You need to be logged in to save question",
                variant: "destructive"
            });

      setIsLoading(true);

      try {
        const { success, data, error } = await toggleSaveQuestion({ questionId });

        if (!success) throw new Error(error?.message || "An error occurred" );

        setHasSaved(data?.saved ?? false);
        toast({
            title: `Question ${data?.saved ? "saved" : "unsaved"} successfully`,
        });
      } catch (error) {
        toast({
            title: "Error",
            variant: "destructive"
        })
      }finally {
        setIsLoading(false);
      } 
    }

    return (
        <Image
        src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg" }
        width={18}
        height={18}
        alt='save'
        className={`cursor-pointer ${isLoading && "opacity-50"}`}
        aria-label='Save question'
        onClick={handleSave}
        />
    );
};

export default SaveQuestion;