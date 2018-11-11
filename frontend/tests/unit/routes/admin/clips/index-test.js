import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | admin/clips/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin/clips/index');
    assert.ok(route);
  });
});
