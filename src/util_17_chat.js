import { getRichStrLength } from './util_10_lang';

/**
 * @memberof module:tencent/imutils
 */
const msgTools = {
  FONT_LIMIT: 200,
  faceReplace: function () {
    const faceMap = [
      5199, 5186, 5187, 5188, 5189, 5190, 5191, 5192, 5193, 5194, 5195, 5196, 5197, 5198,
      5185, 5235, 5236, 5281, 5238, 5239, 5258, 5259, 5260, 5261, 5262, 5263, 5240, 5241,
      5242, 5243, 5264, 5265, 5266, 5267, 5268, 5269, 5270, 5271, 5272, 5273, 5282, 5283,
      5284, 5285, 5286, 5287, 5288, 5289, 5290, 5291, 5292, 5293, 5294, 5295, 5296, 5297,
      5217, 5298, 5299, 5300, 5248, 5249, 5244, 5218, 5219, 5301, 5221, 5222, 5223, 5276,
      5277, 5278, 5214, 5302, 5257, 5230, 5227, 5224, 5247, 5231, 5232, 5256, 5280, 5303,
      5304, 5305, 5306, 5307, 5308, 5309, 5212, 5206, 5208, 5210, 5211, 5310, 5311, 5312,
      5313, 5314, 5315, 5316, 5317, 5318, 5319];
    const faceWord = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴',
                      '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷',
                      '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困',
                      '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕',
                      '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了',
                      '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险',
                      '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡',
                      '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电',
                      '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱',
                      '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你',
                      'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头',
                      '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'];
    const mapCache = {};
    return {
      faceWord,
      /**
       * 根据客户端的code，返回web端的code
       * @ignore
       * @function
       * @param  {number} code [description]
       * @return {string}      [description]
       */
      getWebFaceCode: function (code) {
        if (mapCache[code] === undefined) {
          for (let i = 0, j = faceMap.length; i < j; i++) {
            if (code === faceMap[i]) {
              mapCache[code] = i;
              return i;
            }
          }
        }
        return mapCache[code];
      },
      /**
       * @ignore
       * @function
       * 根据web端的code，返回客户端的code
       * @param  {number} code [description]
       * @return {string}      [description]
       */
      getClientFaceCode: function (code) {
        return faceMap[code];
      },
    };
  }(),

  checkMsg: function (msg, dialogFun) {
    switch (msg.warn) {
      case 1:
        // 提示发送内容超长
        // dialogFun(true, {
        //     content: '发送的内容超出长度限制',
        //     hideCancelBtn: true
        // });
        break;
      default:
        return true;
    }
    return false;
  },

  htmldecode: function (s) {
    const div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
  },

  // 沿用web课堂的发送消息格式化逻辑
  createMsg: function (msg, nickName) {
    if (!msg) {
      return '';
    }
    const self = this;
    const obj = {
      msg_rich_text: {
        rpt_msg_elems: [],
      },
    };
    const elems = obj.msg_rich_text.rpt_msg_elems;
    let msgStr = '';
    // 这么多正则，我的是心是慌的
    msg.replace(/<\/div>|<\/span>/g, '')
       .replace(/<div[^>]+>|<span[^>]+>/g, '')
       .replace(/<div>|<span>|<br>/g, '\r')
       .replace(/(<img [^>]*src=['"]([^'"]+)[^>]*>|([^<>]*))/gi, function (all, a, url) {
         if (url) {
           const faceCode = url.match(/\/\/9\.url\.cn\/fudao\/pc\/components\/Faces\/nohash\/emoji\/(\d+?)\@2x.gif/);
           // faceCode有值，是表情
           if (faceCode) {
             elems.push({
               msg_face: {
                 uint32_index: self.faceReplace.getClientFaceCode(~~faceCode[1]),
                 bytes_buf: '',
               },
               uint32_elem_type: 2,
             });
             return '';
           }
         }
         // 普通字符串
         if (all) {
           elems.push({
             msg_text: {
               bytes_attr_6_buf: '',
               bytes_buf: '',
               bytes_str: self.htmldecode(all),
             },
             uint32_elem_type: 1,
           });
           msgStr = all;
         }
         return all;
       });

    // 文字超过上限
    if (getRichStrLength(msgStr) > msgTools.FONT_LIMIT) {
      return { warn: 1 };
    }

    elems.push({
      msg_add_info: {
        str_nick_name: nickName,
      },
      // 传18才会使用nick_name显示名字
      uint32_elem_type: 18,
    });

    // return JSON.stringify(obj);
    return obj;
  },
};


export {
  msgTools,
};
