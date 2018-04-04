/**
 * @module tencent/imutils
 * @description 一些描述信息一些描述信息一些描述信息
 */

import {
  isClient,
  isServer,
  isSupportedWebP,
  isIE,
} from './util_00_env';

import {
  formatShortSignUpNum,
  formatDate,
  formatTaskTime,
  price,
  prices,
  translateTimeStamp,
} from './util_01_format';

import { decodeHtml } from './util_02';
import { getCookie, setCookie, delCookie } from './util_03_cookie';

import {
  getUin,
  getQQUin,
  getSkey,
  getAuth,
  getBkn,
  isWeixin,
  isPC,
  isQQ,
  isWX,
  isMQQ,
  isFudaoApp,
  versionCodeZero,
  getPlatForm,
  getTerminal,
  getAppVersion,
  getPlatformCode,
  getIOSVersion,
  getTencentURL,
  getIEVer,
  getSafariVer,
  getFirefoxVer,
  getTeacherClient,
  isIphoneX,
} from './util_04_ua';

import { storage } from './util_05_storage';
import { imgHashCache } from './util_06_img';

import {
  getBitMapValue,
  showTips,
  hideTips,
  showTopTips,
  setPlCache,
  versionfunegt,
  getImgUrl,
  getCourseUrl,
  getTeacherUrl,
  clickLock,
  photoProgress,
  setShareInfomation,
} from './util_07'; // 其它杂项

import {
  qqLogin,
  wxLogin,
  login,
} from './util_08_login';

import {
  getQuery,
  getParams,
  getHash,
  parseQueryString,
  updateQueryString,
  addQuickBackWV,
} from './util_09_url';

import {
  deepAssign,
  str,
  trim,
  addEvent,
  removeEvent,
  getStrLength,
  getRichStrLength,
  replaceLink,
  richTextFilter,
  loadScript,
  jsonp,
  fillZero,
} from './util_10_lang';

import { weiXinApply } from './util_11_wx';

import {
  selectionHandler,
  isVisible,
  closest,
  ensureVisible,
  normalizeWheel,
} from './util_12_dom';

import {
  CourseType,
  SUBJECTS,
  grade,
  GRADES,
  getSavedSubject,
  getSubjectName,
  getSubjectShortName,
  getGradeName,
  COURSE_TYPE,
  getTutorial,
} from './util_13_constant';

import { addPageShowListener } from './util_14_bom';

import {
  openUrlByIframe,
  openAppPage,
  openApp,
  isAppInstalled,
  gotoNativePage,
  jumpToNativePage,
} from './util_15_app';

import {
  callService,
  callBussinessQQ,
  callQQGroup,
} from './util_16_qq';

import { msgTools } from './util_17_chat';

// 手Q750-阅读内容与消息列表快捷切换
// android 特殊处理
(function () {
  if (!isServer) {
    if (window.mqq && window.mqq.android && window.mqq.QQVersion !== 0) {
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

module.exports = {
  storage,

  getCookie,
  setCookie,
  delCookie,

  getUin,
  getQQUin,
  getSkey,
  getAuth,
  getBkn,
  isWeixin,
  isPC,
  isQQ,
  isWX,
  isMQQ,
  isFudaoApp,
  versionCodeZero,
  getPlatForm,
  getTerminal,
  getAppVersion,
  getPlatformCode,
  getIOSVersion,
  getTencentURL,
  getIEVer,
  getSafariVer,
  getFirefoxVer,
  getTeacherClient,
  isIphoneX,
  weiXinApply,
  decodeHtml,
  imgHashCache,
  formatShortSignUpNum,
  price,
  prices,
  translateTimeStamp,
  formatDate,
  formatTaskTime,
  login,
  qqLogin,
  wxLogin,
  getQuery,
  getHash,
  getParams,
  parseQueryString,
  updateQueryString,
  addQuickBackWV,
  // lang
  deepAssign,
  str,
  trim,
  addEvent,
  removeEvent,
  getStrLength,
  getRichStrLength,
  replaceLink,
  richTextFilter,
  loadScript,
  jsonp,
  fillZero,
  // dom
  selectionHandler,
  isVisible,
  closest,
  ensureVisible,
  normalizeWheel,
  // 常量
  CourseType,
  grade,
  GRADES,
  SUBJECTS,
  SUBJECTS2: SUBJECTS, // 为什么要重复 export ???
  getSavedSubject,
  getSubjectName,
  getSubjectShortName,
  getGradeName,
  COURSE_TYPE,
  getTutorial,
  // env
  isClient,
  isServer,
  isSupportedWebP,
  isIE,
  // 难以分类的
  getBitMapValue,
  showTips,
  hideTips,
  showTopTips,
  setPlCache,
  versionfunegt,
  getImgUrl,
  getCourseUrl,
  getTeacherUrl,
  clickLock,
  photoProgress,
  setShareInfomation,

  addPageShowListener,

  openUrlByIframe,
  openAppPage,
  openApp,
  isAppInstalled,
  gotoNativePage,
  jumpToNativePage,

  callService,
  callBussinessQQ,
  callQQGroup,

  msgTools,
};
