import { Button } from "../ui/button";

type Props = {
    onCancle: () => void;
    onConfirm: (event: React.MouseEvent<HTMLElement>) => void;
};

export function ModalFooter({ onCancle, onConfirm }: Props) {
    return (
        <>
            <Button variant={"destructive"} onClick={onConfirm}>
                삭제
            </Button>
            <Button onClick={onCancle}>취소</Button>
        </>
    );
}
