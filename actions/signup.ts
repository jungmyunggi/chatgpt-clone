"use server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";
export const signup = async (_: any, formData: FormData) => {
    try {
        const vaildateFields = SignUpSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!vaildateFields.success) {
            return { message: "잘못된 입력값이 있습니다." };
        }

        const { name, email, password } = vaildateFields.data;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return {
                errorMessage: "이미 존재하는 사용자입니다.",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(user).values({ name, email, password: hashedPassword });
    } catch (error) {
        console.error(error);
        return { errorMessage: "회원가입 중 문제발생" };
    }
    redirect("/login");
};
