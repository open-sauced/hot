import React, { useState } from 'react';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { getRepoLink } from '../lib/github';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { User } from "@supabase/supabase-js";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { capturePostHogAnayltics } from '../lib/analytics';

import dayjs from 'dayjs/esm/index.js'
import relativeTime  from "dayjs/esm/plugin/relativeTime";
dayjs.extend(relativeTime);

export declare interface PostGridProps {
  data: DbRecomendation;
  user: User | null;
}

const PostGrid = ({ data, user }: PostGridProps): JSX.Element => {
  const { user_metadata: { sub: user_id }} = user || { user_metadata: { sub: null }};
  const {
    id: repo_id,
    votesRelation: [{votesCount}],
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo(votes: number, repo_id: number) {
    user_id && capturePostHogAnayltics('User voted', 'voteClick', 'true');

    const updatedVotes = await updateVotesByRepo(votes, repo_id, user_id);
    updateVotesState(updatedVotes);
  }

  return (
    <div className="bg-gray100 rounded-xl border-gray120 border-[1px] pt-6 px-4 pb-2 font-roboto">
      <div className="w-full flex justify-between items-center mb-3">
        {/* <div className="flex w-full">
          {data?.contributions[0] &&
            <Avatar
              contributor={data.contributions[0]?.contributor}
              lastPr={dayjs(data.contributions[0]?.last_merged_at).fromNow()}/>}

          {data?.contributions[1] &&
            <Avatar
              contributor={data.contributions[1]?.contributor}
              lastPr={dayjs(data.contributions[1]?.last_merged_at).fromNow()}/>}

        </div> */}

        <div className="flex mb-[4px] ">
          <div
            role="button"
            tabIndex={0}
            aria-pressed="false"
            onClick={() => user_id ? handleVoteUpdateByRepo(votes, repo_id) : signIn({ provider: 'github' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return user_id ? handleVoteUpdateByRepo(votes, repo_id) : signIn({ provider: 'github' });
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
        href={getRepoLink(data.full_name)}
        title={`Visit ${data.full_name}`}
        target="_blank"
        rel="noopener"
      >
        <img
          className="object-cover w-full"
          src={`https://opengraph.githubassets.com/1/${data.full_name}`}
          alt={data.full_name}
        />
      </a>
      <div className="flex gap-[6px] my-[25px] w-full">
          {data?.contributions[0] &&
            <Avatar
              contributor={data.contributions[0]?.contributor}
              lastPr={dayjs(data.contributions[0]?.last_merged_at).fromNow()}/>}

          {data?.contributions[1] &&
            <Avatar
              contributor={data.contributions[1]?.contributor}
              lastPr={dayjs(data.contributions[1]?.last_merged_at).fromNow()}/>}
          {data?.contributions[2] &&
            <Avatar
              contributor={data.contributions[2]?.contributor}
              lastPr={dayjs(data.contributions[2]?.last_merged_at).fromNow()}/>}
          {data?.contributions[3] &&
            <Avatar
              contributor={data.contributions[3]?.contributor}
              lastPr={dayjs(data.contributions[3]?.last_merged_at).fromNow()}/>}
          {data?.contributions[4] &&
            <Avatar
              contributor={data.contributions[4]?.contributor}
              lastPr={dayjs(data.contributions[4]?.last_merged_at).fromNow()}/>}

        <a className='text-gray-600 text-[15px] ml-[10px]' href={`https://github.com/${data.full_name}/contributors`}>more...</a>
        </div>
    </div>
  );
}

export default PostGrid;
