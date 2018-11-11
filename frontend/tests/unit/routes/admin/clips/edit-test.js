import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | admin/clips/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin/clips/edit');
    assert.ok(route);
  });
});
