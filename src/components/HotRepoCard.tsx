import useSWR from "swr";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import { getAvatarLink } from "../lib/github";
import humanizeNumber from "../lib/humanizeNumber";
import StackedAvatar from "./StackedAvatar";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import handleVoteUpdateByRepo from "../lib/handleVoteUpdateByRepo";
import useRepo from "../hooks/useRepo";

export declare interface HotRepoCardProps {
  repoName: string;
}

const HotRepoCard = ({ repoName }: HotRepoCardProps): JSX.Element => {
  const { signIn, user } = useSupabaseAuth();
  const { user_metadata: { sub: user_id } } = user! || { user_metadata: { sub: null } };

  const { repo, isLoading, isError } = useRepo(repoName);

  if (isError) {
    return (
      <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative">
        {`${repoName} failed to load`}
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

  const { id, full_name, name, description, issues, stars, contributions } = repo ?? {};
  const owner = full_name?.replace(`/${String(name)}`, "").trim();

  const checkVoted = (id: number | undefined) => false;
  const handleVoteUpdate = async (votes: number, repo_id: number) => {
    await handleVoteUpdateByRepo(votes, repo_id, user_id);
    // handleVoted(repo_id);
  };


  return (
    <div className="p-4 border rounded-2xl bg-white w-full space-y-1 relative">
      <div className="flex justify-between w-full">
        <div className="flex space-x-1 items-center">
          <img
            alt="Hot Repo Icon"
            className="h-4 w-4 rounded-md overflow-hidden"
            src={getAvatarLink(owner ?? "open-sauced")}
          />

          <span className="text-sm font-medium text-lightSlate11">
            {owner}
          </span>
        </div>

        <button
          className={`px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-xs transition-all duration-200 ${
            checkVoted(id) ? "bg-lightOrange01" : "bg-lightSlate01"
          } ${checkVoted(id) ? "text-saucyRed border-saucyRed " : "text-lightSlate11 border-lightSlate06 "}`}
          onClick={async () => (user_id ? handleVoteUpdate(0, id ?? 0) : signIn({ provider: "github" }))}
        >
          <span>
            {checkVoted(id ?? 0) ? "voted" : "upvote"}
          </span>

          {checkVoted(id ?? 0)
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
          href={`https://app.opensauced.pizza/repos/${full_name ?? "open-sauced/hot"}`}
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
              {humanizeNumber(issues ?? 0)}
            </span>
          </div>

          <div className="flex text-sm space-x-1 justify-center items-center">
            <AiOutlineStar
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">
              {humanizeNumber(stars ?? 0)}
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

        <StackedAvatar contributors={contributions ?? []} />
      </div>
    </div>
  );
};

export default HotRepoCard;
