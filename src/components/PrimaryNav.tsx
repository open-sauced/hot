import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSpinner } from "react-icons/fa";
import { fetchWithSearch } from "../lib/supabase";
import Avatar from "./Avatar";
import { FaAngleRight, FaRegStar, FaRegDotCircle } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import TextHoverElement from "./TextHoverElement";
import { FaSearch } from 'react-icons/fa';

interface PostWrapProps {
  setTextToSearch: (arg0: string) => void;
}

type PostResult = {
  full_name: string;
  description: string;
  stars: number;
  issues: string;
  contributions: { url: string; contributor: string; last_merged_at: string }[];
};
// TODO: move to hooks/debounce.ts
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const PrimaryNav = ({ setTextToSearch }: PostWrapProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<PostResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasFocus, setFocus] = useState<boolean>(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const clickHandler = (searchToText: string) => {
    setTextToSearch(searchToText);
    setResults([]);
  };

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value == "") {
      setTextToSearch("");
    }
  };

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);

        fetchWithSearch("stars", 3, debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results as PostResult[]);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <nav className=" ">
      <div id="search-container " className="flex flex-col relative">
        <div className="flex justify-start mx-auto gap-[6px] px-[15px] py-[6px] items-center rounded-[6px] border-[2px] border-gray-300">
          <input
            className=" text-[14px] w-full outline-none focus:border-saucyRed "
            type="search"
            placeholder="Search or jump to...   "
            id="repo-search"
            onChange={inputOnChangeHandler}
            onFocus={() => setFocus(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocus(false);
              }, 200)
            }
            name="repo-search"
            aria-label="Search through repositories rendered out"
          />
          <FaSearch className="text-gray-300" />

        </div>

        {results.length > 0 && hasFocus && (
          <div className="bg-offWhite rounded-xl font-roboto w-[10px] tablet:w-[700px] absolute pb-2 top-12 md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] z-50">
            <div className="flex">
              <div className="w-full">
                <h1 className="text-lightGrey p-[15px] uppercase text-xs border-b-2 w-full">
                  Repository
                  {isSearching && <FaSpinner aria-hidden="true" className="animate-spin inline-block float-right" />}
                </h1>

                <div>
                  {results.map((result) => (
                    <a
                      rel="noreferrer"
                      role="button"
                      tabIndex={0}
                      aria-pressed="false"
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          await clickHandler(result.full_name);
                        }
                      }}
                      target="_blank"
                      href={`https://app.opensauced.pizza/repos/${result.full_name}`}
                    >
                      <div
                        key={result.full_name}
                        className="flex text-grey text-xs sm:text-lg px-[15px] py-[10px] font-medium overflow-hidden cursor-pointer hover:bg-gray-200"
                      >
                        <div>
                          <h2>{result.full_name}</h2>
                          <p className="text-sm text-gray-500">{result.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            {result.contributions.map((contribution) => (
                              <div className="flex items-center overflow-hidden rounded-full w-8 h-8">
                                <Avatar contributor={contribution.contributor} lastPr={contribution.last_merged_at} />
                              </div>
                            ))}
                            <span className="flex items-center ml-3">
                              <FaRegStar />
                              <span className="ml-1">{humanizeNumber(result.stars)} stars</span>
                            </span>
                            <span className="flex items-center ml-3">
                              <FaRegDotCircle />
                              <span className="ml-1">{humanizeNumber(result.issues)} issues</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center ml-auto">
                          <TextHoverElement text="Star this Repo">
                            <span>
                              <FaRegStar />
                            </span>
                          </TextHoverElement>
                          <TextHoverElement text="View this Repo">
                            <span className="ml-2">
                              <FaAngleRight />
                            </span>
                          </TextHoverElement>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrimaryNav;
