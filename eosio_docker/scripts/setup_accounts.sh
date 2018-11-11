
# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > /mnt/dev/data/eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: SportsClips ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n sclipswal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > /mnt/dev/data/sclips_wallet_password.txt
# Owner & Active key for sclipswal wallet
cleos wallet import -n sclipswal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K

# create account for sclipsacc with above wallet's public keys
cleos create account eosio sclipsacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B

# echo "=== deploy smart contract ==="
# deploy_contract.sh

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"
