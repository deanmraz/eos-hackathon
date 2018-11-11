import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortBy: Object.freeze(['date:desc', 'id:desc']),
  sorted: computed.sort('model', 'sortBy'),
});
