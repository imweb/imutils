import storage from './util_05_storage';

function mapReverse(map) {
  for (const k in map) {
    const v = map[k];
    map[v] = k;
  }
}

const COURSE_TYPE = {
  NORMAL: 7,
  TOPIC: 6,
};

const subject = {
  6001: ['语文', '语'],
  6002: ['数学', '数'],
  6003: ['化学', '化'],
  6004: ['物理', '物'],
  6005: ['英语', '英'],
  6006: ['生物', '生'],
  6007: ['政治', '政'],
  6008: ['历史', '史'],
  6009: ['地理', '地'],
  6010: ['讲座', '讲'],
};

const grade = {
  5001: '高一',
  5002: '高二',
  5003: '高三',
  6001: '初一',
  6002: '初二',
  6003: '初三',
};

// 按位 计算
// 二进制 1-6位，初中 --> 高三，7-12，小学 一到 6年级；
const deprecatedGrade = {
  1: '初一',
  2: '初二',
  4: '初三',
  8: '高一',
  16: '高二',
  32: '高三',
  64: '一年级',
  128: '二年级',
  256: '三年级',
  512: '四年级',
  1024: '五年级',
  2048: '六年级',

  3: '初中',
  5: '初中',
  6: '初中',
  7: '初中',
  24: '高中',
  40: '高中',
  48: '高中',
  56: '高中',
};

const PRIMARY_GREADE_MAP = {
  7001: '一',
  7002: '二',
  7003: '三',
  7004: '四',
  7005: '五',
  7006: '六',
};

// 学科标识
const SING_HIGH = '500'; // 高中
const SING_JUNIOR = '600'; // 初中
const SING_PRIMARY = '700'; // 小学

function getGradeName(str) {
  if (!str) {
    return '';
  }
  const arr = String(str).split(','); // 保存数组
  if (arr.length === 1) {
    return Number(arr[0]) > 1000 ? GRADES[arr[0]] :
      (deprecatedGrade[arr[0]] != undefined ? deprecatedGrade[arr[0]] : '小学');
  }
  const isHighSchool = str.indexOf(SING_HIGH) > -1 ? 1 : 0;
  const isMiddSchool = str.indexOf(SING_JUNIOR) > -1 ? 1 : 0;
  const isPrimarySchool = str.indexOf(SING_PRIMARY) > -1 ? 1 : 0;
  // 5XXX， 6XXX， 7XXX , 跨年级，就是 全年级
  const mergeResult = isHighSchool + isMiddSchool + isPrimarySchool;
  if (mergeResult >= 2) { // 存在 2个年级，就是全年级, 或者 大于等于 3个年级
    return '全年级';
  } else if (arr.length == 2) {
    let ret = [];
    let sigalCount = 0; // 大于 14000 ，证明就是 有 小学 年级
    arr.forEach((key) => {
      ret.push(GRADES[key]);
      sigalCount += Number(key);
    });

    if (sigalCount > 14000) { // 大于 14000 就是2个小学年级，小学从 7000 开始
      ret = [];
      arr.forEach((key) => {
        ret.push(PRIMARY_GREADE_MAP[key]);
      });
      ret = `${ret.join('/')}年级`;
    } else {
      ret = ret.join('/');
    }
    return ret;
  } else if (arr.length == 3) { // 等于3的情况，这样，判断一个就可以，因为一定是一个年级的。
    if (arr[0] > 5000 && arr[0] < 6000) { // 高中
      return '高中';
    } else if (arr[0] > 6000 && arr[0] < 7000) {
      return '初中';
    }
    return '小学';
  } else if (arr.length > 3) { // 当大于3，并且还在一个年级的场景，只有小学存在，扩展使用
    return '小学';
  }

  return ['高中', '初中'][mergeResult - 1];
}

/**
 * 辅导课程的类型
 * @enum {string}
 * @readonly
 * @memberof module:tencent/imutils
 */
const CourseType = {
  /** 讲座课 */
  6: '讲座课',
  /** 系统课 */
  7: '系统课',
  /** 系统课 */
  1: '系统课',
  /** 讲座课 */
  2: '讲座课',
};

