import { useState } from "react";
import { User } from "@supabase/supabase-js";
import handleVoteUpdateByRepo from "../lib/handleVoteUpdateByRepo";
import { FaArrowAltCircleUp, FaDotCircle, FaStar } from "react-icons/fa";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink, getRepoLink } from "../lib/github";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import StackedAvatar from "./StackedAvatar";


export declare interface PostListProps {
  data: DbRecomendation;
  user?: User;
}

const PostList = ({ data, user }: PostListProps): JSX.Element => {
  const { user_metadata: { sub: user_id } } = user! || { user_metadata: { sub: null } };
  const {
    id: repo_id,
    votesRelation: [{ votesCount }],
    name,
    full_name,
    description,
    stars,
    issues,
    contributions,
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();


  async function handleVoteUpdate (votes: number, repo_id: number) {
    const updatedVotes = await handleVoteUpdateByRepo(votes, repo_id, user_id);

    typeof updatedVotes === "number" && updateVotesState(updatedVotes);
  }


  return (
    <div className="flex flex-col gap-y-[20px] md:flex-row bg-white border-[1px] p-[16px] gap-x-[20px] font-Inter border-borderGrey overflow-hidden rounded-[16px]">
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
              src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
            />
          </a>
        </div>
      </div>

      <div className="flex-1">
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
            {description}
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

      <button
        className="md:w-[60px] w-full min-w-[60px] rounded-[6px] group border-[1px] cursor-pointer transition-all duration-200 hover:border-osOrange flex gap-[5px] py-[10px] md:py-0 md:flex-col justify-center items-center"
        onClick={async () => (user_id ? handleVoteUpdate(votes, repo_id) : signIn({ provider: "github" }))}
      >
        <FaArrowAltCircleUp className="text-gray-500 group-hover:text-osOrange transition-all duration-300 w-[13px] h-[13px]" />

        <span className="text-xs font-semibold text-gray-500 group-hover:text-osOrange transition-all duration-500">
          {humanizeNumber(votes)}
        </span>
      </button>
    </div>
  );
};

export default PostList;
