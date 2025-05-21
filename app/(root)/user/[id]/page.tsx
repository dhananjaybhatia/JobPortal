import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserJobs from "@/components/UserJobs";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const expiremental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-[30px] font-extrabold text-[#ef233c] mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-sm">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-[30px] font-bold text-black">
            {session?.id === id ? "Your" : "All"} Jobs
          </p>
          <ul className="grid sm:grid-cols-2 gap-5">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserJobs id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
