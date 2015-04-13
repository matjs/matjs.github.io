define(
  'app/views/page/doc', 
  [
    'magix'
  ],
  function(Magix) {
  var viewMap = {
    'getting-started': 'app/views/page/doc/getting-started'
  }

  return Magix.View.extend({
    render: function() {
      var me = this
      var loc = me.location
      var params = loc.params
      var tab = params.tab || 'getting-started'
      
      me.setViewHTML()
      me._mountSubView(tab)
    },
    _mountSubView: function (tab) {
      var me = this
      var vom = me.vom
      var vframe = vom.get('magix_vf_doc')
      var viewPath = viewMap[tab]
      vframe.mountView(viewPath)
    }
  })
})