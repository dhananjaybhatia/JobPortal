import { z } from 'zod';

export const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title must be of minimum 1 character" })
        .max(20, { message: "Title must not exceed 20 characters" }),

    description: z
        .string()
        .min(20, { message: "Description must be of minimum 20 characters" })
        .max(400, { message: "Description must not exceed 400 characters" }),

    category: z.string()
        .min(3, { message: "Category must be of minimum 3 characters" })
        .max(20, { message: "Category must not exceed 20 characters" }),

    link: z
        .string()
        .url()
        .refine(
            async (url) => {
                try {
                    const res = await fetch(url, { method: "HEAD" });
                    const contentType = res.headers.get("content-type");
                    return contentType?.startsWith("image/");
                } catch (error) {
                    console.error(error)
                    return false;
                }
            },

        ),
    pitch: z.string().min(10, { message: "Pitch must be of 10 characters" })
});
