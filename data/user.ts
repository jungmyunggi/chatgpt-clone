import { User } from "@/types/db";
import { user } from "@/db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";
import { verifySession } from "@/actions/sessions";
export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email),
        });

        if (!existingUser) {
            return null;
        }
        return existingUser;
    } catch (error) {
        console.error(error);
        throw new Error("문제발생");
    }
};

export const getConversationByUser = async () => {
    const session = await verifySession();

    const response = await db.query.user.findFirst({
        where: eq(user.id, session.id),
        with: {
            conversations: {
                orderBy: (conversation, { desc }) => [
                    desc(conversation.createdAt),
                ],
            },
        },
    });
    return response?.conversations || [];
};
