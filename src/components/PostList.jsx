import React, { useState } from 'react';
import PropTypes from 'prop-types';
import humanizeNumber from '../lib/humanizeNumber';
import HotAvatar from './Avatar.jsx';
import { updateVotesByRepo } from '../lib/database';

function PostList({ data, user }) {
  const repoLink = `https://github.com/${data.repo_name}`;
  const [votes, updateVotesState] = useState(data.votes || 0);

  async function handleVoteUpdateByRepo(repoName, noOfVotes) {
    const updatedVotes = await updateVotesByRepo(repoName, noOfVotes);
    updateVotesState(updatedVotes, user);
  }

  const handleClick = (option) => {
    if (option === 'issues') return window.open(`${repoLink}/issues`);
    return window.open(repoLink);
  };

  const handleRedirect = (contributor) => {
    window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=' bg-offWhite rounded-xl p-6 font-roboto w-full cursor-pointer'>
      {/* Flex container */}
      <div className='flex'>
        {/* Avatar Container */}
        <div className='flex flex-col justify-center items-center'>
          {/* Avatar */}
          <HotAvatar contributor={data?.contributors[0]} type={'list'} handleRedirect = {handleRedirect} />
          <HotAvatar contributor={data?.contributors[1]} type={'list'} handleRedirect = {handleRedirect}/>
        </div>

        {/* Content */}
        <div className=" ml-5 border-l-2 pl-3 space-y-2">
          {/* Repo Name */}
          <div
            className=" text-grey text-xs sm:text-lg font-medium  overflow-hidden cursor-pointer"
            onClick={handleClick}
          >
            <h1>{data.repo_name} </h1>
          </div>
          {/* Description */}
          <div className=" text-lightGrey text-xs sm:text-base">
            <h3> {data.description} </h3>
          </div>
          {/* Action Button Container */}
          <div className=" flex justify-start max-w-sm space-x-1">
            {/* <div className=" grid grid-cols-3 w-full max-w-xs border-2"> */}
            {/* Upvote */}
            <div
              onClick={() => handleVoteUpdateByRepo(data.repo_name, votes)}
              className=" flex justify-start text-xs sm:text-xl text-grey  transition-all duration-200 w-16 sm:w-24 "
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <i className="fas fa-arrow-alt-circle-up mr-1 "></i>
                <p className="font-bold">{votes}</p>
              </div>
            </div>

            {/* Issues */}
            <div
              className=" flex justify-start  text-xs sm:text-xl text-grey  transition-all duration-200 w-16 sm:w-24 "
              onClick={() => handleClick('issues')}
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <i className="fas fa-dot-circle mr-1 "></i>

                {data.issues && <p className="font-bold">{humanizeNumber(data.issues)}</p>}
              </div>
            </div>
            {/* Stars */}
            <div
              className=" flex justify-start  text-xs sm:text-xl text-grey  transition-all duration-200 w-16 sm:w-24 "
              // style={{ minWidth: "20px" }}
              onClick={handleClick}
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <i className="fas fa-star mr-1 "></i>
                {data.total_stars && <p className="font-bold">{humanizeNumber(data.stars)}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PostList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostList;
