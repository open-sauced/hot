import React from "react";

import humanizeNumber from "../lib/humanizeNumber";
import HotAvatar from "./Avatar.jsx"

function PostList({ data }) {
  const [repoOwner, repoName] = data.repo_name.split("/");

  const repoLink = `https://github.com/${data.repo_name}`;
  const handleClick = (option) => {
    option === "issues" ? window.open(`${repoLink}/issues`) : window.open(repoLink);
  };

  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto w-full cursor-pointer">
      {/* Flex container */}
      <div className="flex ">
        {/* Avatar Container */}
        <div className=" flex flex-col ">
          {/* Avatar */}
          <HotAvatar contributor={data?.contributors[0]} type={'list'}/>
          <HotAvatar contributor={data?.contributors[1]} type={'list'}/>
        </div>

        {/* Content */}
        <div className=" ml-5 border-l-2 pl-5">
          <div className=" text-grey text-md font-medium  overflow-hidden cursor-pointer " onClick={handleClick}>
            <h1>{data.repo_name} </h1>
          </div>
          {/* Description */}
          <div className=" text-lightGrey text-sm mb-2 ">
            <h3> {data.description} </h3>
          </div>
          {/* Action Button Container */}
          <div className=" flex justify-between w-full ">
            {/* Upvote */}
            <div className=" flex justify-center items-center text-xl text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
              <i className="fas fa-arrow-alt-circle-up mr-2 "></i>
              <p className="font-bold">5</p>
            </div>

            {/* Issues */}
            <div className=" flex justify-center items-center text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  " onClick={() => handleClick("issues")}>
              <i className="fas fa-comment-dots mr-2 "></i>

              {data.issues && <p className="font-bold">{humanizeNumber(data.issues)}</p>}
            </div>

            {/* Stars */}
            <div className=" flex justify-center items-center text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200 " onClick={handleClick}>
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
