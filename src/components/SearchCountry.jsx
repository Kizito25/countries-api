import { useState, useEffect, useCallback } from "react";
import { Input, Icon } from "elementz";

const SearchCountry = ({ setSearch }) => {
  const [isLoading, setLoading] = useState({
    search: false,
    edit: false,
    custom: false,
  });

  const handleSearch = useCallback(async (e) => {
    setLoading({ ...isLoading, search: true });
    await setSearch(e.toLowerCase());
    setLoading({ ...isLoading, search: false });
  });

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full lg:w-2/6 my-10">
      <Input
        lg
        full
        loading={isLoading.search}
        before={<Icon name="search" />}
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
