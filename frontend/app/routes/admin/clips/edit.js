import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Route.extend({
  eos: service(),

  model(params) {
    const id = params.edit_id;
    // return this.get('eos.find').perform(id).then((data) => EmberObject.create(data));
    return this.get('eos.all').perform().then((all) => {
      const filtered = all.filter((item) => {
        return item.id == id;
      });
      const first = filtered.get('firstObject');
      return first ? EmberObject.create(first) : null;
    });
  },

  afterModel(model) {
    if (!model) {
      this.transitionTo('admin.clips');
    }
  }
});
