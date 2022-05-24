import { useState, useEffect } from "react";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  // const [country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="min-h-screen bg-slate-50 px-10 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-10">
        {countries &&
          countries.map((country, countryIndex) => (
            <div
              key={countryIndex}
              className="bg-slate-50 rounded-lg m-2 country-card-container"
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="h-40 w-full object-cover rounded-t-lg country-card-image"
              />
              <div className="flex flex-col p-4 shadow-lg shadow-slate-500/20 rounded-b-lg country-card-details">
                <h3 className="titleText">{country.name.common}</h3>
                <div className="mt-4 country-card-footer">
                  <p>
                    <strong>Population</strong>:{" "}
                    <span className="country-card-subtitle">
                      {country.population}
                    </span>
                  </p>
                  <p>
                    <strong>Region</strong>:{" "}
                    <span className="country-card-subtitle">
                      {country.region}
                    </span>
                  </p>
                  <p>
                    <strong>Capital</strong>:
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
          ))}
      </div>
    </section>
  );
};

export default Countries;
