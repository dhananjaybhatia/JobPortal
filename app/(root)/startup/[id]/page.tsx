import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client"; // 🔹 Make sure this is imported
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
export const experimental_ppr = true;
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [post, playlist] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  if (!playlist) {
    console.warn("No playlist found for slug: editor-picks-new");
  }

  const editorPosts = playlist?.select ?? [];

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="blueContainer">
        <p className="tag">{formatDate(post?._createdAt)}</p>{" "}
        <h1 className="heading">{post.title}</h1>{" "}
        <p className="sub-heading">{post.description}</p>
      </section>
      <section className="section_container">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title ?? "Startup image"}
            width={600}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        )}

        <div className=" space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              {post.author?.image && (
                <Image
                  src={post.author.image}
                  alt={post.author?.name ?? "Author avatar"}
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
              )}

              <div>
                {post.author?.name ? (
                  <p className="font-medium text-[20px] text-black">
                    {post.author?.name}
                  </p>
                ) : (
                  <p className="font-medium text-[20px] text-black">
                    Anonymous
                  </p>
                )}
                {post.author?.username ? (
                  <p className="font-medium text-[16px] text-gray-700">
                    @{post.author?.username}
                  </p>
                ) : (
                  <p className="font-medium text-[16px] text-red-500">
                    username not provided**
                  </p>
                )}
              </div>
            </Link>
            <p className="category-tag ">{post.category}</p>
          </div>
          <h3 className="text-[30px] font-bold text-black">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-black text-sm font-normal">
              No details provided
            </p>
          )}
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold text-[30px] text-black">Editor Picks</p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-5">
              {editorPosts.map((p: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={p} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
