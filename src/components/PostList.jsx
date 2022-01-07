import React from "react";
import humanizeNumber from "../lib/humanizeNumber";
import getAvatar from "../lib/getAvatar";

function PostList({ data }) {
  const repoLink = `https://github.com/${data.repo_name}`;
  const handleClick = (option) => {
    option === "issues" ? window.open(`${repoLink}/issues`) : window.open(repoLink);
  };
  const handleRedirect = (contributor) => {
    window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto w-full cursor-pointer">
      {/* Flex container */}
      <div className="flex">
        {/* Avatar Container */}
        <div className=" flex flex-col justify-center items-center">
          {/* Avatar */}
          <div className="bg-blue-400 w-7 sm:w-10 h-7 sm:h-10 overflow-hidden  rounded-full mb-2 ">
            <img
              className="object-cover"
              src={getAvatar(data?.contributors[0])}
              alt="Avatar 01"
              width={500}
              height={500}
              onClick={() => handleRedirect(data?.contributors[0])}
            />
          </div>
          {/* Avatar */}
          <div className="bg-blue-400 w-7 sm:w-10 h-7 sm:h-10 overflow-hidden  rounded-full ">
            <img
              className="object-cover"
              src={getAvatar(data?.contributors[1])}
              alt="Avatar 02"
              width={500}
              height={500}
              onClick={() => handleRedirect(data?.contributors[1])}
            />
          </div>
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
              className=" flex justify-start text-xs sm:text-xl text-grey  transition-all duration-200 w-16 sm:w-24 "
              // style={{ minWidth: "20px" }}
            >
              <div className="cursor-pointer flex justify-start items-center hover:text-saucyRed transition-all duration-200">
                <i className="fas fa-arrow-alt-circle-up mr-1 "></i>
                <p className="font-bold">5</p>
              </div>
            </div>

            {/* Issues */}
            <div
              className=" flex justify-start  text-xs sm:text-xl text-grey  transition-all duration-200 w-16 sm:w-24 "
              // style={{ minWidth: "70px" }}
              onClick={() => handleClick("issues")}
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

export default PostList;
