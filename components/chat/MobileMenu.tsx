"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSheetStore } from "@/store/sheet";

export function MobileMenu({ children }: { children: React.ReactNode }) {
    const open = useSheetStore((state) => state.open);
    const setOpen = useSheetStore((state) => state.setOpen);

    return (
        <div className="md:hidden">
            {/* <Sheet> */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Menu />
                </SheetTrigger>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetContent side="left" className="p-0">
                    {children}
                </SheetContent>
            </Sheet>
        </div>
    );
}
