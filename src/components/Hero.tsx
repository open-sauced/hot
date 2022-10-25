import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDebounce, useDidUpdate, useKeys } from "rooks";
import { FaRegDotCircle, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import cx from "classnames";

// import StackedAvatar from "./StackedAvatar";
import { fetchRecommendations } from "../lib/supabase";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink } from "../lib/github";
import searchNormal from "../assets/searchNormal.svg";
import cmdKIcon from "../assets/cmdK.svg";
import useStarRepos from "../hooks/useStarRepos";

const Hero = () => {
  const containerRef = useRef<Document>(document);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const setValueDebounced = useDebounce(setSearchTerm, 500);
  const [fetchedData, setFetchedData] = useState<DbRepo[]>([]);
  const [hasFocus, setFocus] = useState(false);
  const [stars, setStars] = useState(0);
  const { starHandler, checkStarred } = useStarRepos();

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

  // const handleStar = (e: React.ChangeEvent<HTMLDivElement>) => console.log({ click: e.target.nodeValue });

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

        <img alt="command k" className="pt-1.5" src={cmdKIcon} />
      </div>

      <div className="mt-2.5 flex w-full justify-center relative">
        {fetchedData.length > 0 && hasFocus && (
          <div className="flex md:min-w-96 pb-2 absolute z-50 max-w-96 flex-col bg-white rounded-2.5 shadow-2xl">
            <div className="bg-gray-100 py-2.5 px-10 md:px-3.5 border-b-gray-100 border-b-0.5 rounded-2.5 rounded-b-none w-full">
              <p className="text-gray-500 text-sm font-semibold">Repository</p>
            </div>

            {fetchedData.map(({ id, full_name, name, description, issues, stars: repoStars }) => {
              const isStarred = checkStarred(id);

              return (
                <div key={full_name} className="flex flex-col hover:bg-gray-50 ">
                  <div className="flex flex-col px-10 md:px-3.5 py-2.5">
                    <a href={`https://app.opensauced.pizza/repos/${full_name}`} rel="noreferrer" target="_blank">
                      <div className="flex items-center gap-x-2.5 mb-1">
                        <div className="w-6 h-6 overflow-hidden border-gray-400 border-px bg-red-100 rounded-full">
                          <img
                            alt={full_name}
                            className="w-full h-full"
                            src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
                          />
                        </div>

                        <p className="text-base text-gray-500 font-semibold">{full_name}</p>
                      </div>

                      <p className="text-sm text-gray-500">{description}</p>
                    </a>

                    <div className="flex justify-between mt-2">
                      {/* <div className="flex gap-x-1">
                          <StackedAvatar contributors={contributions} />
                        </div> */}

                      <div className="flex gap-x-1.5">
                        <div className="flex items-center gap-x-1">
                          <FaRegDotCircle aria-hidden="true" />

                          <p className="text-gray-500 text-xs">{humanizeNumber(issues)}</p>
                        </div>

                        <div
                          className="flex items-center gap-x-1"
                          onClick={async () => {
                            setTimeout(() => {
                              setFocus(true);
                            }, 100);
                            starHandler(repoStars, id).then(
                              (newStars) => typeof newStars === "number" && setStars(newStars)
                            );
                          }}
                        >
                          {isStarred ? (
                            <FaStar aria-hidden="true" className="mr-1 text-osOrange" />
                          ) : (
                            <AiOutlineStar aria-hidden="true" className="mr-1" />
                          )}

                          <p className={cx("text-xs", isStarred ? "text-osOrange" : "text-gray-500")}>
                            {humanizeNumber(stars > repoStars ? stars : repoStars)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
