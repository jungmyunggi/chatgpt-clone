"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";
type Props = {
    item: {
        id: string;
        lable: string;
        icon: ReactNode;
        href: string;
    };
};
export function SidebarItem({ item }: Props) {
    const { id, lable, icon, href } = item;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const setOpen = useSheetStore((state) => state.setOpen);

    const handleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <Link
            href={href}
            scroll={false}
            className={cn(
                "flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",

                isMenuOpen || pathname === href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
            )}
            onClick={() => setOpen(false)}
        >
            {/* lable */}
            <div className="flex items-center gap-2">
                {icon} <div className="w-[180px] truncate">{lable}</div>
            </div>
            {/* dropdown */}
            {id !== "new" && (
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <div onClick={handleMenu}>
                            <Ellipsis
                                className={cn(
                                    "group-hover:block text-gray-400 hover:text-white",
                                    isMenuOpen
                                        ? "block text-white"
                                        : "md:hidden text-gray-400"
                                )}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Pencil size={18} />
                            수정
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash size={18} />
                            삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </Link>
    );
}
