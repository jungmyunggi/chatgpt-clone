"use client";
import { useEffect, useRef } from "react";
import { AutoResizingTextArea } from "./AutoResizingTextArea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useChat, Message as TMessage } from "@ai-sdk/react";
import { useModelStore } from "@/store/model";
import { useParams, useRouter } from "next/navigation";
import { addConversation, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/user";

type Props = {
    initalMessages: TMessage[];
};

export function Chat({ initalMessages }: Props) {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const user = useUserStore((state) => state.user);
    const { messages, setMessages, input, handleInputChange, handleSubmit } =
        useChat({
            onFinish: async (messages) => {
                // 새로운 대화인 경우
                if (!params.id) {
                    // 1. 새로운 대화 생성(대화이름)
                    const conversation = await createConversation(input);
                    // 2. 메시지 저장
                    await addConversation(
                        conversation.id,
                        input,
                        messages.content
                    );

                    router.push(
                        `${CHAT_ROUTES.CONVERSATION}/${conversation.id}`
                    );
                }
                // 기존의 대화인 경우
                else {
                    // 1. 메시지 저장
                    await addConversation(params.id, input, messages.content);
                }
            },
        });
    const model = useModelStore((state) => state.model);
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setMessages(initalMessages);
    }, [initalMessages, setMessages]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return (
        <div className="flex flex-col w-[80%] h-full mx-auto">
            {/* 채팅 */}
            <div className="flex-1">
                {!params.id && messages.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        {messages.map((message) => (
                            <Message
                                key={message.id}
                                name={user.name}
                                role={message.role}
                                content={message.content}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* 인풋 */}
            <div className="pb-5 sticky bottom-0 bg-white z-10">
                <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleSubmit(e, { data: model })}
                >
                    <AutoResizingTextArea
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" size={"icon"}>
                        <ArrowUp />
                    </Button>
                </form>
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
}
