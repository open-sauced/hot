import { useRef, useState } from "react";
import { useDebounce, useDidUpdate, useKeys } from "rooks";
import { fetchRecommendations } from "../lib/supabase";
import searchNormal from "../assets/searchNormal.svg";
import cmdKIcon from "../assets/cmdK.svg";
import HeroCard from "./HeroCard";
import { LoaderSkeleton } from "./LoaderSkeleton";

const Hero = () => {
  const containerRef = useRef<Document>(document);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const setValueDebounced = useDebounce(setSearchTerm, 500);
  const [fetchedData, setFetchedData] = useState<DbRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const skeletonArray = Array.apply(null, Array(3));

  const handleCmdK = async (e: KeyboardEvent) => {
    if (!hasFocus) {
      searchBoxRef.current?.focus();
      setFocus(true);
      setLoading(true);
      const results = await fetchRecommendations("stars", 3, null, searchTerm);

      setFetchedData(results);
      setLoading(false);
    } else {
      searchBoxRef.current?.blur();
      setFocus(false);
    }

    // prevent browser from handling CMD/CTRL + K
    e.preventDefault();
  };

  useKeys(["ControlLeft", "KeyK"], handleCmdK, { target: containerRef });

  useKeys(["MetaLeft", "KeyK"], handleCmdK, { target: containerRef });

  useDidUpdate(async () => {
    setLoading(true);
    const results = await fetchRecommendations("stars", 3, null, searchTerm);

    setFetchedData(results);
    setLoading(false);
  }, [searchTerm]);

  return (
    <div className="flex flex-col py-[95px] items-center mx-[10px]">
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

      <div className="mt-[45px] px-[15px] gap-x-[10px] py-[10px] justify-between bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[16px] md:min-w-[422px] flex">
        <img alt="search icon" src={searchNormal} />

        <input
          ref={searchBoxRef}
          className="w-full outline-none text-base text-lightSlate"
          placeholder="Search repositories"
          type="text"
          onChange={(e) => setValueDebounced(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)
          }
        />

        <img alt="command k" className="pt-[7px]" src={cmdKIcon} />
      </div>

      <div className="mt-[10px] flex w-full justify-center relative">
        {loading ? (
          <div className="p-4 max-w-[400px]   md:min-w-[400px] border rounded-2xl bg-white w-full space-y-1 absolute">
            {skeletonArray.map((a, i) => (
              <LoaderSkeleton key={i} count={2} />
            ))}
          </div>
        ) : (
          fetchedData.length > 0 &&
          hasFocus && (
            <div className="flex md:min-w-[400px] pb-[8px] absolute z-50 max-w-[400px] flex-col bg-white rounded-[10px] shadow-2xl">
              <div className="bg-gray-100 py-[10px] px-[10px] md:px-[15px] border-b-gray-100 border-b-[2px] rounded-[10px] rounded-b-none w-full">
                <p className="text-gray-500 text-sm font-semibold">Repository</p>
              </div>

              {fetchedData.map((data, index) => (
                <HeroCard key={index} {...data} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
