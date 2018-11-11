import Service, { inject as service } from '@ember/service';
import { Api, Rpc, SignatureProvider } from 'eosjs';
import { task } from 'ember-concurrency';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

const contract = `sclipsacc`;

export default Service.extend({
  userSession: service(),

  endpoint: computed(function() {
    return getOwner(this).resolveRegistration(`config:environment`).APP.EOS_ENDPOINT;
  }),

  authenticate: task(function * (username, password) {
    const endpoint = this.get('endpoint');
    const rpc = new Rpc.JsonRpc(endpoint);
    const signatureProvider = new SignatureProvider([password]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const actionData = {
      account: contract,
      name: 'authenticate',
      authorization: [{
        actor: username,
        permission: 'active',
      }],
    };
    // console.log(actionData);

    // Main call to blockchain after setting action, account_name and data
    try {
      const resultWithConfig = yield api.transact({
        actions: [actionData]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log(resultWithConfig);
      return resultWithConfig;
    } catch (err) {
      throw(err)
    }
  }).enqueue(),

  push: task(function * (action, data) {
    const { username, password } = this.get('userSession.auth');
    data.key = username;
    const endpoint = this.get('endpoint');
    const rpc = new Rpc.JsonRpc(endpoint);
    const signatureProvider = new SignatureProvider([password]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const {
      title, description, video, image, date, id
    } = data.getProperties('title', 'description', 'video', 'image', 'date', 'id');

    const actionData = {
      account: contract,
      name: action,
      authorization: [{
        actor: username,
        permission: 'active',
      }],
      data: {
        id: id,
        user: username,
        title: title,
        description: description,
        video: video,
        image: image,
        date: date,
      },
    };
    // console.log(actionData);

    // Main call to blockchain after setting action, account_name and data
    try {
      const resultWithConfig = yield api.transact({
        actions: [actionData]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log(resultWithConfig);
      return resultWithConfig;
    } catch (err) {
      throw(err)
    }
  }).enqueue(),

  all: task(function * () {
    try {
      const endpoint = this.get('endpoint');
      const rpc = new Rpc.JsonRpc(endpoint);
      const result = yield rpc.get_table_rows({
        "json": true,
        "code": contract,    // contract who owns the table
        "scope": contract,   // scope of the table
        "table": "clips",    // name of the table as specified by the contract abi
        "limit": 1000,
        // "lower_bound": contract,
      });
      // console.log(result.rows)
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }).enqueue(),

  find: task(function * (id) {
    try {
      const endpoint = this.get('endpoint');
      const rpc = new Rpc.JsonRpc(endpoint);
      const result = yield rpc.get_table_rows({
        "json": true,
        "code": contract,    // contract who owns the table
        "scope": contract,   // scope of the table
        "table": "clips",    // name of the table as specified by the contract abi
        "limit": 1,
        "lower_bound": id,
      });
      // console.log(result.rows)
      return result.rows[0];
    } catch (err) {
      console.error(err);
    }
  }).enqueue(),

});
