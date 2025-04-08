"use client";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import FormCard from "./FormCard";
import { Label } from "@radix-ui/react-label";
import Submit from "./Submit";
import { ChangeEvent } from "react";
import { useFormVaildate } from "@/hooks/useFormVaildate";
import { LoginSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { login } from "@/actions/login";
import toast from "react-hot-toast";
export default function SignUpForm() {
    const [error, action] = useActionState(login, undefined);
    const { errors, vaildateField } =
        useFormVaildate<TLoginFormError>(LoginSchema);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        vaildateField(name, value);
    };
    useEffect(() => {
        if (error?.errorMessage) {
            toast.error(error.errorMessage);
        }
    }, [error]);
    return (
        <>
            <FormCard
                title="로그인"
                footer={{ lable: "아직 계정이 없으신가요?", href: "/signup" }}
            >
                <form className="space-y-6" action={action}>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="email" className="font-bold">
                            이메일
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            onChange={handleChange}
                            error={!!errors?.email}
                        ></Input>
                        {errors?.email && (
                            <FormMessage message={errors?.email[0]} />
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="password" className="font-bold">
                            비밀번호
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="*********"
                            error={!!errors?.password}
                        ></Input>
                        {errors?.password && (
                            <FormMessage message={errors?.password[0]} />
                        )}
                    </div>
                    <Submit className="w-full">로그인</Submit>
                </form>
            </FormCard>
        </>
    );
}
