import React, {useState, useEffect} from "react";
import humanizeNumber from "../lib/humanizeNumber";
import getAvatar from "../lib/getAvatar";
import { fetchVotesByRepo, updateVotesByRepo } from "../lib/database";

function PostList({ data }) {
  const repoLink = `https://github.com/${data.repo_name}`;
  const [votes, updateVotesState] = useState(0);

  useEffect(() => {
    fetchVotesByRepo(data.repo_name).then(votes => updateVotesState(votes));
  }, []);

  async function handleVoteUpdateByRepo(repoName, votes) {
    const updatedVotes = await updateVotesByRepo(repoName, votes)
    updateVotesState(updatedVotes);
  }

  const handleClick = (option) => {
    option === "issues" ? window.open(`${repoLink}/issues`) : window.open(repoLink);
  };

  const handleRedirect = (contributor) => {
    window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto w-full cursor-pointer">
      {/* Flex container */}
      <div className="flex ">
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
            <div
              onClick={() => handleVoteUpdateByRepo(data.repo_name, votes)}
              className=" flex justify-center items-center text-xs sm:text-xl text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  "
            >
              <i className="far fa-arrow-alt-circle-up mr-2 "></i>
              <p className="font-bold">{votes}</p>
            </div>

            {/* Issues */}
            <div
              className=" flex justify-center items-center text-xs sm:text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  "
              onClick={() => handleClick("issues")}
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