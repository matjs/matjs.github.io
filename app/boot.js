(function() {
  require.config({
    paths: {
      app: './app/',
      magix: '//g.alicdn.com/thx/magix/2.0/requirejs-magix'
    }
  })

  require(['magix', 'jquery'], function (Magix, $) {
    Magix.start({
      error: function(e) {
        if (console) {
          console.error(e.stack)
        }
      },
      iniFile: 'app/ini'
    })
  })
})()