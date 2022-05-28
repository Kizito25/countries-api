import { useState, useEffect, useCallback } from "react";
import { Select } from "elementz";

const SearchByRegion = ({ setSearch }) => {
  let regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let [currentRegion, setCurrentRegion] = useState("");

  const searchByRegion = useCallback(async () => {
    return await setSearch(currentRegion.toLowerCase());
  });

  useEffect(() => {
    searchByRegion();
  }, [currentRegion]);

  return (
    <div className="w-full lg:w-1/6">
      <select
        className="text-slate-800 py-4 px-6 rounded-sm bg-slate-50 dark:bg-slate-800 border dark:border-slate-500 dark:text-slate-500 w-full"
        onChange={(e) => setCurrentRegion(e.target.value)}
      >
        <option selected value={""} default>
          Filter By Region
        </option>
        {regions.map((region, index) => (
          <option key={index} value={region} className="text-slate-800">
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchByRegion;
