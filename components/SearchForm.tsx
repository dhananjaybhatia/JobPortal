import React from "react";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <form action="/" className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        className="flex-1 px-4 py-2 text-orange-600 font-medium outline-none "
        placeholder="Search..."
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="size-[50px] rounded-full bg-black text-white flex justify-center items-center"
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
