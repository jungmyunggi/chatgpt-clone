import { Logo } from "./Logo";
import { Plus, MessageSquare } from "lucide-react";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";
const DUMMY_ITEMS = [
    {
        id: "new",
        lable: "새로운 대화",
        icon: <Plus />,
        href: BASE_URL,
    },
    {
        id: "1",
        lable: "새새로로운운대대화화",
        icon: <MessageSquare />,
        href: `${CHAT_ROUTES.CONVERSATION}/1`,
    },
    {
        id: "2",
        lable: "일반 대화",
        icon: <MessageSquare />,
        href: `${CHAT_ROUTES.CONVERSATION}/2`,
    },
];
export function Sidebar() {
    return (
        <nav className="h-full p-3 bg-black flex flex-col text-white">
            {/* 로고 + 메뉴*/}
            <div className="flex-1 overflow-y-auto">
                <Logo />
                <div className="flex flex-col gap-2 mt-10">
                    {DUMMY_ITEMS.map((item) => (
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