/**
 * 年级代码
 * @memberof module:tencent/imutils
 * @enum {string}
 * @readonly
 */
const GRADES = {
  /** 全年级 */
  '5001,5002,5003,6001,6002,6003': '全年级',
  /** 全年级 */
  '6001,6002,6003,5001,5002,5003': '全年级',
  /** 高中全部 */
  '5001,5002,5003': '高中全部',
  /** 初中全部 */
  '6001,6002,6003': '初中全部',
  /** 高中 */
  '5001,5002': '高中',
  /** 高中 */
  '5001,5003': '高中',
  /** 高中 */
  '5002,5003': '高中',
  /** 初中 */
  '6001,6002': '初中',
  /** 初中 */
  '6001,6003': '初中',
  /** 初中 */
  '6002,6003': '初中',
  /** 高一 */
  5001: '高一',
  /** 高二 */
  5002: '高二',
  /** 高三 */
  5003: '高三',
  /** 初一 */
  6001: '初一',
  /** 初二 */
  6002: '初二',
  /** 初三 */
  6003: '初三',
  /** 一年级 */
  7001: '一年级',
  /** 二年级 */
  7002: '二年级',
  /** 三年级 */
  7003: '三年级',
  /** 四年级 */
  7004: '四年级',
  /** 五年级 */
  7005: '五年级',
  /** 六年级 */
  7006: '六年级',
};

mapReverse(GRADES);

/**
 * @enum {string} 科目的代码
 * @memberof module:tencent/imutils
 */
const SUBJECTS = {
  /** 语文 */
  6001: '语文',
  /** 数学 */
  6002: '数学',
  /** 化学 */
  6003: '化学',
  /** 物理 */
  6004: '物理',
  /** 英语 */
  6005: '英语',
  /** 生物 */
  6006: '生物',
  /** 政治 */
  6007: '政治',
  /** 历史 */
  6008: '历史',
  /** 地理 */
  6009: '地理',
  /** 讲座 */
  6010: '讲座',
};

mapReverse(SUBJECTS);

/**
 * 获取被保存的科目
 * @memberof module:tencent/imutils
 * @return {object}  会返回这样的格式{subject,subjectIndex}
 */
function getSavedSubject() {
  const subject = storage.get('pl_subject_text') || '';
  const subjectIndex = storage.get('pl_subject_index') || 0;

  return {
    subject,
    subjectIndex,
  };
}

/**
 * 获取科目的名称
 * @param {number} num
 * @memberof module:tencent/imutils
 * @return {object}
 */
function getSubjectName(num) {
  if (!num) {
    return '';
  }
  return subject[num][0];
}

/**
 * 获取科目的简称
 * @param {number} num
 * @memberof module:tencent/imutils
 * @return {object}
 */
function getSubjectShortName(num) {
  if (!num) {
    return '';
  }
  return subject[num][1];
}

/**
 * @memberof module:tencent/imutils
 */
function getGradeName(str) {
  if (!str) {
    return '';
  }
  str = String(str).split(',');
  if (str.length === 1) {
    return Number(str[0]) > 1000 ? grade[str[0]] : deprecatedGrade[str[0]];
  }
  const mergeResult = str.reduce((value, next) => {
    return value & (next < 6000 ? 1 : 2);
  }, 3); // 0 同时存在，1 高中，2 初中
  if (!mergeResult) {
    return '全年级';
  } else if (str.length === 2) {
    return str.map(value => grade[value]).join('/');
  }
  return ['高中', '初中'][mergeResult - 1];
}

const tutorial = {
  1: '人教版',
  2: '沪教版',
  3: '苏教版',
  4: '浙教版',
  5: '外研版',
  6: '华师大版',
  7: '青岛版',
  8: '北师大版',
  1000: '其他',
};

/**
 * @memberof module:tencent/imutils
 */
function getTutorial(num) {
  return tutorial[num];
}

export {
  CourseType,
  SUBJECTS,
  grade, // deprecated use GRADES please
  GRADES,
  getSavedSubject,

  getSubjectName,
  getSubjectShortName,
  getGradeName,
  COURSE_TYPE,
  getTutorial,
};
