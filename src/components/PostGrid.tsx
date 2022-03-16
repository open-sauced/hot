import React, { useState } from 'react';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { getRepoLink } from '../lib/github';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { User } from "@supabase/supabase-js";
import { FaArrowAltCircleUp } from "react-icons/fa";

export declare interface PostGridProps {
  data: DbRecomendation;
  user: User | null;
}

const PostGrid = ({ data, user }: PostGridProps): JSX.Element => {
  const [votes, updateVotesState] = useState(data.votes || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo(repoName: string, noOfVotes: number) {
    const updatedVotes = await updateVotesByRepo(repoName, noOfVotes, user);
    updateVotesState(updatedVotes);
  }

  return (
    <div className="bg-offWhite rounded-xl pt-6 px-4 pb-2 font-roboto">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex w-full">
          <Avatar contributor={data?.contributors[0]}/>
          <Avatar contributor={data?.contributors[1]}/>
        </div>

        <div className="flex">
          <div
            role="button"
            tabIndex={0}
            aria-pressed="false"
            onClick={() => (user ? handleVoteUpdateByRepo(data.repo_name, votes) : signIn({ provider: 'github' })) }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return user ? handleVoteUpdateByRepo(data.repo_name, votes) : signIn({ provider: 'github' });
              }
            }}
            className="flex justify-center items-center text-base space-x-1 text-grey hover:text-saucyRed cursor-pointer transition-all duration-200"
          >
            <FaArrowAltCircleUp/>
            <p className="font-bold">{votes}</p>
          </div>
        </div>
      </div>

      <a
        className="w-full bg-transparent h-32 overflow-hidden rounded-md mb-2 flex justify-center"
        href={getRepoLink(data.repo_name)}
        title={`Visit ${data.repo_name}`}
        target="_blank"
        rel="noopener"
      >
        <img
          className="object-cover w-full"
          src={`https://opengraph.githubassets.com/1/${data.repo_name}`}
          alt={data.repo_name}
        />
      </a>
    </div>
  );
}

export default PostGrid;
