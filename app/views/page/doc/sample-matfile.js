define(
  'app/views/page/doc/sample-matfile', 
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