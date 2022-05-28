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
      <Select.Nice md info className="" onChange={(e) => setCurrentRegion(e)}>
        <option selected value={""} default>
          Filter By Region
        </option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </Select.Nice>
    </div>
  );
};

export default SearchByRegion;
