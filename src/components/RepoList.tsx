import { emojify } from "node-emoji";
import { useEffect } from "react";
import { FaDotCircle, FaStar } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink, getRepoLink } from "../lib/github";
import StackedAvatar from "./StackedAvatar";
import useVotedRepos from "../hooks/useVotedRepos";
import useContributions from "../hooks/useContributions";

export declare interface RepoListProps {
  data: DbRepo;
}

const RepoList = ({ data }: RepoListProps): JSX.Element => {
  const {
    id,
    name,
    full_name,
    description,
    stars,
    issues,

    // contributionsCount,
  } = data;

  // {full_name} consists of `{owner}/{repo}`, so this link is actually `repos/{owner}/{repo}/contributions`
  const { data: contributions } = useContributions(full_name);

  const owner = full_name.replace(`/${String(name)}`, "").trim();

  return (
    <div className="flex flex-col gap-y-5 md:flex-row bg-white border-[1px] p-4 gap-x-5 font-Inter border-borderGrey overflow-hidden rounded-[16px]">
      <div className="flex gap-y-5 gap-x-5 font-Inter overflow-hidden w-full">
        <div>
          <div className="rounded-[8px] overflow-hidden w-[88px] h-[88px]">
            <a href={getRepoLink(full_name)} rel="noopener noreferrer" target="_blank" title={`Visit ${full_name}`}>
              <img alt={full_name} src={getAvatarLink(owner)} />
            </a>
          </div>
        </div>

        <div className="flex-1 ml-[0.313rem] sm:ml-0">
          <a href={getRepoLink(full_name)} rel="noopener noreferrer" target="_blank" title={`Visit ${full_name}`}>
            <p className="text-sm text-textGrey">{full_name}</p>

            <p className="text-base text-textGrey">{emojify(description)}</p>
          </a>

          <div className="flex gap-x-[16px] mt-[16px]">
            <div className="flex gap-[5px] items-center text-textGrey">
              <FaDotCircle aria-hidden="true" className="w-[16px]" />

              <p className="text-sm">{humanizeNumber(issues)}</p>
            </div>

            <div className="flex gap-[5px] items-center text-textGrey">
              <FaStar aria-hidden="true" className="w-[16px]" />

              <p className="text-sm">{humanizeNumber(stars)}</p>
            </div>

            <StackedAvatar contributors={contributions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
