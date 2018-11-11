#!/bin/bash
set -o errexit

echo "=== Generate Seeds ==="

jq -c '.[]' ./scripts/seeds.json | while read i; do
  user=$(jq -r '.key' <<< "$i")
  title=$(jq -r '.title' <<< "$i")
  video=$(jq -r '.video' <<< "$i")
  image=$(jq -r '.image' <<< "$i")
  date=$(jq -r '.date' <<< "$i")

  JSON='["'$user'", "'$title'", "", "'$video'", "'$image'", "'$date'"]'

  echo -e "docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '$JSON' -p $user";

  echo -e "sleep 1s"

done
