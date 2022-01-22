CREATE TABLE IF NOT EXISTS public.stars
(
  forks_count bigint,
  stargazers_count bigint,
  open_issues_count bigint,
  full_name text COLLATE pg_catalog."default",
  id bigint NOT NULL,
  CONSTRAINT stars_duplicate_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stars
  OWNER to supabase_admin;

GRANT ALL ON TABLE public.stars TO anon;

GRANT ALL ON TABLE public.stars TO authenticated;

GRANT ALL ON TABLE public.stars TO postgres;

GRANT ALL ON TABLE public.stars TO service_role;

GRANT ALL ON TABLE public.stars TO supabase_admin;
