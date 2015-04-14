define(
  'app/views/page/doc', 
  [
    'jquery',
    'magix'
  ],
  function($, Magix) {
  var viewMap = {
    'getting-started': 'app/views/page/doc/getting-started',
    'cli-flags': 'app/views/page/doc/cli-flags'
  }

  return Magix.View.extend({
    init: function() {
      var me = this
      me.observeLocation({
        params: 'tab'
      })
      me.on('created', function(){
        me._prettify()
      })
    },
    render: function() {
      var me = this
      var loc = me.location
      var params = loc.params
      var tab = params.tab || 'getting-started'
      
      me.setViewHTML({
        tab: tab
      })
      me._mountSubView(tab)
    },
    _mountSubView: function (tab) {
      var me = this
      var vom = me.vom
      var vframe = vom.get('magix_vf_doc')
      var viewPath = viewMap[tab]
      vframe.mountView(viewPath)
    },
    _prettify: function () {
      $('pre').addClass('prettyprint')
      prettyPrint()
    }
  })
})