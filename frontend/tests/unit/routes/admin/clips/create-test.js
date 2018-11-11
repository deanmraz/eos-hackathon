import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | admin/clips/create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin/clips/create');
    assert.ok(route);
  });
});
