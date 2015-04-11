define(
  'app/views/page/404', 
  [
    'magix'
  ], 
  function(Magix) {
  return Magix.View.extend({
    render: function() {
      var me = this;
      me.setViewHTML();
    }
  });
});