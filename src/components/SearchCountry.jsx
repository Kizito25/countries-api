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
    <div className="w-full lg:w-2/6 my-10 inputColor">
      <Input
        lg
        full
        loading={isLoading.search}
        before={<Icon name="search" />}
        color="currentColor"
        // className="inputColor"
        placeholder="Search for a country"
        onChange={(e) => {
          setLoading({ ...isLoading, search: !isLoading.search });
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchCountry;
