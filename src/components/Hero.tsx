import { MutableRefObject, useRef, useState } from "react";
import { useDebounce, useDidUpdate, useKeys } from "rooks";
import { FaRegDotCircle } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import StackedAvatar from "./StackedAvatar";
import { fetchRecommendations } from "../lib/supabase";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink } from "../lib/github";
import searchNormal from "../assets/searchNormal.svg";
import cmdKIcon from "../assets/cmdK.svg";

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
          className="pt-[7px]"
          src={cmdKIcon}
        />
      </div>

      <div className="mt-[10px] flex w-full justify-center relative">
        {fetchedData.length > 0 && hasFocus && (
          <div className="flex md:min-w-[400px] pb-[8px] absolute z-50 max-w-[400px] flex-col bg-white rounded-[10px] shadow-2xl">
            <div className="bg-gray-100 py-[10px] px-[10px] md:px-[15px] border-b-gray-100 border-b-[2px] rounded-[10px] rounded-b-none w-full">
              <p className="text-gray-500 text-sm font-semibold">Repository</p>
            </div>

            {fetchedData.map(({ full_name, name, description, issues, stars, contributions }) => (
              <a
                key={full_name}
                href={`https://app.opensauced.pizza/repos/${full_name}`}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex flex-col hover:bg-gray-50 ">
                  <div className="flex flex-col px-[10px] md:px-[15px] py-[10px]">
                    <div className="flex items-center gap-x-[10px] mb-[5px]">
                      <div className="w-[25px] h-[25px] overflow-hidden border-gray-400 border-[1px] bg-red-100  rounded-full">
                        <img
                          alt={full_name}
                          className="w-full h-full"
                          src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
                        />
                      </div>

                      <p className="text-base text-gray-500 font-semibold">
                        {full_name}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {description}
                    </p>

                    <div className="flex justify-between mt-[8px]">
                      <div className="flex gap-x-[5px]">
                        <StackedAvatar contributors={contributions} />
                      </div>

                      <div className="flex gap-x-[6px]">
                        <div className="flex items-center gap-x-[5px]">
                          <FaRegDotCircle aria-hidden="true" />

                          <p className="text-gray-500 text-xs">
                            {humanizeNumber(issues)}
                          </p>
                        </div>

                        <div className="flex items-center gap-x-[5px]">
                          <AiOutlineStar
                            aria-hidden="true"
                            className="mr-1"
                          />

                          <p className="text-gray-500 text-xs">
                            {humanizeNumber(stars)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
