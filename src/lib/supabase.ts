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
