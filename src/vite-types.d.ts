/// <reference types="vite/client" />
interface DbVote {
  readonly id: number;
  readonly github_user_id: number;
  readonly repo_name: string;
  readonly code: string;
  readonly created_at: string;
}

interface DbRecomendation {
  readonly id: number;
  readonly stars: number;
  readonly issues: number;
  readonly total_stars: number;
  readonly votes: number;
  readonly avg_recency_score: number;
  readonly repo_name: string;
  readonly description: string;
  readonly contributors: string[];
  readonly created_at: string;
}
