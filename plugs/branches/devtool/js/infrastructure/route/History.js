/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-11 16:49:51
 * @description
 */
define(function(require, exports, module) {
  var History,

    $ = require('controls'),

    rhash = /#(.*)$/,

    /*移除hash开头的#  结尾的空白*/
    rhashStrip = /^#|\s+$/;

  History = module.exports = Q.Class.define($.util.Observable, {

    /*当前hash值*/
    locationHash: undefined,

    /*初始化完成时是否对向前hash进行匹配*/
    initSilent: false,

    /**
     * 初始化
     */
    init: function(options) {
      var me = this;

      Q.extend(me, options);

      //缓存location对象
      me.location = window.location;
      me.history = window.history;

      //绑定事件
      me.callParent(arguments);
    },

    start: function() {
      var me = this,
        locationHash;

      //当前的hash值
      locationHash = this.getLocationHash();

      Q.events.add(window, 'hashchange', me.checkUrl, null, me);

      me.locationHash = locationHash;

      //如果要求初始化的时候 不触发hashchange事件
      if (!me.initSilent) {
        me.fire('hashchange', me.locationHash);
      }
    },

    /**
     * 检查hash是否发生变更
     */
    checkUrl: function() {
      var me = this,
        currentHash;

      //获取当前窗体的hash值
      currentHash = me.getLocationHash();

      //没有发生变化
      if (currentHash === me.locationHash) {
        return;
      }

      me.fire('hashchange', currentHash);
    },

    /**
     * 导航到某一页
     * @param  {String}         hash        hash值
     * @param  {Obejct}         options     选项
     *                          execLoad    是否执行载入
     *                          replace     操作是否为替换
     */
    navigate: function(locationHash, options) {
      var me = this;

      locationHash = locationHash.replace(rhash, '');

      //没有变更
      if (locationHash === me.locationHash) {
        return;
      }

      /*整理参数*/
      //如果options为null undefined 或者bool值 则是设置的silent
      if (options == undefined || Q.isBool(options)) {
        options = {
          silent: !!options
        }
      }

      me.locationHash = locationHash;

      me.updateHash(me.location, locationHash, options.replace);

      //静音 不触发hashchange事件
      if (options.silent !== true) {
        me.fire('hashchange', locationHash);
      }
    },

    /**
     * 更新hash值
     * @param  {Location}       loaction        Location对象实例
     * @param  {String}         hash            hash值
     * @param  {Bool}           replace         是否替换当前历史记录
     */
    updateHash: function(loaction, hash, replace) {
      var me = this,
        href;

      hash = '#' + hash;

      if (replace) {
        //由于chrome下location.replace替换当前页后 进行退档操作会刷新页面
        //所以我们这里采用replaceState的方式更新hash
        if (Q.support.replaceState) {
          me.history.replaceState(me.history.state, '', hash);
        } else {
          //先移除location中的锚点信息
          href = String(location.href).replace(rhash, '');
          //替换当前页的历史
          location.replace(href + hash);
        }
      } else {
        location.hash = hash;
      }
    },

    /**
     * 获取location中的hash值
     * @param  {Location}       location        Location对象实例
     */
    getLocationHash: function(location) {
      var match;

      rhash.lastIndex = 0;

      //ie6中location.hash只能获取部分hash
      //比如 如www.baidu.com#123/xxsdf?ss只能获取到123
      //FF中location.hash会decodeURIComponent 真实捉鸡
      //老老实实用正则吧
      match = (location || this.location).href.match(rhash)
      return match ? match[1].replace(rhashStrip, '') : '';
    },

    destroy: function() {
      var me = this;

      //先解除事件绑定
      me.callParent(arguments);

      //解除hashchange事件绑定
      Q.events.remove(window, 'hashchange', me.checkUrl, me);

      delete me.location;
    }
  });

})