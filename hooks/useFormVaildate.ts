import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormVaildate<T>(schema: ZodObject<ZodRawShape>) {
    const [errors, setErrors] = useState<Partial<T>>();

    const vaildateField = (name: string, value: string) => {
        setErrors({
            ...errors,
            [name]: undefined,
        });
        const parsedVlaue = schema.pick({ [name]: true }).safeParse({
            [name]: value,
        });
        if (!parsedVlaue.success) {
            setErrors({
                ...errors,
                ...parsedVlaue.error.flatten().fieldErrors,
            });
        }
    };

    return { errors, vaildateField };
}
