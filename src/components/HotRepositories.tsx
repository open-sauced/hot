import { useCallback, useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { VscIssues } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { User } from "@supabase/supabase-js";
import handleVoteUpdateByRepo from "../lib/handleVoteUpdateByRepo";
import humanizeNumber from "../lib/humanizeNumber";
import { getAvatarLink } from "../lib/github";
import { fetchRecommendations } from "../lib/supabase";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import StackedAvatar from "./StackedAvatar";
import hotIcon from "../assets/hotIcon.png";

export declare interface HotReposProps {
  user?: User;
}

const HotRepositories = ({ user }: HotReposProps): JSX.Element => {
  const { user_metadata: { sub: user_id } } = user! || { user_metadata: { sub: null } };
  const [hotRepos, setHotRepos] = useState<DbRecomendation[]>([]);

  const [votedReposIds, setVotedReposIds] = useState<number[]>([]);
  const { signIn } = useSupabaseAuth();
  const staticHot = ["oven-sh/bun", "tabler/tabler", "open-sauced/hot"];

  // this function is just a placeholder to help change the color and state of the selected button on the card.
  const handleVoted = (repo_id: number) => {
    const hasVoted = checkVoted(repo_id);

    if (hasVoted) {
      setVotedReposIds(votedReposIds.filter(id => id !== repo_id));
    } else {
      setVotedReposIds([...votedReposIds, repo_id]);
    }
  };

  const checkVoted = (repo_id: number) => votedReposIds.includes(repo_id);

  const fetchHotData = useCallback(
    async (repo: string) =>
      fetchRecommendations("popular", 1, user, repo)
        .then(data => {
          if (data[0]) {
            return data[0];
          }

          throw new Error(`Unable to fetch ${repo}`);
        })
        .catch(err => {
          console.log(err);
          throw err;
        }),
    [],
  );

  const fetchVotedData = useCallback(async (user?: User) => {
    if (user) {
      const data = await fetchRecommendations("myVotes", 1000, user, "");

      return setVotedReposIds(data.map(repo => repo.id));
    }

    setVotedReposIds([]);
  }, []);

  useEffect(() => {
    const promises: Promise<DbRecomendation>[] = [];

    staticHot.forEach(repo => promises.push(fetchHotData(repo)));

    Promise.allSettled(promises)
      .then(data => {
        const newHots = (data.filter(d => d.status === "fulfilled") as PromiseFulfilledResult<DbRecomendation>[]).map(
          d => d.value,
        );

        return setHotRepos(newHots);
      })
      .catch(console.error);

    fetchVotedData(user).catch(console.error);
  }, [user]);

  async function handleVoteUpdate (votes: number, repo_id: number) {
    await handleVoteUpdateByRepo(votes, repo_id, user_id);
    handleVoted(repo_id);
  }

  return (
    <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
      <div className="flex space-x-3 items-center">
        <img
          alt="Hot Repo Icon"
          className="h-5 w-5"
          src={hotIcon}
        />

        <h1 className="text-white font-bold text-2xl">Hot Repositories</h1>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-5">
        {hotRepos.map(({ id, full_name, name, description, issues, stars, contributions }) => (
          <div
            key={id}
            className="p-4 border rounded-2xl bg-white w-full space-y-1 relative"
          >
            {/* header & upvote button */}

            <div className="flex justify-between w-full">
              <div className="flex space-x-1 items-center">
                <img
                  alt="Hot Repo Icon"
                  className="h-4 w-4 rounded-md overflow-hidden"
                  src={getAvatarLink(full_name.replace(`/${String(name)}`, ""))}
                />

                <span className="text-sm font-medium text-lightSlate11">
                  {full_name.replace(`/${String(name)}`, "")}
                </span>
              </div>

              <button
                className={`px-2 py-0.5 border rounded-lg flex justify-center items-center space-x-1 text-xs transition-all duration-200 ${
                  checkVoted(id) ? "bg-lightOrange01" : "bg-lightSlate01"
                } ${checkVoted(id) ? "text-saucyRed border-saucyRed " : "text-lightSlate11 border-lightSlate06 "}`}
                onClick={async () => (user_id ? handleVoteUpdate(0, id) : signIn({ provider: "github" }))}
              >
                <span>
                  {checkVoted(id) ? "voted" : "upvote"}
                </span>

                {checkVoted(id)
                  ? (
                    <RiCheckboxCircleFill className="" />
                  )
                  : (
                    <FaArrowAltCircleUp className="fill-lightSlate09" />
                  )}
              </button>
            </div>

            {/* repo name & description */}

            <div className="flex flex-col pb-10">
              <a
                className="text-xl font-semibold"
                href={`https://app.opensauced.pizza/repos/${full_name}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {name}
              </a>

              <p className="text-gray-500 font-medium text-xs w-5/6">
                {description}
              </p>
            </div>

            {/* issues || star || PRs || Avatar */}

            <div className="flex items-center justify-between absolute bottom-3 inset-x-0 px-4">
              {/* issues || star || PRs*/}

              <div className="flex space-x-3 text-xs">
                <div className="flex text-sm space-x-1 justify-center items-center">
                  <VscIssues
                    className="fill-lightSlate10"
                    size={16}
                  />

                  <span className="text-lightSlate11">
                    {humanizeNumber(issues)}
                  </span>
                </div>

                <div className="flex text-sm space-x-1 justify-center items-center">
                  <AiOutlineStar
                    className="fill-lightSlate10"
                    size={16}
                  />

                  <span className="text-lightSlate11">
                    {humanizeNumber(stars)}
                  </span>
                </div>

                <div className="flex text-sm space-x-1 justify-center items-center">
                  <BiGitPullRequest
                    className="fill-lightSlate10"
                    size={16}
                  />

                  <span className="text-lightSlate11">0</span>
                </div>
              </div>

              {/* Avatars */}

              <StackedAvatar contributors={contributions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotRepositories;
