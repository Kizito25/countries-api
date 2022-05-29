import { useState, useEffect } from "react";
import axios from "axios";
import { SearchCountry, SearchByRegion, Header } from "../components";
import { DotWave } from "@uiball/loaders";

const Error = ({ error }) => {
  return (
    <div className="flex justify-center items-center">
      <h2>{error}</h2>
    </div>
  );
};

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState([]);
  const [error, setError] = useState("");

  const filterCountryOrCapital = (country, key) => {
    let searchByCountry;
    let searchByCapital;
    let searchByRegion;
    for (let i = 0; i < countries.length; i++) {
      if (!country.capital) {
        return;
      } else {
        searchByCountry = country.name.common.toLowerCase().includes(key);
        searchByCapital = country.capital
          .toString()
          .toLowerCase()
          .includes(key);
        searchByRegion = country.region.toLowerCase() == key.toLowerCase();
      }
    }
    return searchByCountry || searchByCapital || searchByRegion;
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return (
    <section className="min-h-screen pb-10">
      <Header />
      <div className="px-10 mt-20 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center my-10">
          <SearchCountry setSearch={setSearch} />
          <SearchByRegion setSearch={setSearch} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-10">
          {loading && (
            <div className="flex justify-center items-center space-y-4 h-40 max-h-72 text-center">
              <DotWave size={47} speed={1} color="currentColor" />
            </div>
          )}
          {error && <Error error={error} />}
          {countries
            ? countries
                .filter((country) => {
                  return filterCountryOrCapital(country, search);
                })
                .map((country, countryIndex) => (
                  <div
                    key={countryIndex}
                    className="rounded-lg m-2 country-card-container shadow-lg mapColor"
                  >
                    <img
                      src={country.flags.svg}
                      alt={country.name.common}
                      className="h-40 w-full object-cover rounded-t-lg "
                    />
                    <div className="flex flex-col p-4 rounded-b-lg mapFooter">
                      <a href={`/${country.name.common}`} className="">
                        <h3 className="titleText">{country.name.common}</h3>
                      </a>
                      <div className="mt-4">
                        <p className="flex items-center gap-2">
                          <strong>Population:</strong>
                          <span className="country-card-subtitle">
                            {country.population}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <strong>Region:</strong>
                          <span className="country-card-subtitle">
                            {country.region}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <strong>Capital:</strong>
                          <span className="country-card-subtitle">
                            {country.name.common ===
                            "Heard Island and McDonald Islands"
                              ? (country.capital = "none")
                              : country.capital}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            : "No results found"}
        </div>
      </div>
    </section>
  );
};

export default Countries;
