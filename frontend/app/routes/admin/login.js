import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  userSession: service(),
  beforeModel() {
    const { username, password } = this.get('userSession.auth');
    if (username && password) {
      this.transitionTo('admin.clips');
    }
  }
});
