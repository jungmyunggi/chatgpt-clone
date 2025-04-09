import { Logo } from "./Logo";
import { Plus, MessageSquare } from "lucide-react";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";
import { getConversationByUser } from "@/data/user";
const NEW_SIDEBAR_ITEM = {
    id: "new",
    lable: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
};

export async function Sidebar() {
    const conversations = await getConversationByUser();

    const formattedItems = [
        NEW_SIDEBAR_ITEM,
        ...conversations.map((c) => ({
            id: c.id,
            lable: c.name || "",
            icon: <MessageSquare />,
            href: `${CHAT_ROUTES.CONVERSATION}/${c.id}`,
        })),
    ];
    return (
        <nav className="h-full p-3 bg-black flex flex-col text-white">
            {/* 로고 + 메뉴*/}
            <div className="flex-1 overflow-y-auto">
                <Logo />
                <div className="flex flex-col gap-2 mt-10">
                    {formattedItems.map((item) => (
                        <SidebarItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
            {/* 로그아웃 */}
            <div className="flex justify-center">
                <LogoutButton />
            </div>
        </nav>
    );
}
