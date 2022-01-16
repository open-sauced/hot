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

async function authVote(userId, repoName) {
  const { error } = await supabase
    .from('votes')
    .insert([
      { github_user_id: userId, repo_name: repoName, vote_code: `${userId}-${repoName}` },
    ]);

  // check error to see if vote was already received and then remove vote
  if (error && error.code === '23505') {
    await supabase
      .from('votes')
      .delete()
      .eq('vote_code', `${userId}-${repoName}`);

    return -1;
  }

  return 1;
}

export async function updateVotesByRepo(repoName, votes, user) {
  const githubId = user.user_metadata.sub;

  const voteTally = await authVote(githubId, repoName);

  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + voteTally })
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
