"use client";
   
import React, { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form"; 
import { ReloadIcon} from "@radix-ui/react-icons"
import { Button } from "../ui/button";
import {
  Form,
  FormControl, 
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema, AskQuestionSchema } from "@/lib/validations";
import { title } from "process";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { z } from "zod";
import TagCard from "../cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const AnswerForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editorRef = useRef<MDXEditorMethods>(null); 

    const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
        content: "", 
      },
    });

    const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
        console.log(values)
    }
 
    return (
<div>
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h3 className="paragraph-semibold text-dark400_light800">Write your answer here </h3>  
    </div>


    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 flex w-full flex-col gap-10"  >

     <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3"> 
                <FormControl>
                <Editor
                value={field.value}
                editorRef={editorRef}
                fieldChange={field.onChange}
                />
                </FormControl> 
                <FormMessage />
            </FormItem>
            )}
        /> 

    <div className="flex justify-end">
        <Button type="submit" className="primary-gradient w-fit">
            {isSubmitting ? (
                <>
                <ReloadIcon className="mr-2 size-4 animate-spin"/>
                Posting...
                </>
            ): (
                "Post Answer"
            )}
        </Button>
    </div>

        </form>
        </Form>
</div>
    );
};

export default AnswerForm;