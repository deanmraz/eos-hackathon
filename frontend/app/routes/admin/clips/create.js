import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import moment from 'moment';

export default Route.extend({
  model() {
    return EmberObject.create({
      title: null,
      description: null,
      image: null,
      video: null,
      date: moment().toISOString(),
    })
  }
});
