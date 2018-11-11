import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
// import { storageFor } from 'ember-local-storage';

export default Service.extend({
  //TODO use something like scatter
  auth: computed(function() {
    return EmberObject.create({
      username: 'ufc',
      password: '5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo',
    })
  }),
  // auth: storageFor('auth')
});
