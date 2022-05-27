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
  activeLink = 'popular',
  limit = 25,
  user: User | null = null,
  textToSearchParam = '',
) {
  const orderBy = 'stars';
  const orderByOptions: {
    ascending?: boolean,
    nullsFirst?: boolean,
    foreignTable?: string
  } | undefined = { ascending: false };
  let selectStatement = `
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
  `;

  if (activeLink === 'upvoted') {
    selectStatement += `,
      votes:users_to_repos_votes!inner(*)
    `;
  } else if (activeLink === 'myVotes') {
    selectStatement += `,
      myVotesRelation:users_to_repos_votes!inner(myVotesCount:count),
      myVotesFilter:users_to_repos_votes!inner(
        user_id
      )
    `;
  }

  const supabaseComposition = supabase
    .from('repos')
    .select(selectStatement)

  if (user && activeLink === 'myVotes') {
    supabaseComposition
      .filter('myVotesFilter.user_id', 'eq', user?.user_metadata?.sub)
  }

  const searchColumn = textToSearchParam == '' ? '' : 'full_name'
  const textToSearch = textToSearchParam == '' ? '' : textToSearchParam

  const { data: recommendations, error } = await supabaseComposition
    .limit(limit)
    .like(searchColumn, `%${textToSearch}%`)
    .order('last_merged_at', {
      ascending: false,
      foreignTable: 'contributions',
    })
    .order(orderBy, orderByOptions)
    .order('updated_at', { ascending: false })

  error && console.error(error);

  return recommendations as DbRecomendation[] || [];
}

export async function fetchWithSearch(orderBy = 'stars', limit = 5, searchText: string) {
  
  return new Promise(async (resolve, reject) => {
  console.log(orderBy, limit, searchText);
  const { data: recommendations, error } = await supabase
    .from('repos')
    .select('full_name, name, description, stars, issues')
    .like('full_name', `%${searchText}%`) // The string will need to be interpolated with the ''
    .limit(limit)
    .order(orderBy, { ascending: false });

    if (error) reject(error);
    return resolve(recommendations);
  });

}
