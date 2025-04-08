"use server";

import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
type SessionPayload = {
    id: string;
    name: string;
};

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodedKey);
};

export const verify = async (session: string | undefined = "") => {
    if (!session || !session.includes(".")) {
        console.error("유효하지 않은 토큰입니다.");
        return { errorMessage: "토큰 검증에 실패했습니다." };
    }
    try {
        const { payload } = await jwtVerify<SessionPayload>(
            session,
            encodedKey,
            {
                algorithms: ["HS256"],
            }
        );
        return payload;
    } catch (error) {
        console.error(error);
        return { errorMessage: "토큰 검증에 실패했습니다." };
    }
};

export const createSession = async (payload: SessionPayload) => {
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt(payload);
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expireAt,
        sameSite: "lax",
        path: "/",
    });
};

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("session");
};

export const verifySession = async () => {
    const cookieStore = await cookies();

    const cookie = cookieStore.get("session")?.value;
    const session = await verify(cookie);

    if ("errorMessage" in session || !session?.id) {
        redirect("/login");
    }
    return session;
};
