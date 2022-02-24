#!/bin/sh

apt-get update
apt-get install -y curl

mkdir -p /supabase
cd supabase

curl -sLO https://github.com/open-sauced/actions/raw/main/hot-supabase/seed/recommendations.csv
curl -sLO https://github.com/open-sauced/actions/raw/main/hot-supabase/seed/stars.csv
curl -sLO https://github.com/open-sauced/actions/raw/main/hot-supabase/seed/user_stars.csv
curl -sLO https://github.com/open-sauced/actions/raw/main/hot-supabase/seed/users.csv
curl -sLO https://github.com/open-sauced/actions/raw/main/hot-supabase/seed/votes.csv

export PGPASSWORD=postgres

psql 'postgresql://postgres:postgres@localhost:5432/postgres' -c "\COPY recommendations(id, repo_name, stars, issues, description, contributors, total_stars, avg_recency_score, votes) FROM 'recommendations.csv' DELIMITER ',' CSV HEADER;"
psql 'postgresql://postgres:postgres@localhost:5432/postgres' -c "\COPY stars(forks_count, stargazers_count, open_issues_count, full_name, id) FROM 'stars.csv' DELIMITER ',' CSV HEADER;"
psql 'postgresql://postgres:postgres@localhost:5432/postgres' -c "\COPY user_stars(star_id, id, user_id, repo_name, recency_score, description, issues, stars, contributors) FROM 'user_stars.csv' DELIMITER ',' CSV HEADER;"
psql 'postgresql://postgres:postgres@localhost:5432/postgres' -c "\COPY users(id, login, private, open_issues, stars_data) FROM 'users.csv' DELIMITER ',' CSV HEADER;"
psql 'postgresql://postgres:postgres@localhost:5432/postgres' -c "\COPY votes(id, created_at, github_user_id, repo_name, code) FROM 'votes.csv' DELIMITER ',' CSV HEADER;"

ls -lahH .
