import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  userSession: service(),

  sortBy: Object.freeze(['date:desc', 'id:desc']),
  sorted: computed.sort('filtered', 'sortBy'),
  filtered: computed('model', function() {
    const { username } = this.get('userSession.auth');
    const model = this.get('model');
    return model.filter((item) => item.key == username);
  })
});
