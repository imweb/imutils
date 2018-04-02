/**
 * @module tencent/imutils
 * @description 一些描述信息一些描述信息一些描述信息
 */
import { isServer } from './util_00_env';

export * from './util_01_format';
export * from './util_02';
export * from './util_03_cookie';
export * from './util_04_ua';
export * from './util_05_storage';
export * from './util_06_img';
export * from './util_07'; // 其它杂项
export * from './util_08_login';
export * from './util_09_url';
export * from './util_10_lang';
export * from './util_11_wx';
export * from './util_12_dom';
export * from './util_13_constant';
export * from './util_14_bom';
export * from './util_15_app';
export * from './util_16_qq';
export * from './util_17_chat';
export * from './util_00_env';

// 手Q750-阅读内容与消息列表快捷切换
// android 特殊处理
(function () {
  if (!isServer) {
    if (window.mqq && window.mqq.android && window.mqq.QQVersion !== 0) {
      const { mqq } = window;
      mqq.ui.setTitleButtons({
        right: {
          title: '菜单',
          hidden: false,
          iconID: 4,
          callback() {
            mqq.ui.showShareMenu();
          },
        },
      });
    }
  }
}());
