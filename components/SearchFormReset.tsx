"use client";

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <div>
      <button type="reset" onClick={reset}>
        <Link
          href="/"
          className="size-[50px] rounded-full bg-black text-white flex justify-center items-center"
        >
          <X className="size-5" />
        </Link>
      </button>
    </div>
  );
};

export default SearchFormReset;
