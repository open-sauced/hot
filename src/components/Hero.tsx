import { useEffect, useState } from "react";
import searchNormal from "../assets/searchNormal.svg";
import starIcon from "../assets/starIcon.svg";
import issueIcon from "../assets/issueIcon.svg";
import { fetchWithSearch } from "../lib/supabase";
// import useDebounce from "../hooks/useDebounce";
import humanizeNumber from "../lib/humanizeNumber";
import { useDebounce, useDidUpdate } from "rooks";

type PostResult = {
  full_name: string;
  user_id: number;
  description: string;
  stars: number;
  issues: string;
  contributions: { url: string; contributor: string; last_merged_at: string }[];
};

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);
  const setValueDebounced = useDebounce(setSearchTerm, 500);
  const [results, setResults] = useState<PostResult[]>([]);
  const [hasFocus, setFocus] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(searchTerm);
  //   fetchWithSearch("stars", 3, searchTerm).then((results) => {
  //     setResults(results as unknown as []);
  //   });

  //   // if (setValueDebounced) {
  //   //   console.log(searchTerm);
  //   //   fetchWithSearch("stars", 3, searchTerm).then((results) => {
  //   //     setResults(results as unknown as []);
  //   //   });
  //   // } else {
  //   //   setResults([]);
  //   // }
  // }, [setValueDebounced]);

  useDidUpdate(() => {
    console.log(searchTerm);
    fetchWithSearch("stars", 3, searchTerm).then((results) => {
      setResults(results as unknown as []);
    });
  }, [searchTerm]);

  return (
    <div className="flex flex-col py-[95px] items-center mx-[10px]">
      <div>
        <h1 className="font-Lexend text-4xl md:text-5xl text-center text-lightSlate leading-tight tracking-tight">
          Find{" "}
          <span className="bg-gradient-to-r from-gradFirst via-gradMiddle to-gradLast bg-clip-text text-transparent">
            Open-Source Repositories
          </span>{" "}
          <br /> to contribute today
        </h1>
      </div>
      <div className="mt-[45px] px-[15px] gap-x-[10px] py-[10px] justify-between bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[16px] md:min-w-[422px] flex">
        <img src={searchNormal} alt="search icon" />
        {/* <input
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)
          }
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search repositories"
          className="w-full outline-none text-[16px] text-lightSlate"
        /> */}
        <input
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)
          }
          onChange={(e) => setValueDebounced(e.target.value)}
          type="text"
          placeholder="Search repositories"
          className="w-full outline-none text-[16px] text-lightSlate"
        />
        {/* todo: implement keyboard shortcut to bring the input field in focus - issue #205 */}
        {/* <img className='pt-[7px]' src={cmdK} alt="command k" /> */}
      </div>
      <div className="mt-[10px] flex w-full justify-center relative">
        {results.length > 0 && hasFocus && (
          <div className="flex md:min-w-[400px] pb-[8px] absolute z-50 max-w-[400px] flex-col bg-white rounded-[10px]">
            <div className="bg-gray-100 py-[10px] px-[10px] md:px-[15px] border-b-gray-100 border-b-[2px] rounded-[10px] rounded-b-none w-full">
              <p className="text-gray-500 text-[14px] font-semibold">Repository</p>
            </div>

            {results.map(({ full_name, description, issues, stars, user_id }) => (
              <a
                key={user_id}
                href={`https://app.opensauced.pizza/repos/${full_name}`}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex flex-col hover:bg-gray-50 ">
                  <div className="flex flex-col px-[10px] md:px-[15px] py-[10px]">
                    <div className="flex items-center gap-x-[10px] mb-[5px]">
                      <div className="w-[25px] h-[25px] overflow-hidden border-gray-400 border-[1px] bg-red-100  rounded-full">
                        <img
                          className="w-full h-full"
                          src={`https://avatars.githubusercontent.com/u/${user_id}`}
                          alt={full_name}
                        />
                      </div>

                      <p className="text-[16px] text-gray-500 font-semibold">{full_name}</p>
                    </div>

                    <p className="text-[14px] text-gray-500">{description}</p>

                    <div className="flex justify-between mt-[8px]">
                      <div className="flex gap-x-[5px]">
                        <div className="w-[20px] h-[20px] rounded-full">
                          {/* todos: add contributors avator here */}
                        </div>
                      </div>
                      <div className="flex gap-x-[6px]">
                        <div className="flex items-center gap-x-[5px]">
                          <img src={issueIcon} alt="issue" />
                          <p className="text-gray-500 text-[12px]">{humanizeNumber(issues)}</p>
                        </div>
                        <div className="flex items-center gap-x-[5px]">
                          <img src={starIcon} alt="star" />
                          <p className="text-gray-500 text-[12px]">{humanizeNumber(stars)}</p>
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
