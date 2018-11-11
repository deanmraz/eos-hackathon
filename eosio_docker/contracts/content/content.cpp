#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class [[eosio::contract]] content : public eosio::contract {

public:
  using contract::contract;

  content(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void create(name user, std::string title, std::string description, std::string video, std::string image, std::string date) {
    require_auth( user );
    content_type contentclips(_code, _code.value);
    contentclips.emplace(user, [&]( auto& row ) {
      row.id = contentclips.available_primary_key();
      row.key = user;
      row.title = title;
      row.description = description;
      row.video = video;
      row.image = image;
      row.date = date;
    });

  }

  [[eosio::action]]
  void update(name user, uint64_t id, std::string title, std::string description, std::string video, std::string image, std::string date) {
    require_auth( user );
    content_type contentclips(_code, _code.value);

    auto iterator = contentclips.find(id);
    eosio_assert(iterator != contentclips.end(), "Record does not exist");

    eosio::name orignal = iterator->key;
    eosio_assert(user == orignal, "User doesn't have rights to edit");

    contentclips.modify(iterator, user, [&]( auto& row ) {
      row.title = title;
      row.description = description;
      row.video = video;
      row.image = image;
      row.date = date;
    });
  }

  [[eosio::action]]
  void del(name user, uint64_t id) {
    require_auth(user);

    content_type contentclips(_self, _code.value);

    print( "delete... ");
    auto iterator = contentclips.find(id);
    eosio_assert(iterator != contentclips.end(), "Record does not exist");

    eosio::name orignal = iterator->key;
    eosio_assert(user == orignal, "User doesn't have rights to edit");

    contentclips.erase(iterator);
  }

private:
  struct [[eosio::table]] clip {
    uint64_t id;
    eosio::name key;
    std::string title;
    std::string description;
    std::string video;
    std::string image;
    std::string date;
    uint64_t primary_key() const { return id; }

  };
  typedef eosio::multi_index<"clips"_n, clip> content_type;

};

EOSIO_DISPATCH( content, (create)(update)(del))
