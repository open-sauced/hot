// <reference types="vite/client" />
interface DbContribution {
  readonly id: number;
  readonly repo_id: number;
  readonly count: number;
  readonly contributor: string;
  readonly url: string;
  readonly last_merged_at: string;
}

interface DbRepo {
  readonly id: number;
  readonly user_id?: number;
  readonly stars: number;
  readonly issues: number;
  readonly watchers?: number;
  readonly subscribers?: number;
  readonly is_fork?: boolean;
  readonly name?: string;
  readonly full_name: string;
  readonly description: string;
  readonly language?: string;
  readonly license?: string;
  readonly url?: string;
  readonly contributionsCount?: number;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly pushed_at?: string;
  readonly last_fetched_at?: string;
  readonly votesCount?: number;
  readonly starsCount?: number;
  readonly submissionsCount?: number;
  readonly stargazersCount?: number;
}

interface DbRepoToUserVotes {
  readonly id: number;
  readonly user_id: number;
  readonly repo_id: number;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string | null;
}

interface PageMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}
