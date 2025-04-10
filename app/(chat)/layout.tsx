import { Header } from "@/components/chat/Header";
import { Sidebar } from "@/components/chat/Sidebar";
import { UserProvider } from "@/components/chat/UserProvider";
export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <UserProvider>
            <div className="md:flex h-full">
                {/* sidebar */}
                <div className="hidden md:block w-[300px]">
                    <Sidebar />
                </div>
                {/* header + chat */}
                <div className="flex flex-col flex-1 h-full overflow-y-auto">
                    <Header />
                    {children}
                </div>
            </div>
        </UserProvider>
    );
}
