import React, { useState } from 'react';
import { FaArrowAltCircleUp, FaDotCircle, FaStar } from 'react-icons/fa';
import humanizeNumber from '../lib/humanizeNumber';
import { getRepoLink, getRepoIssuesLink } from '../lib/github';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import starIconGrey from '../assets/starIconGrey.svg'
import pullIconGrey from '../assets/pullIconGrey.svg'
import issueIconGrey from '../assets/issueIconGrey.svg'

export declare interface PostListProps {
  data: DbRecomendation;
  user: User | null;
}

const PostList = ({ data, user }: PostListProps): JSX.Element => {
  const { user_metadata: { sub: user_id }} = user || { user_metadata: { sub: null }};
  const {
    id: repo_id,
    votesRelation: [{votesCount}],
    full_name,
    description,
    stars,
    issues,
  } = data;
  

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo(votes: number, repo_id: number) {
    const updatedVotes = await updateVotesByRepo(votes, repo_id, user_id);
    updateVotesState(updatedVotes);
  }

  return (
    <div className='flex bg-white border-[1px] p-[16px] gap-x-[20px] font-Inter border-borderGrey overflow-hidden rounded-[16px]'>
        <div>
            <div className='rounded-[8px] overflow-hidden w-[88px] h-[88px]'>
              <img src={`https://avatars.githubusercontent.com/u/${data.user_id}`} alt="" />
            </div>
        </div>
        <div>
            <p className='text-[14px] text-textGrey'>{full_name}</p>
            <p className='text-[16px] text-textGrey'>{description}</p>
            <div className='flex gap-x-[16px] mt-[16px]'>
                <div className='flex gap-[5px] items-center text-textGrey'>
                    <img className='w-[16px]' src={issueIconGrey} alt="issues"/>
                    <p className='text-[14px]'>{humanizeNumber(issues)}</p>
                </div>
                <div className='flex gap-[5px] items-center text-textGrey'>
                    <img className='w-[16px]' src={starIconGrey} alt="stars"/>
                    <p className='text-[14px]'>{humanizeNumber(stars)}</p>
                </div>
                <div className='flex gap-[5px] items-center text-textGrey'>
                    <img className='w-[16px]' src={pullIconGrey} alt="pull request"/>
                    <p className='text-[14px]'>{humanizeNumber(0)}</p>
                </div>
                <div className='flex'>
                    <div className='w-[24px] h-[24px] bg-red-50 rounded-full'></div>
                    <div className='w-[24px] h-[24px] bg-red-50 rounded-full'></div>
                    <div className='w-[24px] h-[24px] bg-red-50 rounded-full'></div>
                    <div className='w-[24px] h-[24px] bg-red-50 rounded-full'></div>
                    <div className='w-[24px] h-[24px] bg-red-50 rounded-full'></div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PostList;
