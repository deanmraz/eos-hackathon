import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  eos: service(),

  model() {
    return this.get('eos.all').perform();
  }
});
