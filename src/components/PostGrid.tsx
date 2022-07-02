import React, { useState } from 'react';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { getRepoLink } from '../lib/github';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { User } from "@supabase/supabase-js";
import { FaArrowAltCircleUp, FaStar } from "react-icons/fa";
import { capturePostHogAnayltics } from '../lib/analytics';

import dayjs from 'dayjs/esm/index.js'
import relativeTime  from "dayjs/esm/plugin/relativeTime";
dayjs.extend(relativeTime);
import numToKformat from '../lib/numToKformat';

export declare interface PostGridProps {
  data: DbRecomendation;
  user: User | null;
}

const PostGrid = ({ data, user }: PostGridProps): JSX.Element => {
  const { user_metadata: { sub: user_id }} = user || { user_metadata: { sub: null }};
  const {
    id: repo_id,
    votesRelation: [{votesCount}],
    stars,
    description,
    full_name,
    issues,
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo(votes: number, repo_id: number) {
    user_id && capturePostHogAnayltics('User voted', 'voteClick', 'true');

    const updatedVotes = await updateVotesByRepo(votes, repo_id, user_id);
    updateVotesState(updatedVotes);
  }

  return (
    <div className="">
      <div className='border-[1px] border-gray-100 rounded-[14px]'>
        <div className='flex flex-col rounded-t-[14px] bg-gray-100 p-[30px]'>

          <div className='w-full flex justify-end '>
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
              className="flex justify-center items-center text-base space-x-1 text-grey bg-gray-50 py-[2px] px-[5px] rounded-[5px] cursor-pointer transition-all duration-200"
            >
              <img src="/UpvoteIcon.png" alt="" />
              <p className="font-bold">{votes}</p>
            </div>
          </div>

          <div className='flex items-center min-h-[100px] gap-[15px]'>
            <div className='w-[50px] rounded-[14px] overflow-hidden'>
              <img className='w-full h-auto' src={`https://avatars.githubusercontent.com/u/${repo_id}`} alt="" />
            </div>
            <div className=''>
              <p className='text-[22px]' >{full_name}</p>
            </div>
          </div>

        </div>
        <div className='p-[30px] min-h-[106px] '>
          <p className='font-semibold text-[12px]'>{description.substring(0,100)}</p>
        </div>
      </div>
      
      <div className='flex justify-between py-[15px] w-full'>
        <div className="flex gap-[6px] ">
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
          {
            data.contributions.length > 0 &&
            <a className='text-gray-600 text-[14px] ml-[10px] mr-[10px]' href={`https://github.com/${data.full_name}/contributors`}>more...</a>
          }
        </div>

        <div className='flex gap-[10px] items-center'>
          <div className='flex gap-[5px] items-center'>
            <div className='w-[14px] h-auto'>
              <img src="/IssuesIcon.png" alt="" />
            </div>
            <p className='text-[12px] font-semibold'>{numToKformat(issues)}</p>
          </div>

          <div className='flex gap-[5px] items-center'>
            <div className='w-[14px] h-auto'>
              <img src="/StarIcon.png" alt="" />
            </div>
            <p className='text-[12px] font-semibold'>{numToKformat(stars)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostGrid;
