"use client";
import { useEffect } from "react";
import { useModalStore } from "@/store/modal";
import { Modal } from "./Modal";
export function ModalLayout() {
    const isOpen = useModalStore((state) => state.open);

    useEffect(() => {
        console.log(isOpen);
        if (isOpen) {
            document.body.style = "none";
        } else {
            document.body.style.pointerEvents = "auto";
        }
    }, [isOpen]);
    if (!isOpen) return null;
    return (
        <div>
            <Modal />
        </div>
    );
}
