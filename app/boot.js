;(function() {
  require.config({
    paths: {
      app: './app/',
      magix: 'http://g.tbcdn.cn/thx/magix/2.0/requirejs-magix'
    }
  });

  require(['magix', 'jquery'], function (Magix, $) {
    Magix.start({
      error: function(e) {
        if (console) {
          console.error(e.stack)
        }
      },
      iniFile: 'app/ini'
    })
  });
})();