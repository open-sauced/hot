/* eslint-disable */
import React from 'react';

import humanizeNumber from '../lib/humanizeNumber';
import HotAvatar from './Avatar.jsx';

function PostList({ data }) {

  const repoLink = `https://github.com/${data.repo_name}`;
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
          <div className=" flex justify-between w-full ">
            {/* Upvote */}
            <div className=" flex justify-center items-center text-xs sm:text-xl text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
              <i className="far fa-arrow-alt-circle-up mr-2 "></i>
              <p className="font-bold">5</p>
            </div>

            {/* Issues */}
            <div
              className='flex justify-center items-center text-xs sm:text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200'
              onClick={() => handleClick('issues')}
            >
              <i className="fas fa-dot-circle mr-2 "></i>

              {data.issues && <p className="font-bold">{humanizeNumber(data.issues)}</p>}
            </div>
            {/* Stars */}
            <div
              className=" flex justify-center items-center text-xs sm:text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200 "
              onClick={handleClick}
            >
              <i className="fas fa-star mr-2 "></i>
              {data.total_stars && <p className="font-bold">{humanizeNumber(data.stars)}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PostList;
