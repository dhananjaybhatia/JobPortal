"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string
) => {
    const session = await auth();
    if (!session) {
        return parseServerActionResponse({
            error: "Not Signed in",
            status: "ERROR",
        });
    }
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );
    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            _type: "startup",
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.user?.id,
            },
            pitch,
        };

        const result = await writeClient.create(startup);
        console.log("✅ Created startup:", result); // log the created document


        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
        console.log(result);
    } catch (error) {
        console.error("Sanity Error:", error);
        return parseServerActionResponse({
            error: error instanceof Error ? error.message : JSON.stringify(error),
            status: "ERROR",
        });
    }
};
