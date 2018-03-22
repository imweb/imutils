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

const deprecatedGrade = {
  1: '初一',
  2: '初二',
  4: '初三',
  8: '高一',
  16: '高二',
  32: '高三',
  3: '初中',
  5: '初中',
  6: '初中',
  7: '初中',
  24: '高中',
  40: '高中',
  48: '高中',
  56: '高中',
};

const CourseType = {
  // user_all_course 的定义
  6: '讲座课',
  7: '系统课',
  // get_today_lessons 的定义
  1: '系统课',
  2: '讲座课',
};

const GRADES = {
  '5001,5002,5003,6001,6002,6003': '全年级',
  '6001,6002,6003,5001,5002,5003': '全年级',
  '5001,5002,5003': '高中全部',
  '6001,6002,6003': '初中全部',
  '5001,5002': '高中',
  '5001,5003': '高中',
  '5002,5003': '高中',
  '6001,6002': '初中',
  '6001,6003': '初中',
  '6002,6003': '初中',
  5001: '高一',
  5002: '高二',
  5003: '高三',
  6001: '初一',
  6002: '初二',
  6003: '初三',
};

mapReverse(GRADES);

const SUBJECTS = {
  6001: '语文',
  6002: '数学',
  6003: '化学',
  6004: '物理',
  6005: '英语',
  6006: '生物',
  6007: '政治',
  6008: '历史',
  6009: '地理',
  6010: '讲座',
};

mapReverse(SUBJECTS);

function getSavedSubject() {
  const subject = storage.get('pl_subject_text') || '';
  const subjectIndex = storage.get('pl_subject_index') || 0;

  return {
    subject,
    subjectIndex,
  };
}

function getSubjectName(num) {
  if (!num) {
    return '';
  }
  return subject[num][0];
}

function getSubjectShortName(num) {
  if (!num) {
    return '';
  }
  return subject[num][1];
}

function getGradeName(str) {
  if (!str) {
    return '';
  }
  str = String(str).split(',');
  if (str.length === 1) {
    return Number(str[0]) > 1000 ? grade[str[0]] : deprecatedGrade[str[0]];
  } else {
    const mergeResult = str.reduce((value, next) => {
      return value & (next < 6000 ? 1 : 2);
    }, 3); // 0 同时存在，1 高中，2 初中
    if (!mergeResult) {
      return '全年级';
    } else if (str.length === 2) {
      return str.map(value => grade[value]).join('/');
    } else {
      return ['高中', '初中'][mergeResult - 1];
    }
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
