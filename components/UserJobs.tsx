import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserJobs = async ({ id }: { id: string }) => {
  const jobs = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job: StartupTypeCard) => (
          <StartupCard key={job._id} post={job} />
        ))
      ) : (
        <p className="text-black text-sm font-normal">No posts yet</p>
      )}
    </div>
  );
};

export default UserJobs;
