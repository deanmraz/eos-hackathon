import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  classNames: ["max-w-sm", "rounded", "overflow-hidden", "shadow-lg", "w-full"],
  click() {
    const id = this.get('data.id');
    this.get('router').transitionTo('admin.clips.edit', id);
  }
});
