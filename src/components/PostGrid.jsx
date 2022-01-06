import React, {useState, useEffect} from "react";
import getAvatar from "../lib/getAvatar";
import { fetchVotesByRepo, updateVotesByRepo } from "../lib/database";

function PostGrid({ data }) {
  const [repoOwner, repoName] = data.repo_name.split("/");
  const [votes, updateVotesState] = useState(0);

  useEffect(() => {
    fetchVotesByRepo(data.repo_name).then(votes => updateVotesState(votes));
  }, []);

  async function handleVoteUpdateByRepo(repoName, votes) {
    const updatedVotes = await updateVotesByRepo(repoName, votes)
    updateVotesState(updatedVotes);
  }

  const repoLink = `https://github.com/${data.repo_name}`;
  const handleClick = (option) => {
    option === "issues" ? window.open(`${repoLink}/issues`) : window.open(repoLink);
  };

  const handleRedirect = (contributor) => {
    window.open(`https://github.com/${contributor}`);
  };

  return (
    <div className=" bg-offWhite rounded-xl pt-6 px-4 pb-2 font-roboto cursor-pointer ">
      {/* Avatar & upvote container */}
      <div className=" w-full flex justify-between items-center mb-3">
        {/* Avator Container */}
        <div className="flex w-full">
          <div className="bg-blue-400 w-10 h-10 overflow-hidden rounded-full mr-3">
            <img
              className="object-cover"
              src={getAvatar(data?.contributors[0])}
              alt="Avatar 01"
              width={500}
              height={500}
              onClick={() => handleRedirect(data?.contributors[0])}
            />
          </div>
          <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3 ">
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
        {/* Upvote container */}
        <div className="flex">
          <div
            onClick={() => handleVoteUpdateByRepo(data.repo_name, votes)}
            className=" flex justify-center items-center text-base space-x-1 text-grey
        hover:text-saucyRed cursor-pointer transition-all duration-200  "
          >
            <i className="fas fa-arrow-alt-circle-up "></i>
            <p className="font-bold">{votes}</p>
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
