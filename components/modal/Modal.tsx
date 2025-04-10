"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";
export function Modal() {
    // const { open, closeModal, config } = useModalStore();
    const open = useModalStore((state) => state.open);
    const closeModal = useModalStore((state) => state.closeModal);
    const config = useModalStore((state) => state.config);

    const { title, description, content, footer } = config || {};
    return (
        <>
            <Dialog open={open} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {content}
                    <DialogFooter>{footer}</DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
