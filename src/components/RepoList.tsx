import { emojify } from "node-emoji";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaDotCircle, FaStar } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink, getRepoLink } from "../lib/github";
import StackedAvatar from "./StackedAvatar";
import useVotedRepos from "../hooks/useVotedRepos";
import { RiCheckboxCircleFill } from "react-icons/ri";
import cx from "classnames";
import useContributions from "../hooks/useContributions";

export declare interface RepoListProps {
  data: DbRepo;
}

const RepoList = ({ data }: RepoListProps): JSX.Element => {
  const { votedReposIds, checkVoted, voteHandler } = useVotedRepos();
  const [isVoted, setIsVoted] = useState(false);

  const {
    id,
    name,
    full_name,
    description,
    stars,
    issues,
    votesCount,

    // contributionsCount,
  } = data;

  // {full_name} consists of `{owner}/{repo}`, so this link is actually `repos/{owner}/{repo}/contributions`
  const { data: contributions } = useContributions(full_name);

  useEffect(() => {
    setIsVoted(checkVoted(id));
  }, [votedReposIds]);

  const repo_id = parseInt(`${id}`);
  const owner = full_name.replace(`/${String(name)}`, "").trim();

  const [votes, setVotes] = useState(votesCount ?? 0);

  return (
    <div className="flex flex-col gap-y-5 md:flex-row bg-white border-[1px] p-4 gap-x-5 font-Inter border-borderGrey overflow-hidden rounded-[16px]">
      <div className="flex gap-y-5 gap-x-5 font-Inter overflow-hidden w-full">
        <div>
          <div className="rounded-[8px] overflow-hidden w-[88px] h-[88px]">
            <a
              href={getRepoLink(full_name)}
              rel="noopener noreferrer"
              target="_blank"
              title={`Visit ${full_name}`}
            >
              <img
                alt={full_name}
                src={getAvatarLink(owner)}
              />
            </a>
          </div>
        </div>

        <div className="flex-1 ml-[0.313rem] sm:ml-0">
          <a
            href={getRepoLink(full_name)}
            rel="noopener noreferrer"
            target="_blank"
            title={`Visit ${full_name}`}
          >
            <p className="text-sm text-textGrey">
              {full_name}
            </p>

            <p className="text-base text-textGrey">
              {emojify(description)}
            </p>
          </a>


          <div className="flex gap-x-[16px] mt-[16px]">
            <div className="flex gap-[5px] items-center text-textGrey">
              <FaDotCircle
                aria-hidden="true"
                className="w-[16px]"
              />

              <p className="text-sm">
                {humanizeNumber(issues)}
              </p>
            </div>

            <div className="flex gap-[5px] items-center text-textGrey">
              <FaStar
                aria-hidden="true"
                className="w-[16px]"
              />

              <p className="text-sm">
                {humanizeNumber(stars)}
              </p>
            </div>

            <StackedAvatar contributors={contributions} />
          </div>
        </div>
      </div>

      <button
        className={cx(
          "w-full min-w-[60px] rounded-[6px] group border-[1px] cursor-pointer transition-all duration-200 flex gap-[5px] py-[10px] justify-center items-center",
          isVoted ? "bg-lightOrange01 border-osOrange" : "bg-white",
          "md:w-[60px] md:py-0 md:flex-col",
          isVoted ? "hover:border-osGrey hover:bg-gray-100" : "hover:border-osOrange",
        )}
        onClick={async () =>
          voteHandler(votes, repo_id).then(newVotes => typeof newVotes === "number" && setVotes(newVotes))}
      >
        {isVoted
          ? (
            <RiCheckboxCircleFill className="text-osOrange group-hover:text-osGrey transition-all duration-300 w-[15px] h-[15px]" />)
          : (
            <FaArrowAltCircleUp className="text-gray-500 group-hover:text-osOrange transition-all duration-300 w-[13px] h-[13px]" />
          )}

        <span
          className={cx(
            "text-xs font-semibold",
            isVoted ? "text-osOrange" : "text-gray-500",
            isVoted ? "group-hover:text-osGrey" : "group-hover:text-osOrange",
          )}
        >
          {humanizeNumber(votes)}
        </span>
      </button>
    </div>
  );
};

export default RepoList;
