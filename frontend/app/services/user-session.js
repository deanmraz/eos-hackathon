import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';

export default Service.extend({
  auth: computed(function() {
    return EmberObject.create({
      username: 'ufc',
      password: '5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo',
    })
  }),
});
