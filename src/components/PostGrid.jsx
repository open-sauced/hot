/* eslint-disable */
import React from "react";

import truncate from "../lib/truncate";
import humanizeNumber from "../lib/humanizeNumber";

import HotAvatar from "./Avatar.jsx";

function PostGrid({ data }) {
  const handleRedirect = (contributor) => {
    window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=" bg-offWhite rounded-xl pt-6 px-4 pb-2 font-roboto cursor-pointer ">
      {/* Avatar & upvote container */}
      <div className=" w-full flex justify-between items-center mb-3">
        {/* Avator Container */}
        <div className="flex w-full">
          <HotAvatar contributor={data?.contributors[0]} handleRedirect={handleRedirect} />
          <HotAvatar contributor={data?.contributors[1]} handleRedirect={handleRedirect} />
        </div>
        {/* Upvote container */}
        <div className="flex">
          <div
            className=" flex justify-center items-center text-base space-x-1 text-grey 
        hover:text-saucyRed cursor-pointer transition-all duration-200  "
          >
            <i className="fas fa-arrow-alt-circle-up "></i>
            <p className="font-bold">5</p>
          </div>
        </div>
      </div>
      {/* Cover photo */}
      <div className="w-full bg-transparent h-32 overflow-hidden rounded-md mb-2 flex justify-center">
        <img
          className="object-contain w-full"
          src={`https://opengraph.githubassets.com/1/${data.repo_name}`}
          alt="Avatar 02"
        />
      </div>
    </div>
  );
}

export default PostGrid;
