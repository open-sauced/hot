import { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import { getAvatarLink } from "../lib/github";
import humanizeNumber from "../lib/humanizeNumber";

import StackedAvatar from "./StackedAvatar";
import useRepo from "../hooks/useRepo";
import useVotedRepos from "../hooks/useVotedRepos";
import useContributions from "../hooks/useContributions";

const bugReportLink = "https://github.com/open-sauced/hot/issues/new?assignees=&title=fix:";

export declare interface HotRepoCardProps {
  repoName: string;
}

const HotRepoCard = ({ repoName }: HotRepoCardProps): JSX.Element => {
  const { votedReposIds, checkVoted, voteHandler } = useVotedRepos();
  const { repo, isLoading, isError } = useRepo(repoName);
  const [isVoted, setIsVoted] = useState(false);
  const { data: contributions } = useContributions(repoName);

  useEffect(() => {
    repo && setIsVoted(checkVoted(repo.id));
  }, [votedReposIds, repo]);

  if (isError) {
    return (
      <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative flex flex-col justify-between">
        {`⚠️ ${repoName} repo could not be loaded`}

        <div className="flex justify-center">
          <a
            className="bg-cheesyYellow text-grey rounded-xl font-bold hover:text-saucyRed transition-all duration-300 mr-3 p-2 flex w-5/6 h-fit justify-center"
            href={`${String(`${bugReportLink} repo not found [${repoName}]&body=Please take a look why this  ${repoName} not founded`)}`}
            rel="noreferrer"
            target="_blank"
          >
            Report a bug
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative">
        <Skeleton
          enableAnimation
          count={5}
        />
      </div>
    );
  }

  const { id, full_name, name, description, issues, stars } = repo!;
  const repo_id = parseInt(`${id}`);
  const owner = full_name.replace(`/${String(name)}`, "").trim();

  return (
    <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative">
      <div className="flex justify-between w-full">
        <div className="flex space-x-1 items-center">
          <img
            alt="Hot Repo Icon"
            className="h-4 w-4 rounded-md overflow-hidden"
            src={getAvatarLink(owner)}
          />

          <span className="text-sm font-medium text-lightSlate11">
            {owner}
          </span>
        </div>

        <button
          className={`px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-xs transition-all duration-200 ${
            isVoted ? "bg-lightOrange01" : "bg-lightSlate01"
          } ${isVoted ? "text-saucyRed border-saucyRed " : "text-lightSlate11 border-lightSlate06 "}`}
          onClick={async () => voteHandler(0, repo_id)}
        >
          <span>
            {isVoted ? "voted" : "upvote"}
          </span>

          {isVoted
            ? (
              <RiCheckboxCircleFill className="" />)
            : (
              <FaArrowAltCircleUp className="fill-lightSlate09" />
            )}
        </button>
      </div>

      <div className="flex flex-col pb-10">
        <a
          className="text-xl font-semibold"
          href={`https://insights.opensauced.pizza/hot/repositories/filter/${full_name}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {name}
        </a>

        <p className="text-gray-500 font-medium text-xs w-5/6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between absolute bottom-3 inset-x-0 px-4">
        <div className="flex space-x-3 text-xs">
          <div className="flex text-sm space-x-1 justify-center items-center">
            <VscIssues
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">
              {humanizeNumber(issues)}
            </span>
          </div>

          <div className="flex text-sm space-x-1 justify-center items-center">
            <AiOutlineStar
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">
              {humanizeNumber(stars)}
            </span>
          </div>

          <div className="flex text-sm space-x-1 justify-center items-center">
            <BiGitPullRequest
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">0</span>
          </div>
        </div>

        <StackedAvatar contributors={contributions} />
      </div>
    </div>
  );
};

export default HotRepoCard;
