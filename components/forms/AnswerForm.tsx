"use client";
   
import React, { useRef, useTransition } from "react";
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
import { AskQuestionSchema } from "@/lib/validations";
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

    const editorRef = useRef<MDXEditorMethods>(null); 

    const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
        content: "", 
      },
    });
 
    return (
<div>
    <Form {...form}>
        <form className="mt-6 flex w-full flex-col gap-10"  >

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
                <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title. 
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        /> 


        </form>
        </Form>
</div>
    );
};

export default AnswerForm;