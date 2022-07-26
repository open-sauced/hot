import React, { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import hotIcon from "../assets/hotIcon.png";
import { User } from "@supabase/supabase-js";
import { capturePostHogAnayltics } from "../lib/analytics";
import { updateVotesByRepo } from "../lib/supabase";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

const hotRepo = [
  {
    repo_id: 357728069,
    organization: "Oven",
    orgImg: "https://avatars.githubusercontent.com/u/108928776?s=200&v=4",
    name: "Bun",
    description: "Incredibly fast JavaScript runtime, bundler, transpiler and package manager.",
    votes: 2,
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
    repo_id: 510607652,
    organization: "Pocketbase",
    orgImg: "https://avatars.githubusercontent.com/u/101000011?s=200&v=4",
    name: "Pocketbase",
    description: "Open Source realtime backend in 1 file",
    votes: 1,
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
    repo_id: 71359796,
    organization: "Open-Sauced",
    orgImg: "https://avatars.githubusercontent.com/u/57568598?s=200&v=4",
    name: "Open-Sauced",
    description: " This is a project to identify your next open source contribution.",
    votes: 3,
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

export declare interface HotReposProps {
  user: User | null;
}

const HotRepositories = ({ user }: HotReposProps): JSX.Element => {
  const {
    user_metadata: { sub: user_id },
  } = user || { user_metadata: { sub: null } };
  const [hotRepos, setHotRepos] = useState(hotRepo);

  const { signIn } = useSupabaseAuth();

  // * This function is just a placeholder to help change the color and state of the selected button on the card.
  const handleVoted = (repo_id: number) => {
    const votedIdx = hotRepos.findIndex((obj) => obj.repo_id == repo_id);
    hotRepos[votedIdx].upvoted = !hotRepos[votedIdx].upvoted;
    setHotRepos([...hotRepos]);
  };

  async function handleVoteUpdateByRepo(votes: number, repo_id: number) {
    user_id && capturePostHogAnayltics("User voted", "voteClick", "true");

    await updateVotesByRepo(votes, repo_id, user_id);
    handleVoted(repo_id);
  }

  return (
    <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
      <div className="flex space-x-3 items-center">
        <img src={hotIcon} alt="Hot Repo Icon" className="h-5 w-5" />
        <h1 className="text-white font-bold text-2xl">Hot Repositories</h1>
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-5">
        {hotRepos.map(
          ({ repo_id, orgImg, organization, name, description, votes, upvoted, issues, stars, PR, img }) => (
            <div key={repo_id} className="p-4 border rounded-lg bg-white w-full space-y-1 relative">
              {/* header & upvote button */}
              <div className="flex justify-between w-full">
                <div className="flex space-x-1 items-center">
                  <img src={orgImg} alt="Hot Repo Icon" className="h-4 w-4 rounded-md overflow-hidden" />
                  <span className="text-xs text-gray-400">{organization}</span>
                </div>
                <button
                  className={`px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-xs transition-all duration-200 ${
                    upvoted ? "text-saucyRed border-saucyRed " : "text-grey border-gray-500 "
                  }`}
                  onClick={() => (user_id ? handleVoteUpdateByRepo(votes, repo_id) : signIn({ provider: "github" }))}
                >
                  <span className="">{upvoted ? "voted" : "upvote"}</span>
                  {upvoted ? <RiCheckboxCircleFill className="" /> : <FaArrowAltCircleUp className="" />}
                </button>
              </div>
              {/* repo name & description */}
              <div className="flex flex-col pb-10">
                <h1 className="text-xl font-semibold">{name}</h1>
                <p className="text-gray-500 text-xs w-5/6">{description}</p>
              </div>
              {/* issues || star || PRs || Avatar */}
              <div className="flex items-center justify-between absolute bottom-3 inset-x-0 px-4">
                {/* issues || star || PRs*/}
                <div className="flex space-x-3 text-xs">
                  <div className="flex space-x-1 justify-center items-center">
                    <VscIssues />
                    <span>{issues}</span>
                  </div>

                  <div className="flex space-x-1 justify-center items-center">
                    <AiOutlineStar />
                    <span>{stars}</span>
                  </div>

                  <div className="flex space-x-1 justify-center items-center">
                    <BiGitPullRequest />
                    <span>{PR}</span>
                  </div>
                </div>
                {/* Avatars */}
                <div className="-space-x-2 flex hover:space-x-0 transition-all duration-300 ">
                  {img.map((avatarImg) => (
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
          )
        )}
      </div>
    </div>
  );
};

export default HotRepositories;
