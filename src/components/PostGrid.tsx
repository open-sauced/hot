import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { User } from "@supabase/supabase-js";
import { updateVotesByRepo } from "../lib/supabase";
import { getRepoLink } from "../lib/github";
import { capturePostHogAnayltics } from "../lib/analytics";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import Avatar from "./Avatar";

export declare interface PostGridProps {
  data: DbRecomendation;
  user?: User;
}

const PostGrid = ({ data, user }: PostGridProps): JSX.Element => {
  const { user_metadata: { sub: user_id } } = user as User || { user_metadata: { sub: null } };
  const {
    id: repo_id,
    votesRelation: [{ votesCount }],
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo (votes: number, repo_id: number) {
    const checkUserId = parseInt(String(user_id));

    if (typeof checkUserId === "number" && checkUserId !== 0) {
      capturePostHogAnayltics("User voted", "voteClick", "true");

      const updatedVotes = await updateVotesByRepo(votes, repo_id, checkUserId);

      updateVotesState(updatedVotes);
    } else {
      console.log("You must be signed in to vote");
    }
  }

  return (
    <div className="bg-offWhite rounded-xl pt-6 px-4 pb-2 font-roboto">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex w-full">
          {data?.contributions[0] && (
            <Avatar
              contributor={data.contributions[0]?.contributor}
              lastPr={data.contributions[0]?.last_merged_at}
            />
          ) || null}

          {data?.contributions[1] && (
            <Avatar
              contributor={data.contributions[1]?.contributor}
              lastPr={data.contributions[1]?.last_merged_at}
            />
          ) || null}
        </div>

        <div className="flex">
          <button
            className="flex justify-center items-center text-base space-x-1 text-grey hover:text-saucyRed cursor-pointer transition-all duration-200"
            onClick={async () => (user_id ? handleVoteUpdateByRepo(votes, repo_id) : signIn({ provider: "github" }))}
          >
            <FaArrowAltCircleUp aria-hidden="true" />

            <p className="font-bold">
              {votes}
            </p>
          </button>
        </div>
      </div>

      <a
        className="w-full bg-transparent h-32 overflow-hidden rounded-md mb-2 flex justify-center"
        href={getRepoLink(data.full_name)}
        rel="noopener noreferrer"
        target="_blank"
        title={`Visit ${data.full_name}`}
      >
        <img
          alt={data.full_name}
          className="object-cover w-full"
          src={`https://opengraph.githubassets.com/1/${data.full_name}`}
        />
      </a>
    </div>
  );
};

export default PostGrid;
