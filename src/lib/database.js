import { createClient } from '@supabase/supabase-js';

// probably should move these to an env.
export const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_API_KEY);

export async function fetchVotesByRepo(repoName) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('votes, issues')
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes ? recommendations[0].votes : 0;
}

export async function fetchRepoByRepoName(repoName) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('votes, avg_recency_score')
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0];
}

export async function updateVotesByRepo(repoName, votes, user) {
  // send user id to a vote update, check if vote was received and remove vote
// if so
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + 1 })
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes;
}

export async function fetchRecommendations(orderBy = 'total_stars') {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('repo_name, description,stars,issues, total_stars, avg_recency_score, contributors, votes')
    .limit(25)
    .order(orderBy, { ascending: false });

  console.error(error);

  return recommendations;
}
