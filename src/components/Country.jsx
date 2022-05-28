import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components";

const Country = () => {
  const navigate = useNavigate();
  const { country } = useParams();
  const [currentCountry, setCurrentCountry] = useState([]);
  const [code, setCode] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
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
        console.log(err);
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
            className="flex gap-2 bg-white rounded-sm py-2 px-4 shadow-sm"
            onClick={handlePrevious}
          >
            <span>arrow</span> <span>Back</span>
          </button>
        </div>
        {currentCountry &&
          currentCountry.map((country) => (
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
              <div className="w-full lg:w-1/2">
                <img src={country.flags.svg} alt={country.name.common} />
              </div>
              <article className="w-full lg:w-1/2 grid grid-cols-1 grid-rows-3 -gap-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                  {country.name.common}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="">
                    <div className="flex gap-2 items-center">
                      <strong>Native name:</strong>{" "}
                      <span>
                        {Object.entries(country.name.nativeName).map(
                          (a) => a.common
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Population:</strong>{" "}
                      <span>{country.population}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Region:</strong> <span>{country.region}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Sub Region:</strong>{" "}
                      <span>{country.subregion}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Capital:</strong> <span>{country.capital}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <strong>Top Level Domain:</strong>{" "}
                      <span>{country.tld}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Currencies:</strong>{" "}
                      <span>
                        {Object.entries(country.currencies)
                          .map((currency) => currency[0])
                          .toString()}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <strong>Languages:</strong>{" "}
                      <span className="flex justify-center items-center gap-2">
                        {Object.values(country.languages).map(
                          (language, index) => (
                            <p key={index}>{language},</p>
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <strong>Border Countries:</strong>{" "}
                  <span className="flex justify-between items-center gap-2 ">
                    {borderCountries &&
                      borderCountries.map((border, index) => (
                        <a
                          className="shadow-md bg-white py-2 px-3 rounded-md text-sm"
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
