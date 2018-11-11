import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Route.extend({
  eos: service(),

  model(params) {
    const id = params.edit_id;
    return this.get('eos.find').perform(id).then((data) => EmberObject.create(data));
  }
});
