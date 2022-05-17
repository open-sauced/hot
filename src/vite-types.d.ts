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
  // readonly votes: number;
  // readonly avg_recency_score: number;
  readonly full_name: string;
  readonly description: string;
  readonly contributions: any[];
  readonly created_at: string;
  readonly starsRelation: {starsCount: number}[],
  readonly votesRelation: {votesCount: number}[],
}
