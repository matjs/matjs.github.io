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
      },
      render: function() {
        var me = this;
        me.setViewHTML();
      }
    });
});