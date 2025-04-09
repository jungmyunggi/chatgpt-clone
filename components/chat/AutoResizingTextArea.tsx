"use client";
import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

export function AutoResizingTextArea({
    value,
    ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);
    return (
        <Textarea
            ref={textareaRef}
            className="min-h-[50px] max-h-[200px]"
            {...others}
            value={value}
        />
    );
}
