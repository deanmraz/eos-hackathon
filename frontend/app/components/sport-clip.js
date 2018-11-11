import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  router: service(),
  classNames: ["max-w-sm", "rounded", "overflow-hidden", "shadow-lg", "w-full"],

  click() {
    const id = this.get('data.id');
    this.get('router').transitionTo('admin.clips.edit', id);
  },

  showVideo: false,
  didEnterViewport() {
   this.set('showVideo', true);
  },

  didExitViewport() {
   this.set('showVideo', false);
  }
});
