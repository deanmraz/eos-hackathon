import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
// import { storageFor } from 'ember-local-storage';

export default Service.extend({
  //TODO use something like scatter
  auth: computed(function() {
    return EmberObject.create({
      username: 'nfl',
      password: '5Kd2Syqvirnc2JhwG88X6LYGYq8U8NaSRmtJL4u9xKSyGZBQGuu',
    })
  }),
  // auth: storageFor('auth')
});
