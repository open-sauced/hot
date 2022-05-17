import React, { useState } from 'react';
import { FaArrowAltCircleUp, FaDotCircle, FaStar } from 'react-icons/fa';
import humanizeNumber from '../lib/humanizeNumber';
import { getRepoLink, getRepoIssuesLink } from '../lib/github';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import {User} from "@supabase/supabase-js";

export declare interface PostListProps {
  data: DbRecomendation;
  user: User | null;
}

const PostList = ({ data, user }: PostListProps): JSX.Element => {
  const {
    starsRelation: [{starsCount}],
    votesRelation: [{votesCount}],
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);

  async function handleVoteUpdateByRepo(repoName: string, noOfVotes: number) {
    const updatedVotes = await updateVotesByRepo(repoName, noOfVotes, user);
    updateVotesState(updatedVotes);
  }

  return (
    <div className="bg-offWhite rounded-xl p-6 font-roboto w-full">
      <div className="flex">
        <div className="flex flex-col justify-center items-center">
          <Avatar contributor={data?.contributions[0]}/>
          <Avatar contributor={data?.contributions[1]}/>
        </div>

        <div className="ml-5 border-l-2 pl-3 space-y-2">
          <a
            className="font-bold text-grey text-xs sm:text-lg font-medium overflow-hidden cursor-pointer"
            href={getRepoLink(data.full_name)}
            title={`Visit ${data.full_name}`}
            target="_blank"
            rel="noopener"
          >
            {data.full_name}
          </a>

          <div className="text-lightGrey text-xs sm:text-base">
            <p>{data.description}</p>
          </div>

          <div className="flex justify-start max-w-sm space-x-1">
            <div
              role="button"
              tabIndex={0}
              aria-pressed="false"
              onClick={() => handleVoteUpdateByRepo(data.full_name, votes)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  return handleVoteUpdateByRepo(data.full_name, votes);
                }
              }}
              className="flex justify-start text-xs sm:text-xl text-grey transition-all duration-200 w-16 sm:w-24"
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <FaArrowAltCircleUp className="mr-1"/>
                <p className="font-bold">{votes}</p>
              </div>
            </div>

            <a
              className="flex justify-start  text-xs sm:text-xl text-grey transition-all duration-200 w-16 sm:w-24"
              href={getRepoIssuesLink(data.full_name)}
              title={`Visit ${data.full_name} issues`}
              target="_blank"
              rel="noopener"
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <FaDotCircle className="mr-1"/>
                {data.issues && <p className="font-bold">{humanizeNumber(data.issues)}</p>}
              </div>
            </a>

            <a
              className="flex justify-start  text-xs sm:text-xl text-grey transition-all duration-200 w-16 sm:w-24"
              href={getRepoLink(data.full_name)}
              title={`Add a star to ${data.full_name}`}
              target="_blank"
              rel="noopener"
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <FaStar className="mr-1"/>
                {data.stars && <p className="font-bold">{humanizeNumber(data.stars)}</p>}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
