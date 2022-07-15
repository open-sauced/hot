/// <reference types="vite/client" />
interface DbContribution {
  readonly id: number;
  readonly repo_id: number;
  readonly count: number;
  readonly contributor: string;
  readonly url: string;
  readonly last_merged_at: string;
}

interface DbRecomendation {
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
  readonly contributions: DbContribution[];
  readonly starsRelation: {starsCount: number}[],
  readonly votesRelation: {votesCount: number}[],
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly pushed_at?: string;
  readonly last_fetched_at?: string;
}
