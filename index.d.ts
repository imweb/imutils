export interface CookieOption {
  value: string;
  time: string | number;
  domain: string;
}

export interface ImutilsStorage {
  /**
   * @param {string} key
   * @param {string} value
   * @memberof ImutilsStorage
   */
  set(key: string, value: string);

  /**
   * @param {string} key
   * @returns {string}
   * @memberof ImutilsStorage
   */
  get(key: string): string;

  /**
   * @param {string} key
   * @param {string} value
   * @memberof ImutilsStorage
   */
  setGlobal(key: string, value: string);

  /**
   * @param {string} key
   * @param {string} value
   * @memberof ImutilsStorage
   */
  getGloabal(key: string, value: string);
}

export interface ImutilsStatic {
  /**
   * @description 是否是浏览器环境
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isClient: boolean;

  /**
   * @description 是否是NodeJs服务器环境
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isServer: boolean;

  /**
   * 检测当前环境是否支持WebP
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isSupportedWebP: boolean;

  /**
   * 是否为 IE 浏览器
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isIE: boolean;

  /**
   * 是否微信登录用户
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isWexin: boolean;

  /**
   * 是否QQ登录用户
   * @type {boolean}
   * @memberof ImutilsStatic
   */
  isQQLogin: boolean;

  /**
   * @description 转换价格为方便阅读的格式
   * @param {number} num
   * @returns {number}
   * @memberof ImutilsStatic
   */
  formatShortSignUpNum(num: number): number;

  /**
   * 日期格式化
   * @param {string} pattern
   * @param {Date} date
   * @returns {string}
   * @memberof ImutilsStatic
   */
  formatDate(pattern: string, date: Date): string;

  /**
   * 时间戳转换
   * @param {(number | string)} time
   * @returns {string}
   * @memberof ImutilsStatic
   */
  translateTimeStamp(time: number | string): string;

  /**
   * decode html代码
   * @param {string} string
   * @returns {string}
   * @memberof ImutilsStatic
   */
  decodeHtml(string: string): string;

  /**
   * 通过name获取Cookie
   * @param {string} name
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getCookie(name: string): string;

  /**
   * 设置Cookie的值
   * @param {CookieOption} option
   * @returns {undefined}
   * @memberof ImutilsStatic
   */
  setCookie(option: CookieOption): undefined;

  /**
   * 删除某一项Cookie
   * @param {string} name
   * @param {string} domain
   * @param {string} path
   * @returns {undefined}
   * @memberof ImutilsStatic
   */
  delCookie(name: string, domain: string, path: string): undefined;

  /**
   * 返回QQ或者微信的uin
   * @returns {String}
   * @memberof ImutilsStatic
   */
  getUin(): String;

  /**
   * 获取登录态字段
   * @returns {String}
   * @memberof ImutilsStatic
   */
  getAuth(): String;

  /**
   * 获取QQ的Uin
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getQQUin(): string;

  /**
   * 获取Cookie中的p_skey
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getSkey(): string;

  /**
   * 获取bkn
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getBkn(): string;

  /**
   * 判断当前环境是否PC环境
   * @returns {boolean}
   * @memberof ImutilsStatic
   */
  isPc(): boolean;

  /**
   * 判断是否MQQ
   * @returns {boolean}
   * @memberof ImutilsStatic
   */
  isMQQ(): boolean;

  /**
   * 是否是辅导APP
   * @returns {boolean}
   * @memberof ImutilsStatic
   */
  isFudaoApp(): boolean;

  /**
   * 获取当前辅导APP的版本
   * @returns {boolean}
   * @memberof ImutilsStatic
   */
  getAppVersion(): string;

  /**
   * 获取当前环境如：IOS、Android、H5
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getPlatForm(): string;

  /**
   * 获取终端环境
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getTerminal(): string;

  /**
   * 获取当前平台的code代码
   * @returns {number}
   * @memberof ImutilsStatic
   */
  getPlatformCode(): number;

  /**
   * 获取IOS版本
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getIOSVersion(): string;

  /**
   * 获取IE版本号
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getIEVer(): string;

  /**
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getTencentURL(): string;

  /**
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getSafariVer(): string;

  /**
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getFirefoxVer(): string;

  /**
   * @returns {boolean}
   * @memberof ImutilsStatic
   */
  isIphoneX(): boolean;

  /**
   * storage的封装
   * @type {ImutilsStorage}
   * @memberof ImutilsStatic
   */
  storage: ImutilsStorage;

  /**
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getBitMapValue(): string;

  /**
   * 根据出入的text生成tips
   * @param {string} text
   * @memberof ImutilsStatic
   */
  showTips(text: string);

  /**
   * @memberof ImutilsStatic
   */
  hideTips();

  /**
   * 显示顶部的tips
   * @param {string} text
   * @memberof ImutilsStatic
   */
  showTopTips(text: string);

  /**
   * 设置name为plCache的Cookie
   * @param {string} pl
   * @memberof ImutilsStatic
   */
  setPlCache(pl: string);

  /**
   * @param {string} url
   * @memberof ImutilsStatic
   */
  getImgUrl(url: string);

