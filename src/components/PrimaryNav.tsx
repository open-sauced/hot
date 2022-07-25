import React, { useState, useEffect, ChangeEvent } from "react";
import { Menu } from "@headlessui/react";
import logo from "../assets/logo.svg";
import { FaSpinner } from "react-icons/fa";
import { capturePostHogAnayltics } from "../lib/analytics";
import { version } from "../../package.json";
import { fetchWithSearch } from "../lib/supabase";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import Avatar from "./Avatar";

import { FaAngleRight, FaRegStar, FaRegDotCircle } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import TextHoverElement from "./TextHoverElement";

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
  const { signIn, signOut, user } = useSupabaseAuth();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

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
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-2 sm:px-4 py-4 sm:py-2 items-center">
      <div className="flex-1 flex items-center">
        <a href="https://opensauced.pizza">
          <img className="h-7 mr-4" alt="open sauced" src={logo} />
        </a>
        <div id="search-container" className="flex flex-col relative w-full max-w-lg">
          <input
            className=" bg-gray-200 rounded-lg shadow-md h-full py-2 px-3 text-[9px] ml-2 sm:ml-0 sm:text-xs w-3/4 sm:w-2/3 focus:outline-none focus:border-saucyRed focus:ring-1 focus:ring-saucyRed"
            type="search"
            placeholder="search or jump to...   "
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
          {results.length > 0 && hasFocus && (
            <div className="bg-offWhite rounded-xl font-roboto w-full absolute pb-2 top-12 md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] z-50">
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
                        target="_blank"
                        href={`https://app.opensauced.pizza/repos/${result.full_name}`}
                      >
                        <div
                          key={result.full_name}
                          className="flex text-grey text-xs sm:text-lg px-[15px] py-[10px] font-medium overflow-hidden cursor-pointer hover:bg-gray-200 "
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
                                <FaRegStar aria-hidden="true" />
                                <span className="ml-1">{humanizeNumber(result.stars)} stars</span>
                              </span>
                              <span className="flex items-center ml-3">
                                <FaRegDotCircle aria-hidden="true" />
                                <span className="ml-1">{humanizeNumber(result.issues)} issues</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center ml-auto">
                            <TextHoverElement text="Star this Repo">
                              <span>
                                <FaRegStar aria-hidden="true" />
                              </span>
                            </TextHoverElement>
                            <TextHoverElement text="View this Repo">
                              <span className="ml-2">
                                <FaAngleRight aria-hidden="true"   />
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
      </div>
      {!user && (
        <div className="items-center">
          <button
            className="cursor-pointer"
            onClick={async () => {
              capturePostHogAnayltics("User Login", "userLoginAttempt", "true");
              await signIn({ provider: "github" });
            }}
          >
            Login
          </button>
        </div>
      )}
      {user && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <div className="items-center">
              <div className="rounded-full shadow-md w-10 h-10 overflow-hidden ring-2 ring-saucyRed">
                {user && (
                  <img
                    className="object-cover w-[500] h-[500]"
                    src={user.user_metadata.avatar_url}
                    alt={`${user.user_metadata.user_name}-avatar`}
                  />
                )}
              </div>
            </div>
          </Menu.Button>
          <Menu.Items className="z-40 absolute right-0 w-56 origin-top-right rounded-md shadow-lg shadow-gray-700/80 border-gray-700 border-2 focus:outline-none px-1 py-1 bg-darkestGrey text-sm font-semibold">
            <Menu.Item>
              {({ active }) => (
                <a href={`https://github.com/${user.user_metadata.user_name}`}>
                  <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200`}>
                    {user.user_metadata.user_name}
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200`}>
                  v{version}
                </span>
              )}
            </Menu.Item>
            <Menu.Item
              onClick={async () => {
                await signOut();
              }}
            >
              {({ active }) => (
                <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200 cursor-pointer`}>
                  Logout
                </span>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </nav>
  );
};

export default PrimaryNav;
