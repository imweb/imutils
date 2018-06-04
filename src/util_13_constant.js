import { storage } from './util_05_storage';

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
  7001: '一年级',
  7002: '二年级',
  7003: '三年级',
  7004: '四年级',
  7005: '五年级',
  7006: '六年级',
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

const PRIMARY_GREADE_MAP = {
  7001: '一',
  7002: '二',
  7003: '三',
  7004: '四',
  7005: '五',
  7006: '六',
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

// 学科标识
const SING_HIGH = '500'; // 高中
const SING_JUNIOR = '600'; // 初中
const SING_PRIMARY = '700'; // 小学
/**
 * @memberof module:tencent/imutils
 */
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
    if (mergeResult >= 2) {  // 存在 2个年级，就是全年级, 或者 大于等于 3个年级
      return '全年级';
    } else if (arr.length === 2) {
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
    } else if (arr.length === 3) {  // 等于3的情况，这样，判断一个就可以，因为一定是一个年级的。
      if (arr[0] > 5000 && arr[0] < 6000) { // 高中
        return '高中';
      } else if (arr[0] > 6000 && arr[0] < 7000) {
        return '初中';
      } else {
        return '小学';
      }
    } else if (arr.length > 3) {  // 当大于3，并且还在一个年级的场景，只有小学存在，扩展使用
      return '小学';
    }
    else {
      return ['高中', '初中'][mergeResult - 1];
    }
  
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

const SUBJECTS2 = SUBJECTS;

/**
 * 获取年级名称标签
 *
 * @param {string} 数字组成的年级，也支持一个数字。例如：'6001,6002'、6001等
 * @param {bool} isGradeMerge 年级内是否合并，如果是true，
 * 高中/初中年级内有两个以上年级，返回“高中”/“初中”，小学三个以上年级，返回“小学”
 * @param {bool} isAllMerge 如果为true，全部都会合并。
 * @returns {string} 年级标签。例如："高中"、"高一,高二"等
 *
 * getGradeNameStr('7001,7002,6001,6002',false,false) => '初一,初二,一年级,二年级'
 * getGradeNameStr('7001,7002,6001,6002',true,false) => '初中,一年级,二年级'
 * getGradeNameStr('7001,7002,6001,6002',true,true) => '全年级'
 * getGradeNameStr2('7001,7002',true,true) => '小学'
 */
const getGradeNameStr = function (gradeStr = '', isGradeMerge, isAllMerge) {
  let gradesStr = gradeStr;
  if (typeof gradesStr !== 'string') {
    gradesStr = String(gradeStr);
  }

  const highGrades = gradesStr.match(/500[123]/g);
  const middleGrades = gradesStr.match(/600[123]/g);
  const primaryGrades = gradesStr.match(/700[1-5]/g);

  const gradeNames = [];

  // 有高中的年级，则返回对应的年级，例如: “高一”、“高一,高二”。
  // 如果要进行合并，有两个以上高中年级，返回“高中”。
  if (highGrades && highGrades.length >= 2 && (isGradeMerge || isAllMerge)) {
    gradeNames.push('高中');
  } else if (highGrades && highGrades.length) {
    highGrades.sort((a, b) => a - b).forEach((gradeItem) => {
      gradeNames.push(GRADES[gradeItem]);
    });
  }

  if (middleGrades && middleGrades.length >= 2 && (isGradeMerge || isAllMerge)) {
    gradeNames.push('初中');
  } else if (middleGrades && middleGrades.length) {
    middleGrades.sort((a, b) => a - b).forEach((gradeItem) => {
      gradeNames.push(GRADES[gradeItem]);
    });
  }

  // 如果要进行合并，有三个以上小学年级，返回“小学”
  if (primaryGrades && primaryGrades.length >= 3 && (isGradeMerge || isAllMerge)) {
    gradeNames.push('小学');
  } else if (primaryGrades && primaryGrades.length) {
    primaryGrades.sort((a, b) => a - b).forEach((gradeItem) => {
      gradeNames.push(GRADES[gradeItem]);
    });
  }

  if (isAllMerge && !highGrades && !middleGrades && gradeNames.length > 1) {
    return '小学';
  } else if (isAllMerge && gradeNames.length > 1) {
    return '全年级';
  }
  return gradeNames.toString();
};

export {
  CourseType,
  SUBJECTS,
  SUBJECTS2,
  grade, // deprecated use GRADES please
  GRADES,
  getSavedSubject,

  getSubjectName,
  getSubjectShortName,
  getGradeName,
  getGradeNameStr,
  COURSE_TYPE,
  getTutorial,
};
