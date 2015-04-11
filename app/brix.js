/*
    author:xinglie.lkf@taobao.com
    扩展view提供brix的pagelet自动初始化组件，并跟数据结合渲染页面
    后续可能放到CDN，不要放与应用有关的代码
 */
define('app/brix', ['magix', 'brix/bisheng', 'jquery', 'brix/loader'], function(Magix, BiSheng, $, Loader) {
  var SubTmplReg = /\{{2}#bx-tmpl-(\w+)\}{2}([\s\S]*?)\{{2}\/bx-tmpl(?:-\1)?\}{2}/gi;
  var VfTagName = Magix.config('tagName');
  var Now = $.now();
  window.$ = $;
  return Magix.View.mixin({
    getSubTmpl: function(key) {
      return this.$subTmpls[key] || '';
    },
    updateUI: function() {
      var me = this;
      var defer = $.Deferred();
      var sign = me.sign;
      if (!me.rendered) {
        if (me.bisheng) me.bisheng.unbind(me.data, me.tmpl)
        // console.log('updateUI', me.id)
        me.bisheng = BiSheng.bind(me.data, me.tmpl, {
          before: function(changes) {
            $.each(changes, function(index, item) {
              switch (item.type) {
                case 'add_block':
                case 'delete_block':
                case 'update_block':
                  if (item.target.nodeType === 1) {
                    // console.log(item.type, item.target);
                    Loader.destroy(item.target);
                    me.undelegateEvents('#' + me.id);
                    me.owner.unmountZoneVframes(item.target);
                  }
                  break;
              }
            });
          },
          after: function(changes) {
            $.each(changes, function(index, item) {
              switch (item.type) {
                case 'add_block':
                case 'delete_block':
                case 'update_block':
                  if (item.target.nodeType === 1) {
                    Loader.boot(item.target);
                    me.delegateEvents('#' + me.id);
                    if (item.target.tagName.toLowerCase() == VfTagName || item.target.getAttribute('mx-vframe')) {
                      if (!item.target.id) {
                        item.target.id = 'mx_n_' + Now++;
                      }
                      me.owner.mountVframe(item.target.id, item.target.getAttribute('mx-view'));
                    } else {
                      me.owner.mountZoneVframes(item.target);
                    }
                  }
                  break;
              }
            });
          },
          resolve: function(content) {
            $('#' + me.id).html(content);
            // console.log(me.id, 'delegateEvents start-----');
            me.delegateEvents('#' + me.id);
            // console.log(me.id, 'delegateEvents end-----');
            Loader.boot($('#' + me.id)[0], function(){
              if (sign == me.sign) {
                me.endUpdate();
                defer.resolve(Loader);
              }
            });
            
          }
        });
      } else {
        if (me.bisheng) me.bisheng.apply();
        if (sign == me.sign) {
          defer.resolve(Loader);
        }
      }
      return defer.promise();
    }
  }, function() {
    var me = this;
    me.BiSheng = BiSheng;
    me.data = {};

    me.$subTmpls = {};
    // console.log(me);
    me.on('inited', function() {
      me.tmpl = me.tmpl.replace(SubTmplReg, function(match, key, content) {
        me.$subTmpls[key] = content;
        return '';
      });
    });
    me.on('destroy', function() {
      me.undelegateEvents('#' + me.id);
      Loader.destroy($('#' + me.id)[0]);
      // console.log('destroy', me.id)
      if (me.bisheng) me.bisheng.unbind(me.data, me.tmpl)
    });
  });
});