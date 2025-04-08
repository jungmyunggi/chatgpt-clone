"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";
import { redirect } from "next/navigation";
export const login = async (_: any, formData: FormData) => {
    const vaildateFields = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!vaildateFields.success) {
        return { message: "잘못된 입력값이 있습니다." };
    }

    const { email, password } = vaildateFields.data;
    try {
        const exsitingUser = await getUserByEmail(email);

        if (!exsitingUser) {
            return {
                errorMessage: "존재하지 않는 사용자입니다.",
            };
        }

        const { id, name, password: userPassword } = exsitingUser;
        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (!passwordMatch) {
            return {
                errorMessage: "비밀번호가 일치하지 않습니다.",
            };
        }
        await createSession({ id, name });
    } catch (error) {
        console.error(error);
        return { errorMessage: "로그인중 문제발생" };
    }
    redirect("/");
};
