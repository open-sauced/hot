import React, {useState, useEffect} from "react";
import av1 from "./placeholders/av01.jpg";
import av2 from "./placeholders/av02.jpg";
import cover2 from "./placeholders/cover2.jpg";
import api from "../lib/persistedGraphQL";
import humanizeNumber from "../lib/humanizeNumber";

function PostGrid({ data }) {
  const [repository, setRepository] = useState(null);
  const [repoOwner, repoName]= data.repo_name.split("/");
  const [error, setError] = useState(null);

  const repoLink = `https://github.com/${data.repo_name}`;
  const handleClick = () => {
    window.open(repoLink);
  };

  useEffect(() => {
    api
      .persistedRepoDataFetch({owner:repoOwner, repo:repoName})
      .then(res => {
        const {errors, data} = res;

        // console.log(res)
        if (errors && errors.length > 0) {
          setError(`"${errors[0].message}"`);
        }

        const repo = data.gitHub.repositoryOwner.repository;

        if (repo === null) {
          setError(`Repository "${repoOwner}/${repoName}" not found`);
        }

        setRepository(repo);
      })
      .catch(e => {
        console.log(e);
      });
    }, []);

    const {
      stargazers,
      description,
      issues,
      contributors_oneGraph,
    } = repository || {};

  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto cursor-pointer ">
      {/* Avator Container */}
      <div className=" w-full flex  mb-3 ">
        <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3 ">
          <img className="object-cover" src={av1} alt="Avatar 01" width={500} height={500} />
        </div>
        <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3 ">
          <img className="object-cover" src={av2} alt="Avatar 02" width={500} height={500} />
        </div>
      </div>
      {/* Title */}
      <div className=" text-grey text-md font-medium mb-6 h-14 overflow-hidden cursor-pointer" onClick={handleClick}>
        <h1>{data.repo_name} </h1>
      </div>
      {/* Description */}
      <div className=" text-lightGrey text-sm mb-2 ">
      <h3> {description} </h3>      </div>
      {/* Cover photo */}
      <div className="w-full bg-blue-400 h-28 overflow-hidden rounded-md mb-2 ">
        <img className="object-cover" src={cover2} alt="Avatar 02" width={1000} height={1000} />
      </div>
      {/* Action Button Container */}
      <div className=" flex justify-between w-full ">
        {/* Upvote */}
        <div className=" flex justify-center items-center text-xltext-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
          <i className="fas fa-arrow-alt-circle-up mr-2 "></i>
          <p className="font-bold">5</p>
        </div>

        {/* Issues */}
        <div className=" flex justify-center items-center text-xl text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
          <i className="fas fa-comment-dots mr-2 "></i>

          {issues && <p className="font-bold">{humanizeNumber(issues.totalCount)}</p>}
        </div>

        {/* Stars */}
        <div className=" flex justify-center items-center text-xltext-grey hover:text-saucyRed cursor-pointer transition-all duration-200 ">
          <i className="fas fa-star mr-2 "></i>
          {stargazers && <p className="font-bold">{humanizeNumber(stargazers.totalCount)}</p>}
        </div>
      </div>
    </div>
  );
}

export default PostGrid;
