
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 wallet unlock -n sclipswal --password $(cat data/sclips_wallet_password.txt) || true;
eosio-cpp -o ./contracts/content/content.wasm ./contracts/content/content.cpp --abigen --contract content
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 set contract sclipsacc /opt/eosio/bin/contracts/content -p sclipsacc@active
