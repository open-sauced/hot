CREATE TABLE IF NOT EXISTS public.recommendations
(
  star_id bigint NOT NULL,
  repo_name text COLLATE pg_catalog."default",
  stars bigint,
  issues bigint,
  description text COLLATE pg_catalog."default",
  contributors text[] COLLATE pg_catalog."default",
  total_stars bigint,
  avg_recency_score numeric,
  votes bigint,
  CONSTRAINT recommendations_pkey2 PRIMARY KEY (star_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recommendations
  OWNER to supabase_admin;

GRANT ALL ON TABLE public.recommendations TO anon;

GRANT ALL ON TABLE public.recommendations TO authenticated;

GRANT ALL ON TABLE public.recommendations TO postgres;

GRANT ALL ON TABLE public.recommendations TO service_role;

GRANT ALL ON TABLE public.recommendations TO supabase_admin;
