import React from "react";
import av1 from "./placeholders/av01.jpg";
import av2 from "./placeholders/av02.jpg";
import cover2 from "./placeholders/cover2.jpg";
import humanizeNumber from "../lib/humanizeNumber";
import truncate from "../lib/truncate";
import getAvatar from "../lib/getAvatar";
function PostGrid({ data }) {
  const [repoOwner, repoName] = data.repo_name.split("/");

  const repoLink = `https://github.com/${data.repo_name}`;
  const handleClick = (option) => {
    option === "issues" ? window.open(`${repoLink}/issues`) : window.open(repoLink);
  };

  const handleRedirect = (contributor) => {
    // window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto cursor-pointer flex flex-col justify-between ">
      <div className="flex flex-col">
        {/* Avator Container */}
        <div className=" w-full flex ">
          <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3 ">
            <img
              className="object-cover"
              src={getAvatar(data?.contributors[0])}
              alt="Avatar 01"
              width={500}
              height={500}
              onClick={handleRedirect(data?.contributors[0])}
            />
          </div>
          <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3 ">
            <img
              className="object-cover"
              src={getAvatar(data?.contributors[1])}
              alt="Avatar 02"
              width={500}
              height={500}
              onClick={handleRedirect(data?.contributors[1])}
            />
          </div>
        </div>
        {/* Title */}
        <div
          className=" text-grey text-sm font-medium mb-1 h-14 overflow-hidden cursor-pointer flex items-center"
          onClick={handleClick}
        >
          <h1>{data.repo_name} </h1>
        </div>
        {/* Description */}
        <div className=" text-lightGrey text-sm mb-2 ">
          <h3> {truncate(data.description)} </h3>{" "}
        </div>
        {/* Cover photo */}
        <div className="w-full bg-transparent h-28 overflow-hidden rounded-md mb-2 flex justify-center">
          <img
            className="object-contain h-full"
            src={`https://opengraph.githubassets.com/1/${data.repo_name}`}
            alt={`${data.repo_name}`}
          />
        </div>
      </div>

      {/* Cover photo and action button container */}
      {/* <div className="flex flex-col border-2 w-full "> */}

      {/* Action Button Container */}
      <div className=" flex justify-between w-full">
        {/* Upvote */}
        <div className=" flex justify-center items-center text-base text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  space-x-1">
          <i className="fas fa-arrow-alt-circle-up  "></i>
          <p className="font-bold">5</p>
        </div>

        {/* Issues */}
        <div
          className=" flex justify-center items-center text-base text-grey hover:text-saucyRed cursor-pointer transition-all duration-200 space-x-1 "
          onClick={() => handleClick("issues")}
        >
          <i className="fas fa-comment-dots "></i>

          {data.issues && <p className="font-bold">{humanizeNumber(data.issues)}</p>}
        </div>

        {/* Stars */}
        <div
          className=" flex justify-center items-center text-base text-grey hover:text-saucyRed cursor-pointer transition-all duration-200 space-x-1"
          onClick={handleClick}
        >
          <i className="fas fa-star "></i>
          {data.total_stars && <p className="font-bold">{humanizeNumber(data.stars)}</p>}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default PostGrid;
