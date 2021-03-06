/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-17 16:37:39
 * @description   视窗容器
 */
define(function(require, exports, module) {

  var Viewport,

    util = require('infrastructure/util'),

    BaseViewport = require('infrastructure/component/BaseViewport'),

    Header = require('common/component/viewport/partial/header/Header'),

    Sidebar = require('common/component/viewport/partial/sidebar/Sidebar'),

    template = require('common/component/viewport/template');

  Viewport = module.exports = BaseViewport.extend({

    replace: false,

    template: template,

    /**
     * 组件
     * @type {Object}
     */
    components: {
      header: Header,

      sidebar: Sidebar
    },

    methods: {

      /**
       * 视图转换处理函数
       */
      onViewChange: function(componentType) {
        var me = this,
          header = me.$['header'],
          options = componentType.options;

        //header变更数据
        header.onViewChange({
          title:options.title,
          theme:options.theme
        });

      }

    }
  });

});