  /**
   * 根据cid获取课程的URl
   * @param {(number|string)} cid
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getCourseUrl(cid: number | string): string;

  /**
   * 获取老师的Url
   * @param {(string|number)} tid
   * @returns {string}
   * @memberof ImutilsStatic
   */
  getTeacherUrl(tid: string | number): string;

  /**
   * 设置分享的信息
   * @memberof  ImutilsStaticm
   * @param {string} title 标题
   * @param {string} desc 描述
   * @param {string} link 链接
   * @param {string} imgUrl 图片地址
   */
  setShareInfomation(title: string, desc: string, link: string, imgUrl: string);

  /**
   * @param {string} succUrl
   * @memberof ImutilsStatic
   */
  qqLogin(succUrl: string);

  /**
   * 重新登录
   * @memberof ImutilsStatic
   */
  reLogin();

  /**
   * 获取params
   * @param {string} key
   * @memberof ImutilsStatic
   */
  getParams(key: string);

  /**
   * 统一给 url 添加 wv 值
   * @param {string} url
   * @returns {string}
   * @memberof ImutilsStatic
   */
  addQuickBackWV(url: string): string;

  /**
   * 深复制一个对象到另一个对象
   * @param {object} target 目标对象
   * @param {object} source 被复制的对象
   * @returns {object}
   * @memberof ImutilsStatic
   */
  deepAssign(target: object, source: object): object;

  /**
   * 给一个元素添加事件
   * @param {HTMLElement} target
   * @param {string} eventType
   * @param {function} callback
   * @param {boolean} capture
   * @memberof ImutilsStatic
   */
  addEvent(
    target: HTMLElement,
    eventType: string,
    callback: Function,
    capture: boolean
  );

  /**
   * 给一个元素删除事件
   * @param {HTMLElement} target
   * @param {string} eventType
   * @param {function} callback
   * @param {boolean} capture
   * @memberof ImutilsStatic
   */
  removeEvent(
    target: HTMLElement,
    eventType: string,
    callback: Function,
    capture: boolean
  );

  /**
   * 获取字符串的长度
   * @param {string} string
   * @returns {number}
   * @memberof ImutilsStatic
   */
  getStrLength(string: string): number;

  /**
   * 获取富文本的长度
   * @param {string} string
   * @returns {number}
   * @memberof ImutilsStatic
   */
  getRichStrLength(string: string): number;

  replaceLink(str);

  richTextFilter(str);

  /**
   * @param {string} url
   * @param {Function} callback
   * @param {object} option
   * @memberof ImutilsStatic
   */
  jsonp(url: string, callback: Function, option: object);

  weiXinApply(callback: Function);

  /**
   * 判断元素是否可见
   * @param {HTMLElement} ele
   * @memberof ImutilsStatic
   */
  isVisible(ele: HTMLElement);

  /**
   * @param {HTMLElement} ele
   * @param {string} selector
   * @returns {HTMLElement}
   * @memberof ImutilsStatic
   */
  closest(ele: HTMLElement, selector: string): HTMLElement;

  /**
   * 保证元素可见
   * @param {HTMLElement} ele
   * @param {HTMLElement} container
   * @memberof ImutilsStatic
   */
  ensureVisible(ele: HTMLElement, container: HTMLElement);

  /**
   * 计算鼠标滑动动，导致的页面滚动量
   * @param {Event} event
   * @returns {object}
   * @memberof ImutilsStatic
   */
  normalizeWheel(event: Event): object;

  
  /**
   * 辅导课的类型 
   * @type {{
   *     6: "讲座课";
   *     7: "系统课";
   *     1: "系统课";
   *     2: "讲座课";
   *   }}
   * @memberof ImutilsStatic
   */
  CourseType: {
    6: "讲座课";
    7: "系统课";
    1: "系统课";
    2: "讲座课";
  };

  /**
   * 科目的代码 
   * @type {object}
   * @memberof ImutilsStatic
   */
  SUBJECTS: object

  /**
   * 年级代码
   * @type {object}
   * @memberof ImutilsStatic
   */
  GRADES:object

  /**
   * 获取被保存的科目 
   * @returns {object} 
   * @memberof ImutilsStatic
   */
  getSavedSubject():object

  /**
   * 获取科目名称 
   * @param {number} num 
   * @returns {string} 
   * @memberof ImutilsStatic
   */
  getSubjectName(num:number):string

  /**
   * 获取科目的简称 
   * @param {number} num 
   * @returns {string} 
   * @memberof ImutilsStatic
   */
  getSubjectShortName(num:number):string

  getGradeName(str: string): string

  /**
   * 获取教程版本 
   * @param {number} num 
   * @returns {string} 
   * @memberof ImutilsStatic
   */
  getTutorial(num:number): string

  openUrlByIframe();
  openAppPage();
  openApp();
  isAppInstalled();
  gotoNativePage();
  jumpToNativePage();
  callService();
  callBussinessQQ();
  callQQGroup();

  msgTools:object;
}

export const Imutils: ImutilsStatic;

export default Imutils;
