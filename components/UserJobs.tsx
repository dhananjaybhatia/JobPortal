import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserJobs = async ({ id }: { id: string }) => {
  const jobs = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {jobs.length > 0 ? (
        jobs.map((job: StartupTypeCard) => (
          <li key={job._id}>
            <StartupCard post={job} />
          </li>
        ))
      ) : (
        <p className="text-black text-sm font-normal">No posts yet</p>
      )}
    </>
  );
};

export default UserJobs;
