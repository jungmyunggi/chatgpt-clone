import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
export function MobileMenu() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
}
