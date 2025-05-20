"use client";

import { useEffect, useState } from "react";
import Ping from "./Ping";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const updateViews = async () => {
      const res = await fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok) {
        setViews(data.views);
      }
    };

    updateViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="text-[#0D1B2A]">Views: {views ?? "..."}</span>
      </p>
    </div>
  );
};

export default View;
