define(
  'app/views/page/doc/api', 
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