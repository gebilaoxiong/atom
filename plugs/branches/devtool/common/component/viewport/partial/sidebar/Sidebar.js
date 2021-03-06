/**
 *
 * @authors  熊洋
 * @email    xywindows@gmail.com
 * @date     2015-09-24 23:03:17
 * @version  侧边栏
 */
define(function(require, exports, module) {

  var Sidebar,

    BaseComponent = require('infrastructure/component/BaseComponent'),

    template = require('common/component/viewport/partial/sidebar/template'),

    menus;

  menus = [{
    icon: 'inbox', text: '任务管理', path:'!/'
  },{
    icon: 'clock', text: '项目配置', path:'!/project/index'
  }];

  Sidebar = module.exports = BaseComponent.extend({

    template: template,

    data: function() {
      return {
        //菜单
        menus: menus
      };
    }
  });

});
