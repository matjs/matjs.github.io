define('app/ini', ['jquery'], function($) {
  var MainView = 'app/views/layout/default'
  var T = {
    routes: {
      'app/views/layout/default': [
        '/page/index',
        '/page/doc'
      ]
    }
  }
  return {
    defaultView: MainView,
    defaultPath: '/page/index',
    unfoundView: 'app/views/page/404',
    tagName: 'div',
    extensions: [
      'app/view',
      'app/brix'
    ],
    routes: function(pathname) {
      if (!$.isEmptyObject(T.routes)) {
        var s
        $.each(T.routes, function(k, item) {
          if ($.inArray(pathname, item) !== -1) {
            s = k
            return false
          }
        })
        if (s) return s
        return this.unfoundView
      }
      return this.defaultView
    },
    error: function(e) {
      if (window.JSTracker) {
        window.JSTracker.error(e.message)
      } else if (window.console) {
        window.console.error(e.stack)
      }
    }
  }
})