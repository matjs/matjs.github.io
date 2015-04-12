define(
  'app/views/page/doc', 
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