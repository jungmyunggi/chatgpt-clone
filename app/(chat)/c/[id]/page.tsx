import { Chat } from "@/components/chat/Chat";
import { getMessageByConversation } from "@/data/conversation";

type Props = {
    params: { id: string };
};
export default async function ConversationPage({ params }: Props) {
    const { id } = await params;
    const messages = await getMessageByConversation(id);
    return <Chat initalMessages={messages} />;
}
