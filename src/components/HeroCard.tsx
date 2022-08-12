import { FaRegDotCircle } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import StackedAvatar from "./StackedAvatar";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink } from "../lib/github";
const HeroCard = ({ full_name, name, description, issues, stars, contributions }: DbRepo) => {
  return (
    <a href={`https://app.opensauced.pizza/repos/${full_name}`} rel="noreferrer" target="_blank">
      <div className="flex flex-col hover:bg-gray-50 ">
        <div className="flex flex-col px-[10px] md:px-[15px] py-[10px]">
          <div className="flex items-center gap-x-[10px] mb-[5px]">
            <div className="w-[25px] h-[25px] overflow-hidden border-gray-400 border-[1px] bg-red-100  rounded-full">
              <img
                alt={full_name}
                className="w-full h-full"
                src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
              />

              <img
                alt={full_name}
                className="w-full h-full"
                src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
              />
            </div>

            <p className="text-base text-gray-500 font-semibold">{full_name}</p>
          </div>

          <p className="text-sm text-gray-500">{description}</p>

          <div className="flex justify-between mt-[8px]">
            <div className="flex gap-x-[5px]">
              <StackedAvatar contributors={contributions} />
            </div>

            <div className="flex gap-x-[6px]">
              <div className="flex items-center gap-x-[5px]">
                <FaRegDotCircle aria-hidden="true" />

                <p className="text-gray-500 text-xs">{humanizeNumber(issues)}</p>
              </div>

              <div className="flex items-center gap-x-[5px]">
                <AiOutlineStar aria-hidden="true" className="mr-1" />

                <p className="text-gray-500 text-xs">{humanizeNumber(stars)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default HeroCard;
