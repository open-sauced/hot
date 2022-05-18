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
      .eq('code', `${userId}-${repoName}`);

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

  error && console.error(error);

  return recommendations ? recommendations[0].votes : 0;
}

export async function fetchRecommendations(
  orderBy = 'stars',
  orderByOptions: { ascending?: any, nullsFirst?: any, foreignTable?: any } | undefined = { ascending: false },
  limit = 25
) {
  const { data: recommendations, error } = await supabase
    .from('repos')
    .select(`
      full_name,
      description,
      stars,
      issues,
      starsRelation:users_to_repos_stars(starsCount:count),
      votesRelation:users_to_repos_votes(votesCount:count),
      contributions(
        last_merged_at,
        contributor,
        url,
        prsCount:count
      )
    `)
    .limit(limit)
    .order('last_merged_at', {
      ascending: false,
      foreignTable: 'contributions',
    })
    .order(orderBy, orderByOptions)
    .order('updated_at', { ascending: false })

  error && console.error(error);

  return recommendations as DbRecomendation[] || [];
}

export async function fetchMyVotes(
  user: User | null,
  limit = 25
): Promise<DbRecomendation[]> {
  const githubId = user?.user_metadata.sub;

  const { data: recommendations, error } = await supabase
    .from('repos')
    .select(`
      full_name,
      description,
      stars,
      issues,
      starsRelation:users_to_repos_stars(starsCount:count),
      votesRelation:users_to_repos_votes(votesCount:count),
      myVotesRelation:users_to_repos_votes!inner(myVotesCount:count),
      myVotesFilter:users_to_repos_votes!inner(
        user_id
      ),
      contributions(
        last_merged_at,
        contributor,
        url,
        prsCount:count
      )
    `)
    .filter('myVotesFilter.user_id', 'eq', githubId)
    .limit(limit)
    .order('last_merged_at', {
      ascending: false,
      foreignTable: 'contributions',
    })
    .order('count', {
      ascending: false,
      foreignTable: 'myVotesRelation',
    })
    .order('updated_at', { ascending: false })

  error && console.error(error);

  return recommendations as DbRecomendation[] || [];
}
