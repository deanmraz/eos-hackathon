import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  eos: service(),
  router: service(),

  save: task(function * () {
    const data = this.get('model');
    const push = this.get('eos.push');
    yield push.perform('create', data);
    yield timeout(1000);
    this.get('router').transitionTo('admin.clips.index');
  })
});
