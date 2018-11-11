import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return EmberObject.create({
      title: null,
      description: null,
      image: null,
      video: null,
      date: null,
    })
  }
});
