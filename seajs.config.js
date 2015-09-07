/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-06 11:42:12
 * @description
 */
seajs.config({

  base: './',

  debug: true,

  preload: ['seajs-text', 'underscore'],

  /*路径*/
  paths: {
    //插件
    'pulgs': 'pulgs',

    //工具类
    'utils': 'utils',

    'devtools': 'devtools'
  },

  /*别名*/
  alias: {
    'underscore': 'bower_components/underscore/underscore',

    'seajs-text': 'bower_components/seajs-text/dist/seajs-text'
  }
});