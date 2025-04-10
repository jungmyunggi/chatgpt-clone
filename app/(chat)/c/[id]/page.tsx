import { Chat } from "@/components/chat/Chat";
import { getMessageByConversation } from "@/data/conversation";

export default async function ConversationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);
    const messages = await getMessageByConversation(id);
    return <Chat initialMessages={messages} />;
}
