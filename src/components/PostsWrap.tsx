import React, { useState, useEffect } from "react";
import LayoutToggle from "./LayoutToggle";
import Modal from "./Modal";
import SecondaryNav from "./SecondaryNav";
import GridDisplay from "./GridDisplay";
import ListDisplay from "./ListDisplay";
import { fetchRecommendations } from "../lib/supabase";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import locationsHash from "../lib/locationsHash";
import { useLocation, useSearchParams } from "react-router-dom";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { RiCheckboxCircleFill } from "react-icons/ri";

interface PostWrapProps {
  textToSearch: string;
}

const parseLimitValue = (limit: string | null): number => {
  if (!limit) {
    return 25;
  }
  const value = parseInt(limit);
  if (isNaN(value) || value <= 0) {
    return 25;
  }
  if (value > 100) {
    return 125;
  }
  return value;
};

const hotRepo = [
  {
    id: 0,
    organization: "Oven",
    orgImg: "https://avatars.githubusercontent.com/u/108928776?s=200&v=4",
    name: "Bun",
    description: "Incredibly fast JavaScript runtime, bundler, transpiler and package manager.",
    upvoted: false,
    issues: "503",
    stars: "27.7k",
    PR: "262",
    img: [
      "https://avatars.githubusercontent.com/u/709451?s=64&v=4",
      "https://avatars.githubusercontent.com/u/2148168?s=64&v=4",
      "https://avatars.githubusercontent.com/u/70155278?s=64&v=4",
      "https://avatars.githubusercontent.com/u/56601352?s=64&v=4",
      "https://avatars.githubusercontent.com/u/790659?s=64&v=4",
    ],
  },
  {
    id: 1,
    organization: "Pocketbase",
    orgImg: "https://avatars.githubusercontent.com/u/101000011?s=200&v=4",
    name: "Pocketbase",
    description: "Open Source realtime backend in 1 file",
    upvoted: false,
    issues: "72",
    stars: "7.3k",
    PR: "32",
    img: [
      "https://avatars.githubusercontent.com/u/8248071?s=64&v=4",
      "https://avatars.githubusercontent.com/u/43366254?s=64&v=4",
      "https://avatars.githubusercontent.com/u/38179369?s=64&v=4",
      "https://avatars.githubusercontent.com/u/26606825?s=64&v=4",
      "https://avatars.githubusercontent.com/u/8593614?s=64&v=4",
    ],
  },
  {
    id: 2,
    organization: "Open-Sauced",
    orgImg: "https://avatars.githubusercontent.com/u/57568598?s=200&v=4",
    name: "Open-Sauced",
    description: " This is a project to identify your next open source contribution.",
    upvoted: false,
    issues: "293",
    stars: "726",
    PR: "1k",
    img: [
      "https://avatars.githubusercontent.com/u/5713670?s=64&v=4",
      "https://avatars.githubusercontent.com/u/237133?s=64&v=4",
      "https://avatars.githubusercontent.com/u/11777161?s=64&v=4",
      "https://avatars.githubusercontent.com/u/14043845?s=64&v=4",
      "https://avatars.githubusercontent.com/u/22990146?s=60&v=4",
    ],
  },
];

const PostsWrap = ({ textToSearch }: PostWrapProps): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  // const [activeLink, setActiveLink] = useState("popular");
  // const [limit, setLimit] = useState(25);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<DbRecomendation[]>([]);
  const [hotRepos, setHotRepos] = useState(hotRepo);
  const { user } = useSupabaseAuth();
  const location = useLocation();

  const activeLink = locationsHash[location.pathname] || "popular";
  const limit = parseLimitValue(searchParams.get("limit"));

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 25) });
  };

  const handleVoted = (id: number) => {
    const votedIdx = hotRepos.findIndex((obj) => obj.id == id);
    hotRepos[votedIdx].upvoted = !hotRepos[votedIdx].upvoted;

    setHotRepos([...hotRepos]);
  };

  useEffect(() => {
    fetchRecommendations(activeLink, limit, user, textToSearch).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit, textToSearch]);

  return (
    <div className="bg-darkestGrey">
      <Modal />
      <SecondaryNav activeLink={activeLink} user={user} />
      {/* Hot Repositories */}
      <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
        <div className="flex space-x-3 items-center">
          <img src="/hotIcon.png" alt="Hot Repo Icon" className="h-5 w-5" />
          <h1 className="text-white font-bold text-2xl">Hot Repositories</h1>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-5">
          {hotRepos.map((repo) => (
            <div key={repo.id} className="p-4 border rounded-lg bg-white w-full space-y-1 relative">
              {/* header & upvote button */}
              <div className="flex justify-between w-full">
                <div className="flex space-x-1 items-center">
                  <img src={repo.orgImg} alt="Hot Repo Icon" className="h-4 w-4 rounded-md overflow-hidden" />
                  <span className="text-xs text-gray-400">{repo.organization}</span>
                </div>
                <button
                  // className="px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-grey hover:text-saucyRed transition-all duration-200 "
                  className={`px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-[10px] transition-all duration-200 ${
                    repo.upvoted
                      ? "text-saucyRed border-saucyRed hover:text-gray-500 hover:border-gray-500"
                      : "text-grey border-gray-500 hover:text-saucyRed hover:border-saucyRed"
                  }`}
                  onClick={() => handleVoted(repo.id)}
                >
                  <span className="">{repo.upvoted ? "voted" : "upvote"}</span>
                  {repo.upvoted ? <RiCheckboxCircleFill className="" /> : <FaArrowAltCircleUp className="" />}
                </button>
              </div>
              {/* repo name & description */}
              <div className="flex flex-col pb-10">
                <h1 className="text-xl font-semibold">{repo.name}</h1>
                <p className="text-gray-500 text-xs w-5/6">{repo.description}</p>
              </div>
              {/* issues || star || PRs || Avatar */}
              <div className="flex items-center justify-between absolute bottom-3 inset-x-0 px-4">
                {/* issues || star || PRs*/}
                <div className="flex space-x-3 text-xs">
                  <div className="flex space-x-1 justify-center items-center">
                    <VscIssues />
                    <span>{repo.issues}</span>
                  </div>

                  <div className="flex space-x-1 justify-center items-center">
                    <AiOutlineStar />
                    <span>{repo.stars}</span>
                  </div>

                  <div className="flex space-x-1 justify-center items-center">
                    <BiGitPullRequest />
                    <span>{repo.PR}</span>
                  </div>
                </div>
                {/* Avatars */}
                <div className="-space-x-2 flex hover:space-x-0 transition-all duration-300 ">
                  {repo.img.map((avatarImg) => (
                    <img
                      key={avatarImg}
                      src={avatarImg}
                      alt="Contributor"
                      className="w-5 h-5 rounded-full border border-white "
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? (
          <GridDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData}
          />
        ) : (
          <ListDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData}
          />
        )}
      </div>
    </div>
  );
};

export default PostsWrap;
