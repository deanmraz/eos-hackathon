import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', function() {
    this.route('login');
    this.route('clips', function() {
      this.route('create');
      this.route('edit', { path: '/:edit_id' });
    });
  });
  this.route('app');
});

export default Router;
