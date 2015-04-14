define(
  'app/views/page/doc/cli-flags', 
  [
    'magix'
  ], 
  function(Magix) {
  return Magix.View.extend({
    render: function() {
      var me = this
      me.setViewHTML()
    }
  })
})