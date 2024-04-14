import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import { getAvatarLink } from "../lib/github";
import humanizeNumber from "../lib/humanizeNumber";

import useRepo from "../hooks/useRepo";

const bugReportLink = "https://github.com/open-sauced/hot/issues/new?assignees=&title=fix:";

export declare interface HotRepoCardProps {
  repoName: string;
}

const HotRepoCard = ({ repoName }: HotRepoCardProps): JSX.Element => {
  const { repo, isLoading, isError } = useRepo(repoName);

  if (isError) {
    return (
      <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative flex flex-col justify-between">
        {`⚠️ ${repoName} repo could not be loaded`}

        <div className="flex justify-center">
          <a
            className="bg-cheesyYellow text-grey rounded-xl font-bold hover:text-saucyRed transition-all duration-300 mr-3 p-2 flex w-5/6 h-fit justify-center"
            rel="noreferrer"
            target="_blank"
            href={`${String(
              `${bugReportLink} repo not found [${repoName}]&body=Please take a look why this  ${repoName} not founded`,
            )}`}
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

  const { full_name, name, description, issues, stars } = repo!;
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
      </div>

      <div className="flex flex-col pb-10">
        <a
          className="text-xl font-semibold"
          href={`https://app.opensauced.pizza/s/${full_name}`}
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

        {/* <StackedAvatar contributors={contributions} /> */}
      </div>
    </div>
  );
};

export default HotRepoCard;
