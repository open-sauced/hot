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
  const githubId = user.user_metadata.sub

  authVote(githubId, repoName)

  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + 1 })
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes;
}

async function authVote(userId, repoName) {
  const { data, error } = await supabase
    .from('votes')
    .insert([
      { github_user_id: userId, repo_name: repoName, vote_code: `${userId}-${repoName}` },
  ])

  // send user id to a vote update, check if vote was received and remove vote
  // if so
  if (error && error.code === '23505') {
    const removed = await supabase
      .from('votes')
      .delete()
      .eq('vote_code', `${userId}-${repoName}`)

    console.log(removed);
  }
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
