import { useState, useEffect, useCallback } from "react";
import { Input, Icon } from "elementz";

const SearchCountry = ({ setSearch }) => {
  const [isLoading, setLoading] = useState({
    search: false,
    edit: false,
    custom: false,
  });

  const handleSearch = useCallback(async (e) => {
    await setSearch(e.toLowerCase());
  });

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full lg:w-2/6 my-10">
      <div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm mr-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            className="text-slate-800 py-4 px-8 lg:px-10 rounded-sm bg-slate-50 dark:bg-slate-800 border dark:border-slate-500 dark:text-slate-500 w-full"
            placeholder="Search for a country"
            onChange={(e) => {
              setLoading({ ...isLoading, search: !isLoading.search });
              handleSearch(e.target.value);
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default SearchCountry;
