define(
  'app/view',
  [
    'jquery',
    'handlebars',
    'magix',
    'brix/loader'
  ], function ($, Handlebars, Magix, Loader) {
  // 扩展Handlebars实现if等于判断
  Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    return (v1.valueOf() === v2) ? options.fn(this) : options.inverse(this)
  })

  return Magix.View.mixin({
    request: function() {
      return Manager.createRequest(this)
    },
    setViewHTML: function(data) {
      var me = this
      var defer = $.Deferred()
      var promise = defer.promise()
      var $wrapper = $('#' + me.id)
      var sign = me.sign

      data = data || me.data
      if (!me.__tmplFn__) {
        me.__tmplFn__ = Handlebars.compile(me.tmpl)
      }
      Loader.destroy($wrapper[0])
      //加上renderer处理
      if (me.renderers) {
        me.registerRenderers(me.renderers)
      }

      me.setHTML(me.id, me.__tmplFn__(data))

      Loader.boot($wrapper[0], function() {
        if (sign == me.sign) {
          defer.resolve(Loader)
        }
      })

        return promise
    },
    /**
     * 注册模板帮助方法
     * @param {object} data 包含方法的对象
     **/
    registerRenderers: function(data) {
      data = data || {}
      var me = this
      var ret = {}
      for (var group in data) {
        var groups = data[group]
        for (var n in groups) {
          ret[group + '_' + n] = (function(f) {
            return function() {
              return f.call(this, me)
            }
          }(groups[n]))
        }
      }
      return $.extend(me.data, ret)
    }
  })
})