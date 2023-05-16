import { emojify } from "node-emoji";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";
import useContributions from "../hooks/useContributions";
import { getAvatarLink } from "../lib/github";
import humanizeNumber from "../lib/humanizeNumber";
import StackedAvatar from "./StackedAvatar";

export declare interface SearchedRepoCardProps {
  data: DbRepo;
}

const SearchedRepoCard = ({ data: { full_name, name, description, issues, stars } }: SearchedRepoCardProps) => {
  const { data: contributions } = useContributions(full_name);

  return (
    <div className="flex flex-col hover:bg-gray-50 ">
      <div className="flex flex-col px-10 md:px-3.5 py-2.5">
        <div className="flex items-center gap-x-2.5 mb-1">
          <div className="w-6 h-6 overflow-hidden border-gray-400 border-px bg-red-100 rounded-full">
            <img
              alt={full_name}
              className="w-full h-full"
              src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
            />
          </div>

          <p className="text-sm text-gray-500">
            {emojify(description)}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          {description}
        </p>

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

            <div className="flex items-center gap-x-1">
              <AiOutlineStar
                aria-hidden="true"
                className="mr-1"
              />

              <p className="text-gray-500 text-xs">
                {humanizeNumber(stars)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedRepoCard;
