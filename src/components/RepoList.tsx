// import { emojify } from "node-emoji";
import { FaStar } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink, getRepoLink } from "../lib/github";

export declare interface RepoListProps {
  data: DbRepo;
}

const RepoList = ({ data }: RepoListProps): JSX.Element => {
  const {
    repo_name,
    star_count,

    // contributionsCount,
  } = data;

  /*
   * {repo_name} consists of `{owner}/{repo}`, so this link is actually `repos/{owner}/{repo}/contributions`
   * const { data: contributions } = useContributions(repo_name);
   */

  const owner = repo_name.split("/")[0];

  return (
    <div className="flex flex-col gap-y-5 md:flex-row bg-white border-[1px] p-4 gap-x-5 font-Inter border-borderGrey overflow-hidden rounded-[16px]">
      <div className="flex gap-y-5 gap-x-5 font-Inter overflow-hidden w-full">
        <div>
          <div className="rounded-[8px] overflow-hidden w-[88px] h-[88px]">
            <a href={getRepoLink(repo_name)} rel="noopener noreferrer" target="_blank" title={`Visit ${repo_name}`}>
              <img alt={repo_name} src={getAvatarLink(owner)} />
            </a>
          </div>
        </div>

        <div className="flex-1 ml-[0.313rem] sm:ml-0">
          <a href={getRepoLink(repo_name)} rel="noopener noreferrer" target="_blank" title={`Visit ${repo_name}`}>
            <p className="text-sm text-textGrey">{repo_name}</p>
          </a>

          <div className="flex gap-x-[16px] mt-[16px]">
            <div className="flex gap-[5px] items-center text-textGrey">
              <FaStar aria-hidden="true" className="w-[16px]" />

              {star_count && <p className="text-sm">{humanizeNumber(star_count)} today</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
