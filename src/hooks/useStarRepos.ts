import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "./useSupabaseAuth";

import { fetchRecommendations } from "../lib/supabase";

import handleStarUpdateByRepo from "../lib/handleStarUpdateByRepo";

const useStarRepos = () => {
  const [starredReposIds, setStarredReposIds] = useState<number[]>([]);
  const { signIn, user } = useSupabaseAuth();

  const fetchStarredData = useCallback(async (user?: User) => {
    try {
      if (user) {
        const data = await fetchRecommendations("myStars", 1000, user, "");

        return setStarredReposIds(data.map(({ id }) => id));
      }
    } catch (e) {
      console.error(e);
    }

    setStarredReposIds([]);
  }, []);

  const checkStarred = (repo_id: number | string) => starredReposIds.includes(parseInt(`${repo_id}`));

  const handleStarUpdate = async (stars: number, repo_id: number) => {
    const voteCount = await handleStarUpdateByRepo(stars, repo_id, user?.user_metadata.sub);

    handleStarred(repo_id);

    return voteCount;
  };

  const handleStarred = (repo_id: number) => {
    const hasStarred = checkStarred(repo_id);

    if (hasStarred) {
      setStarredReposIds(starredReposIds.filter(id => id !== repo_id));
    } else {
      setStarredReposIds([...starredReposIds, repo_id]);
    }
  };

  useEffect(() => {
    fetchStarredData(user).catch(console.error);
  }, [user]);

  return {
    starredReposIds,
    checkStarred,
    starHandler: async (stars = 0, repo_id: number) =>
      (user ? handleStarUpdate(stars, repo_id) : signIn({ provider: "github" })),
  };
};

export default useStarRepos;
