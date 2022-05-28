import { useState, useEffect, useCallback, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const SearchByRegion = ({ setSearch }) => {
  let regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let [currentRegion, setCurrentRegion] = useState("");

  const [selected, setSelected] = useState();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const searchByRegion = useCallback(async () => {
    return await setSearch(currentRegion.toLowerCase());
  });

  useEffect(() => {
    searchByRegion();
  }, [currentRegion]);

  return (
    <div className="w-full lg:w-1/6">
      <Listbox value={currentRegion} onChange={setCurrentRegion}>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="text-slate-800 py-4 px-6 rounded-sm bg-slate-50 dark:bg-slate-800 border dark:border-slate-500 dark:text-slate-500 w-full">
                <span className="inset-y-0 w-full flex justify-between items-center pointer-events-none formLabel">
                  <p className="label lg:ml-0">Search By Region</p>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-200"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="currentColor absolute z-10 mt-1 text-slate-800 py-4 px-6 rounded-sm bg-slate-50 dark:bg-slate-800 border dark:border-slate-500 dark:text-slate-500 w-full">
                  {regions.map((region, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? "text-slate-200" : "text-slate-500",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={region || "Search By Region"}
                    >
                      {({ currentRegion, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                currentRegion ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {region}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SearchByRegion;
