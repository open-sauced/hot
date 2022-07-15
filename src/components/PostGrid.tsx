import React, { useState } from 'react';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { getRepoLink } from '../lib/github';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { User } from "@supabase/supabase-js";
import { capturePostHogAnayltics } from '../lib/analytics';

import dayjs from 'dayjs/esm/index.js'
import relativeTime  from "dayjs/esm/plugin/relativeTime";
dayjs.extend(relativeTime);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore 
import numToKFormat from '../lib/numToKFormat';

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
  const _5contributions = data?.contributions.slice(0,5) || []

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
              className="flex justify-center items-center text-base space-x-1 bg-gray-50 py-[2px] px-[5px] rounded-[5px] cursor-pointer transition-all duration-200"
            >
              <img src="/UpvoteIcon.png" alt="" />
              <p className="font-bold text-grey130 ">{votes}</p>
            </div>
          </div>
          
          <a href={getRepoLink(full_name)}>
            <div className='flex break-words items-center min-h-[100px] gap-[15px]'>
              <div className='w-[50px] rounded-[14px] overflow-hidden'>
                <img className='w-full h-auto' src={`https://avatars.githubusercontent.com/u/${data?.user_id}`} alt="" />
              </div>
              <div className='w-full break-all '>
                <h6 className='text-[18px] tablet:text[22px] ' >{full_name}</h6>
              </div>
            </div>
          </a>

        </div>
        <div className='p-[30px] min-h-[106px] break-all'>
          <p className='font-semibold text-grey60 text-[12px]'>{description.substring(0,100)}</p>
        </div>
      </div>
      
      <div className='flex justify-between py-[15px] w-full'>
        <div className="flex gap-[6px] ">
          {
            _5contributions.map (contribution => (
              <Avatar
                key={contribution.contributor}
                contributor={contribution.contributor}
                lastPr={dayjs(contribution.last_merged_at).fromNow()}
              />
            ))
          }
          {
            data.contributions.length > 0 &&
            <a className='text-grey-600 text-[14px] ml-[10px] mr-[10px]' href={`https://github.com/${data.full_name}/contributors`}>more...</a>
          }
        </div>

        <div className='flex gap-[10px] items-center'>
          <div className='flex gap-[5px] items-center'>
            <div className='w-[14px] h-auto'>
              <img src="/IssuesIcon.svg" alt="" />
            </div>
            <p className='text-[12px] text-grey130 font-semibold'>{numToKFormat(issues)}</p>
          </div>

          <div className='flex gap-[5px] text-grey130 items-center'>
            <div className='w-[14px] h-auto'>
              <img src="/StarIcon.svg" alt="" />
            </div>
            <p className='text-[12px] font-semibold'>{numToKFormat(stars)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostGrid;
