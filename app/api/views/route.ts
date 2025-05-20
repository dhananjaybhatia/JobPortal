import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id } = await req.json();

    try {
        const currentViews =
            (await writeClient.fetch(`*[_id == $id][0].views`, { id })) || 0;

        await writeClient
            .patch(id)
            .set({ views: currentViews + 1 })
            .commit();

        return NextResponse.json({ success: true, views: currentViews + 1 });
    } catch (err) {
        console.error("Failed to update views", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
