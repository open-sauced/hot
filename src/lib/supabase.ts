import {createClient, User} from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY);

export async function authenticatedVote(userId: number, repoName: string) {
  const { error } = await supabase
    .from('votes')
    .upsert([
      {
        github_user_id: userId,
        repo_name: repoName,
        code: `${userId}-${repoName}`,
      }], {
      onConflict: 'code',
    });

  if (error && error.code === '23505') {
    await supabase
      .from('votes')
      .delete()
      .eq('vote_code', `${userId}-${repoName}`);

    return -1;
  }

  return 1;
}

export async function updateVotesByRepo(repoName: string, votes: number, user?: User | null) {
  const githubId = user?.user_metadata.sub;

  const voteTally = await authenticatedVote(githubId, repoName);

  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({ votes: votes + voteTally })
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations ? recommendations[0].votes : 0;
}

export async function fetchRecommendations(orderBy = 'total_stars', limit = 25) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('repo_name, description, stars, issues, total_stars, avg_recency_score, contributors, votes')
    .limit(limit)
    .order(orderBy, { ascending: false });

  console.error(error);

  return recommendations;
}

export async function fetchMyVotes(user: User | null) {
  const githubId = user?.user_metadata.sub;

  // First get the users votes
  const { data: votes } = await supabase
    .from('votes')
    .select('repo_name')
    .like('code', `${githubId}-%`);

  /**
   * Then get the recommendations based on the repo_name
   * Ideally this would be one query but we currently can
   * do joins when a foreign key exists
   */
  const { data: votedRepos, error } = await supabase
    .from('recommendations')
    .select()
    .in('repo_name', votes ? votes.map((v) => v.repo_name) : [])
    .order('votes', { ascending: false });

  if (error) console.error(error);
  return votedRepos;
}
