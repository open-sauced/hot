import { AiOutlineStar } from "react-icons/ai";
import useContributions from "../hooks/useContributions";
import { getAvatarLink } from "../lib/github";
import humanizeNumber from "../lib/humanizeNumber";
import StackedAvatar from "./StackedAvatar";
import { FaRegDotCircle, FaStar } from "react-icons/fa";
import cx from "classnames";
import { useEffect, useState } from "react";
import useStarRepos from "../hooks/useStarRepos";

export declare interface SearchedRepoCardProps {
  data: DbRepo;
  keepFocus: () => void
}

const SearchedRepoCard = ({ data: { id, full_name, name, description, issues, stars }, keepFocus }: SearchedRepoCardProps) => {
  const { data: contributions } = useContributions(full_name);
  const { starredReposIds, starHandler, checkStarred } = useStarRepos();

  const [starsCount, setStarsCount] = useState(stars);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    setIsStarred(checkStarred(id));
  }, [starredReposIds]);

  const handleStarRepo = async () => {
    keepFocus();
    return starHandler(starsCount, id).then(newStars => typeof newStars === "number" && setStarsCount(newStars));
  };

  return (
    <div className="flex flex-col hover:bg-gray-50 ">
      <div className="flex flex-col px-10 md:px-3.5 py-2.5">
        <a
          href={`https://app.opensauced.pizza/repos/${full_name}`}
          rel="noreferrer"
          target="_blank"
        >
          <div className="flex items-center gap-x-2.5 mb-1">
            <div className="w-6 h-6 overflow-hidden border-gray-400 border-px bg-red-100 rounded-full">
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
        </a>

        <div className="flex justify-between mt-2">
          <div className="flex gap-x-1">
            <StackedAvatar contributors={contributions} />
          </div>

          <div className="flex gap-x-1.5">
            <div className="flex items-center gap-x-1">
              <FaRegDotCircle aria-hidden="true" />

              <p className="text-gray-500 text-xs">
                {humanizeNumber(issues)}
              </p>
            </div>

            <div
              className="flex items-center gap-x-1"
              role="button"
              tabIndex={0}
              onClick={handleStarRepo}
              onKeyDown={e => e.preventDefault()}
            >
              {isStarred
                ? (
                  <FaStar
                    aria-hidden="true"
                    className="mr-1 text-osOrange"
                  />
                )
                : (

                  <AiOutlineStar
                    aria-hidden="true"
                    className="mr-1"
                  />
                )}

              <p className={cx("text-xs", isStarred ? "text-osOrange" : "text-gray-500")}>
                {humanizeNumber(starsCount)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchedRepoCard;
