import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    title: string;
    footer: { lable: string; href: string };
    children: React.ReactNode;
};

export default function FormCard({ title, footer, children }: Props) {
    return (
        <>
            <Card className="w-[500px] flex flex-col items-center">
                <CardHeader className="w-[90%] flex justify-center">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="w-[90%]">{children}</CardContent>
                <CardFooter className="text-sm text-sky-700">
                    <Link href={footer.href}>{footer.lable}</Link>
                </CardFooter>
            </Card>
        </>
    );
}
