import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components";

const Error = ({ error }) => {
  return (
    <div className="flex justify-center items-center">
      <h2>{error}</h2>
    </div>
  );
};

const Country = () => {
  const navigate = useNavigate();
  const { country } = useParams();
  const [currentCountry, setCurrentCountry] = useState([]);
  const [code, setCode] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState("");
  const handlePrevious = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then(({ data }) => {
        setCurrentCountry(data);
        setCode(data.map((a) => a.borders));
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha?codes=${code}`)
      .then(({ data }) => {
        console.log("Data", data);
        console.log("Code", code);
        setBorderCountries(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);
  return (
    <>
      <Header />
      <section className="min-h-screen px-10 mb-10 lg:my-20">
        <div className="my-10 lg:my-20">
          <button
            className="flex items-center gap-2 bg-white rounded-sm py-2 px-4 shadow-sm"
            onClick={handlePrevious}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </span>
            <span>Back</span>
          </button>
        </div>
        {error && <Error error={error} />}
        {currentCountry &&
          currentCountry.map((country) => (
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
              <div className="w-full lg:w-1/2">
                <img
                  className="w-[100%] h-[100%]"
                  src={country.flags.svg}
                  alt={country.name.common}
                />
              </div>
              <article className="w-full lg:w-1/2 flex flex-col gap-10">
                <h2 className="map-title">{country.name.common}</h2>
                <div className="flex flex-col lg:flex-row justify-between items-start map-details">
                  <div className="space-y-2">
                    <div className="spans">
                      <strong>Native name:</strong>
                      <span className="spans">
                        {Object.values(country.name.nativeName).map((a) => (
                          <p>{a.common},</p>
                        ))}
                      </span>
                    </div>
                    <div className="spans">
                      <strong>Population:</strong>{" "}
                      <span>{country.population}</span>
                    </div>
                    <div className="spans">
                      <strong>Region:</strong> <span>{country.region}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Sub Region:</strong>{" "}
                      <span>{country.subregion}</span>
                    </div>
                    <div className="spans">
                      <strong>Capital:</strong> <span>{country.capital}</span>
                    </div>
                  </div>
                  <div>
                    <div className="spans">
                      <strong>Top Level Domain:</strong>{" "}
                      <span>{country.tld}</span>
                    </div>
                    <div className="spans">
                      <strong>Currencies:</strong>{" "}
                      <span>
                        {Object.entries(country.currencies)
                          .map((currency) => currency[0])
                          .toString()}
                      </span>
                    </div>
                    <div className="spans">
                      <strong>Languages:</strong>{" "}
                      <span className="spans">
                        {Object.values(country.languages).map(
                          (language, index) => (
                            <p key={index}>{language},</p>
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="spans">
                  <strong>Border Countries:</strong>{" "}
                  <span className="spans">
                    {borderCountries &&
                      borderCountries.map((border, index) => (
                        <a
                          className="shadow-md bg-white py-2 px-3 rounded-md text-xs"
                          key={index}
                          href={`../${border.name.common}`}
                        >
                          {border.name.common}
                        </a>
                      ))}
                  </span>
                </div>
              </article>
            </div>
          ))}
      </section>
    </>
  );
};

export default Country;
