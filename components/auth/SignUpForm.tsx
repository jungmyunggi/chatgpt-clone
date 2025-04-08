"use client";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import FormCard from "./FormCard";
import { Label } from "@radix-ui/react-label";
import Submit from "./Submit";
import { ChangeEvent } from "react";
import { useFormVaildate } from "@/hooks/useFormVaildate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { signup } from "@/actions/signup";
import toast from "react-hot-toast";
export default function SignUpForm() {
    const [error, action] = useActionState(signup, undefined);
    const { errors, vaildateField } =
        useFormVaildate<TSignUpFormError>(SignUpSchema);
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
                title="회원가입"
                footer={{ lable: "이미 계정이 있으신가요?", href: "/login" }}
            >
                <form className="space-y-6" action={action}>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="name" className="font-bold">
                            이름
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="이름을 입력해주세요"
                            onChange={handleChange}
                            error={!!errors?.name}
                        ></Input>
                        {errors?.name && (
                            <FormMessage message={errors?.name[0]} />
                        )}
                    </div>
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
                    <Submit className="w-full">가입하기</Submit>
                </form>
            </FormCard>
        </>
    );
}
