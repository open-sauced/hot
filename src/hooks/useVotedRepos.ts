import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "./useSupabaseAuth";
import { fetchRecommendations } from "../lib/supabase";
import handleVoteUpdateByRepo from "../lib/handleVoteUpdateByRepo";

const useVotedRepos = () => {
  const [votedReposIds, setVotedReposIds] = useState<number[]>([]);
  const { signIn, user } = useSupabaseAuth();

  const fetchVotedData = useCallback(async (user?: User) => {
    try {
      if (user) {
        const data = await fetchRecommendations("myVotes", 1000, user, "");

        return setVotedReposIds(data.map(({ id }) => id));
      }
    } catch (e) {
      console.error(e);
    }

    setVotedReposIds([]);
  }, []);

  const checkVoted = (repo_id: number | string) =>
    votedReposIds.includes(parseInt(`${repo_id}`));

  const handleVoteUpdate = async (votes: number, repo_id: number) => {
    const voteCount = await handleVoteUpdateByRepo(votes, repo_id, user?.user_metadata.sub);

    handleVoted(repo_id);

    return voteCount;
  };

  const handleVoted = (repo_id: number) => {
    const hasVoted = checkVoted(repo_id);

    if (hasVoted) {
      setVotedReposIds(votedReposIds.filter(id => id !== repo_id));
    } else {
      setVotedReposIds([...votedReposIds, repo_id]);
    }
  };

  useEffect(() => {
    fetchVotedData(user)
      .catch(console.error);
  }, [user]);

  return {
    votedReposIds,
    checkVoted,
    voteHandler: async (votes = 0, repo_id: number) => (user ? handleVoteUpdate(votes, repo_id) : signIn({ provider: "github" })),
  };
};

export default useVotedRepos;
