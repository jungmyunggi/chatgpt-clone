"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modal";
import { deleteConversation, updateConversation } from "@/actions/conversation";
import { ModalFooter } from "../modal/ModalFooter";
import { BASE_URL } from "@/constants/routes";
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
    const [isEdit, setIsEdit] = useState(false);
    const param = useParams();
    const router = useRouter();
    const [value, setValue] = useState(item.lable);
    const setOpen = useSheetStore((state) => state.setOpen);
    const inputRef = useRef<HTMLInputElement>(null);
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const handleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await handleBlur();
        }
    };
    const handleBlur = async () => {
        setIsEdit(false);
        if (value !== lable) {
            try {
                await updateConversation(id, value);
            } catch (error) {
                console.error(error);
                toast.error("이름 수정에 실패했습니다.");
            }
        }
    };
    const clickEdit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsEdit(true);
        setIsMenuOpen(false);
    };
    const handleDelete = async () => {
        try {
            await deleteConversation(id);

            toast.success("삭제에 성공했습니다.");
            if (param.id === id) {
                router.push(BASE_URL);
            }
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error("삭제에 실패했습니다.");
        }
    };
    const clickDelete = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        // 삭제모달 로직
        openModal({
            title: "정말 삭제하시겠습니까?",
            description: "삭제 이후엔 복구가 불가능합니다.",
            footer: (
                <ModalFooter onCancle={closeModal} onConfirm={handleDelete} />
            ),
        });
    };
    useEffect(() => {
        if (isEdit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEdit]);

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
                {icon}{" "}
                {isEdit ? (
                    <input
                        className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1"
                        value={value}
                        onChange={handleChange}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                ) : (
                    <div className="w-[180px] truncate">{lable}</div>
                )}
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
                        <DropdownMenuItem onClick={(event) => clickEdit(event)}>
                            <Pencil size={18} />
                            수정
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={clickDelete}>
                            <Trash size={18} />
                            삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </Link>
    );
}
