"use client";
   
import React, { useRef } from "react";
import { useForm } from "react-hook-form"; 

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

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
  

const QuestionForm = () => {

  const editorRef = useRef<MDXEditorMethods>(null); 

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[]}
  ) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const tagInput = e.currentTarget.value.trim();

        if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
          form.setValue("tags",[...field.value, tagInput]);
          e.currentTarget.value = "";
          form.clearErrors("tags");
        } else if(tagInput.length > 15) {
          form.setError("tags", {
            type: "manual",
            message: "Tag should be less then 15 characters",
          });
        } else if (field.value.includes(tagInput)) {
          form.setError("tags", {
            type: "manual",
            message: "Tag Already exists"
          });
        }
      }
  };

  const handleCreateQuestion = () => {};
  

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10" 
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
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
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  Tags
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;