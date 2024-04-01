import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

export async function authenticatedVote (user_id: number, repo_id: number) {
  const { data, error } = await supabase
    .from("users_to_repos_votes")
    .select(`*`)
    .eq("user_id", user_id)
    .eq("repo_id", repo_id)
    .single() as unknown as { data: DbRepoToUserVotes; error: Error | undefined };

  if (error) {
    await supabase
      .from("users_to_repos_votes")
      .insert({
        user_id,
        repo_id,
      });

    return 1;
  }

  if (data.deleted_at !== null) {
    await supabase
      .from("users_to_repos_votes")
      .update({ deleted_at: null })
      .eq("user_id", user_id)
      .eq("repo_id", repo_id);

    return 1;
  }

  await supabase
    .from("users_to_repos_votes")
    .update({ deleted_at: (new Date).toISOString() })
    .eq("user_id", user_id)
    .eq("repo_id", repo_id);

  return -1;
}

export async function updateVotesByRepo (votes: number, repo_id: number, user_id: number) {
  const modifier = await authenticatedVote(user_id, repo_id);

  return votes + modifier;
}

export async function fetchRecommendations (
  limit = 25,
  textToSearchParam = "",
) {
  const orderBy = "stars";
  const orderByOptions: {
    ascending?: boolean,
    nullsFirst?: boolean,
    foreignTable?: string
  } | undefined = { ascending: false };
  const selectStatement = `
    id,
    user_id,
    full_name,
    name,
    description,
    stars,
    issues,
    starsRelation:users_to_repos_stars(starsCount:count),
  `;

  const supabaseComposition = supabase
    .from("repos")
    .select(selectStatement)
    .filter("starsRelation.deleted_at", "is", null);

  const searchColumn = textToSearchParam === "" ? "" : "full_name";
  const textToSearch = textToSearchParam === "" ? "" : textToSearchParam;

  const { data: recommendations, error } = await supabaseComposition
    .limit(limit)
    .like(searchColumn, `%${textToSearch}%`)
    .order("last_merged_at", {
      ascending: false,
      foreignTable: "contributions",
    })
    .order(orderBy, orderByOptions)
    .order("updated_at", { ascending: false });

  error && console.error(error);

  return recommendations as DbRepo[];
}
