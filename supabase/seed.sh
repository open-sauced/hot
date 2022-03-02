#!/bin/sh

REPO="https://github.com/open-sauced/actions/raw/main/hot-supabase/seed"
PGDB="postgresql://postgres:postgres@localhost:5432/postgres"
tables=(recommendations,stars,user_stars,users,votes)
export PGPASSWORD=postgres

apt-get update
apt-get install -y curl

mkdir -p /supabase
cd supabase

curl -sLO $REPO/recommendations.csv
curl -sLO $REPO/stars.csv
curl -sLO $REPO/user_stars.csv
curl -sLO $REPO/users.csv
curl -sLO $REPO/votes.csv

for i in "${tables[@]}"
do :
  psql $PGDB -c "TRUNCATE public.${i};"
done

psql $PGDB -c "\COPY recommendations(id, stars, issues, total_stars, votes, avg_recency_score, repo_name, description, contributors, created_at) FROM 'recommendations.csv' DELIMITER ',' CSV HEADER;"
psql $PGDB -c "\COPY stars(id, stargazers_count, open_issues_count, forks_count, full_name, created_at) FROM 'stars.csv' DELIMITER ',' CSV HEADER;"
psql $PGDB -c "\COPY user_stars(id, user_id, star_id, recency_score, issues, stars, repo_name, description, contributors, created_at) FROM 'user_stars.csv' DELIMITER ',' CSV HEADER;"
psql $PGDB -c "\COPY users(id, open_issues, private, stars_data, login, created_at) FROM 'users.csv' DELIMITER ',' CSV HEADER;"
psql $PGDB -c "\COPY votes(id, github_user_id, repo_name, code, created_at) FROM 'votes.csv' DELIMITER ',' CSV HEADER;"

ls -lahH .
