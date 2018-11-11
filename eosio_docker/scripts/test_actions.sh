
docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 push action sclipsacc create '["sclipsacc", "Conor McGregor", "Knock out of the year", "http://..youtube", "http://..image", "2018-11-10T00:00:00"]' -p sclipsacc

docker exec -it eosio /opt/eosio/bin/cleos -u http://localhost:8888 get table sclipsacc sclipsacc clips
