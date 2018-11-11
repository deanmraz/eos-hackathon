#!/bin/bash
set -o errexit

echo "=== start deploy data ==="

# set PATH
PATH="$PATH:/opt/eosio/bin"

# cd into script's folder
cd "$(dirname "$0")"

echo "=== seed table ==="

# loop through the array in the json file, import keys and create 'accounts
# these pre-created accounts will be used for saving / erasing notes
# we hardcoded each account name, public and private key in the json.
# NEVER store the private key in any source code in your real life developmemnt
# This is just for demo purpose

# unlock the wallet, ignore error if already unlocked
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 wallet unlock -n orgs --password $(cat ../data/orgs_wallet_password.txt) || true;




### SEEDS
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '["ufc", "Chan Sung Jung scrambles between submissions", "", "https://media.giphy.com/media/XL3HwaCtkyzn53cLWH/giphy.gif", "", "2018-11-10T20:27:34Z"]' -p ufc
sleep 1s
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '["pride", "Sakuraba submits Newton with a kneebar", "", "https://giant.gfycat.com/GorgeousDecentHalibut.mp4", "", "2018-11-08T20:27:34Z"]' -p pride
sleep 1s
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '["nfl", "70 yard TD to Cohen", "", "https://clips.clippit.tv/nbnyap/720.mp4", "", "2018-11-04T13:33:34Z"]' -p nfl
sleep 1s
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '["nfl", "Baseball TD celebration by the Seahawks", "", "", "https://media.giphy.com/media/tJe5H1Eh9JhiUhC7Ev/giphy.gif", "2018-11-09T20:22:34Z"]' -p nfl
sleep 1s
