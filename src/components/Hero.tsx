import { MutableRefObject, useRef, useState } from "react";
import { useDebounce, useDidUpdate, useKeys } from "rooks";

import { fetchRecommendations } from "../lib/supabase";
import searchNormal from "../assets/searchNormal.svg";
import cmdKIcon from "../assets/cmdK.svg";
import SearchedRepoCard from "./SearchedRepoCard";

const Hero = () => {
  const containerRef = useRef<Document>(document);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const setValueDebounced = useDebounce(setSearchTerm, 500);
  const [fetchedData, setFetchedData] = useState<DbRepo[]>([]);
  const [hasFocus, setFocus] = useState(false);

  const handleCmdK = async (e: KeyboardEvent) => {
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

      <div className="mt-11 px-4 gap-x-2.5 py-2.5 justify-between bg-white shadow-2xl rounded-2xl md:min-w-[26.375rem] flex">
        <img
          alt="search icon"
          src={searchNormal}
        />

        <input
          ref={searchBoxRef}
          className="w-full outline-none text-base text-lightSlate"
          placeholder="Search repositories"
          type="text"
          onChange={e => setValueDebounced(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)}
        />

        <img
          alt="command k"
          className="pt-1.5"
          src={cmdKIcon}
        />
      </div>

      <div className="mt-2.5 flex w-full justify-center relative">
        {fetchedData.length > 0 && hasFocus && (
          <div className="flex md:min-w-96 pb-2 absolute z-50 max-w-96 flex-col bg-white rounded-2.5 shadow-2xl">
            <div className="bg-gray-100 py-2.5 px-10 md:px-3.5 border-b-gray-100 border-b-0.5 rounded-2.5 rounded-b-none w-full">
              <p className="text-gray-500 text-sm font-semibold">Repository</p>
            </div>

            {fetchedData.map(data => (
              <SearchedRepoCard
                key={data.full_name}
                data={data}
                keepFocus={() => setTimeout(() => searchBoxRef.current?.focus(), 200)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
