define(
  'app/views/page/doc/getting-started', 
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