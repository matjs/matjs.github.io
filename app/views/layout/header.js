define(
  'app/views/layout/header',
  [
    'jquery',
    'underscore',
    'magix'
  ], function ($, _, Magix) {
    return Magix.View.extend({
      init: function() {
        var me = this;
        me.observeLocation({
          path: true
        });
      },
      render: function() {
        var me = this;
        me.setViewHTML();
      }
    });
});