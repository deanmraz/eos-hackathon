import Component from '@ember/component';
import { inject as service } from '@ember/service';
import InViewportMixin from 'ember-in-viewport';
import EmberObject, { observer } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend(InViewportMixin, {
  router: service(),
  eos: service(),
  classNames: ["max-w-sm", "rounded", "overflow-hidden", "shadow-md", "w-full"],

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
  },

  sendViews: observer('showVideo', 'hideMedia', function() {
    const showing = this.get('showVideo');
    const hideMedia = this.get('hideMedia');
    if (!hideMedia && showing) {
      this.get('viewTask').perform();
    }
  }),

  viewTask: task(function * () {
    const data = this.get('data');
    const push = this.get('eos.push');
    yield push.perform('view', EmberObject.create(data));
  }).enqueue(),

});
