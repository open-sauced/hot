import { MutableRefObject, useRef, useState } from "react";
import { useDebounce, useDidUpdate, useKeys } from "rooks";

import { fetchRecommendations } from "../lib/supabase";
import searchNormal from "../assets/searchNormal.svg";
import cmdKIcon from "../assets/cmdK.svg";
import SearchedRepoCard from "./SearchedRepoCard";
import { Combobox } from "@headlessui/react";

const Hero = () => {
  const containerRef = useRef<Document>(document);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const comboButtonRef = useRef<HTMLButtonElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const setValueDebounced = useDebounce(setSearchTerm, 500);
  const [fetchedData, setFetchedData] = useState<DbRepo[]>([]);
  const [comboBoxSelection, setComboBoxSelection] = useState("");
  const [hasFocus, setFocus] = useState(false);

  const handleCmdK = async (e: KeyboardEvent) => {
    comboButtonRef.current?.click();
    if (!hasFocus) {
      searchBoxRef.current?.focus();
      setFocus(true);
      const results = await fetchRecommendations("stars", 3, null, searchTerm);

      setFetchedData(results);
    } else {
      searchBoxRef.current?.blur();
      setFocus(false);
    }

    // prevent browser from handling CMD/CTRL + K
    e.preventDefault();
  };

  const useKey = (superKey: string, key: string, target: MutableRefObject<Document>) => {
    useKeys([superKey, key], handleCmdK, { target });
  };

  useKey("ControlLeft", "KeyK", containerRef);

  useKey("ControlRight", "KeyK", containerRef);

  useKey("MetaRight", "KeyK", containerRef);

  useKey("MetaLeft", "KeyK", containerRef);

  useDidUpdate(async () => {
    const results = await fetchRecommendations("stars", 3, null, searchTerm);

    setFetchedData(results);
  }, [searchTerm]);

  return (
    <div className="flex flex-col py-24 items-center mx-2.5">
      <div>
        <h1 className="font-Lexend text-4xl md:text-5xl text-center text-lightSlate leading-tight tracking-tight">
          {`Find `}

          <span className="bg-gradient-to-r from-gradFirst via-gradMiddle to-gradLast bg-clip-text text-transparent">
            Open-Source Repositories
          </span>

          <br />

          to contribute today
        </h1>
      </div>

      <Combobox
        as="div"
        value={comboBoxSelection}
        onChange={setComboBoxSelection}
      >
        <div className="mt-11 px-4 py-2.5  bg-white shadow-2xl rounded-2xl md:min-w-[26.375rem] flex justify-between">
          <div className="flex items-center gap-x-2.5">
            <img
              alt="search icon"
              src={searchNormal}
            />

            <Combobox.Button
              ref={comboButtonRef}
            >
              <Combobox.Input
                ref={searchBoxRef}
                className="w-full outline-none text-base text-lightSlate"
                displayValue={() => searchTerm}
                placeholder="Search repositories"
                type="text"
                value={searchTerm}
                onChange={e => setValueDebounced(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setFocus(false);
                  }, 200)}
                onKeyUp={(event: React.KeyboardEvent) => {
                  if (event.key === "Enter") {
                    window.open(comboBoxSelection, "_blank", "noreferrer");
                  }
                }}
              />
            </Combobox.Button>
          </div>

          <img
            alt="command k"
            className="pt-1.5"
            src={cmdKIcon}
          />
        </div>

        <div className="mt-2.5">
          <Combobox.Options className="flex w-full justify-center">
            {fetchedData.length > 0 && (
              <div className="flex md:min-w-96 pb-2 absolute z-50 max-w-96 flex-col bg-white rounded-2.5 shadow-2xl">
                <div className="bg-gray-100 py-2.5 px-10 md:px-3.5 border-b-gray-100 border-b-0.5 rounded-2.5 rounded-b-none w-full">
                  <p className="text-gray-500 text-sm font-semibold">Repository</p>
                </div>

                {fetchedData.map(data => (
                  <Combobox.Option
                    key={data.full_name}
                    as="a"
                    className={({ active }) => (active ? "bg-gray-50" : "")}
                    value={`https://insights.opensauced.pizza/hot/repositories/filter/${data.full_name}`}
                  >
                    <SearchedRepoCard
                      data={data}
                    />
                  </Combobox.Option>
                ))}
              </div>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

export default Hero;
