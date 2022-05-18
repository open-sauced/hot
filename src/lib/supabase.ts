import {createClient, User} from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY);

export async function authenticatedVote(user_id: number, repo_id: number) {
  const {error, count} = await supabase
    .from('users_to_repos_votes')
    .select('count', {count: 'exact'})
    .eq('user_id', user_id)
    .eq('repo_id', repo_id);

  if (error || count === 0) {
    await supabase
      .from('users_to_repos_votes')
      .upsert({
        user_id,
        repo_id
      });

    return 1;
  } else {
    await supabase
      .from('users_to_repos_votes')
      .delete()
      .eq('user_id', user_id)
      .eq('repo_id', repo_id);

    return -1;
  }
}

export async function updateVotesByRepo(votes: number, repo_id: number, user_id: number) {
  const modifier = await authenticatedVote(user_id, repo_id);

  return votes + modifier;
}

export async function fetchRecommendations(
  orderBy = 'stars',
  orderByOptions: { ascending?: any, nullsFirst?: any, foreignTable?: any } | undefined = { ascending: false },
  limit = 25
) {
  const { data: recommendations, error } = await supabase
    .from('repos')
    .select(`
      id,
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
      id,
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
