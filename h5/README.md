#1. H5 相关


## openApp
【描述】：跳转到辅导app
【参数】： 

||参数名称||参数类型||是否必须||说明||
||app的id对象 ||`object` ||是 ||辅导目前写死的id{id: 3008} ||
【返回】：无 
【demo】：
```
 openApp({id: 3008});
```
## openAppPage
【描述】：跳转到辅导app中的native页面
【参数】： 

||参数名称||参数类型||是否必须||说明||
||page ||`string` ||是 || 对应文档对应页面[openpage](https://docs.google.com/spreadsheets/d/1FTpqbyv76rDOhnaDkLnIKBPGMKobjzSOkTyUmm-dhTo/edit)的后面||
||params || `object`||否||参数为[openpage](https://docs.google.com/spreadsheets/d/1FTpqbyv76rDOhnaDkLnIKBPGMKobjzSOkTyUmm-dhTo/edit#gid=0) `query`所对应的`object` ||

【返回】：无 
【demo】：
```
// 例如:
// 找课页链接：tencentk12://openpage/react?modulename=index
// 这时候需要传的参数为：
openAppPage('react', { modulename: 'index' })
```
## isAppInstalled 
【描述】：检查辅导app是否已安装
【参数】： 

||参数名称||参数类型||是否必须||说明||
||回调函数 ||`function（boolean）` ||是 ||boolean的`true` or `false`表示callback的参数||
【返回】：true or false作为callback的参数
【demo】：
```
isAppInstalled(b => {
    if(b) {
         this.setState({
              code: 1
          });
     } else {
          this.setState({
               code: 2
          });
      }
 });
```
## jumpToNativePage
【描述】：在辅导app打开一个用h5写的webview页面
【参数】： 
||参数名称||参数类型||是否必须||说明||
||url||`url` ||是 ||页面对应的url ||
【返回】：无 
【demo】：
```
let url = `${location.protocol}//fudao.qq.com/class_score_desc.html?_bid=2379&is_get_system=1&course_id=${cid}`;
jumpToNativePage(url);
```
## callBussinessQQ
【描述】：唤起指定QQ的聊天窗口
【参数】： 
||参数名称||参数类型||是否必须||说明||
||qq号码||`Number` ||是 || ||
【返回】：无 
【demo】：
```
callBussinessQQ(serviceQQ);
```
## getIOSVersion
【描述】：得到ios的版本信息
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：返回ios的版本信息
【demo】：
```
var iosVersion = parseInt(getIOSVersion(), 10);
```
## addPageShowListener
【描述】：给页面添加监听事件，监听当前webview页面是否处于激活的状态
【参数】： 
||参数名称||参数类型||是否必须||说明||
||回调函数||`Function`||是 ||监听到激活之后调用的函数 ||
【返回】：无
【demo】：
```
utils.addPageShowListener(() => this.getData(param));
```

## versionfunegt
【描述】：对比版本号
【参数】： 
||参数名称||参数类型||是否必须||说明||
||ver1||`String`||是 || ||
||ver2||`String`||是 || ||
【返回】：true or false 当第一个大于第二个版本的时候，返回true
【demo】：
```
 if (utils.versionfunegt(wxVersion, '6.5.6')) {}
```

##  isFudaoApp
【描述】：判断目前是否是在app内部
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：true or false 
【demo】：
```
// 如果是辅导app...
 if(utils.isFudaoApp()) {}
```
#2. 环境类

##isWX
【描述】：判断目前平台是否是微信
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：true or false 
【demo】：
```
isWX()
```

##isMQQ

【描述】：判断目前平台是否是手Q
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：true or false 
【demo】：
```
isMQQ()
```

## getPlatForm, getTerminal
【描述】：根据userAgent返回当前的平台：安卓，ios，pc或者h5
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：'ios','android','pc','h5'
【demo】：
```
getPlatForm()
```

## getAppVersion
【描述】：获得当前app的版本号
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：对应的版本号
【demo】：
```
getAppVersion()
```
## isIphoneX
【描述】：当前是否是IphoneX
【参数】： 
||参数名称||参数类型||是否必须||说明||
||无|||| || ||
【返回】：true or false 
【demo】：
```
isIphoneX()
```


 
