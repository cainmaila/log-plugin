# log-plugin

## log-plugin用途

輸出Nodejs的log，並且同步紀錄log文件

本掛件相依[log4js](https://www.npmjs.com/package/log4js)

## 基本用法
```javascript
var logPlugin = require('log-plugin')
logPlugin.init()
var log = logPlugin.getLog()

//輸出log到螢幕，並且建立log檔案到專案中的logs資料夾
log('write log to logs Folder!!')

```

輸出紀錄於專案中的logs資料夾

## 定義不同的log檔案與紀錄層級

log可以依照意義別輸出，或個別輸出到不同的log記錄檔

```javascript
var logPlugin = require('log-plugin')

//定義輸出檔案區塊
logPlugin.init(['app1', 'app2', 'app3'])

//定義每區塊需要輸出的層級
logPlugin.setLogLv('app1', 'all')
logPlugin.setLogLv('app2', 'info')
logPlugin.setLogLv('app3', 'error')

//輸出到 logs/app1
var app1_log = logPlugin.getLog('app1')
var app1_info = logPlugin.getInfo('app1')
var app1_error = logPlugin.getError('app1')

app1_log('O')
app1_info('O')
app1_error('O')

//輸出到 logs/app2
var app2_log = logPlugin.getLog('app2')
var app2_info = logPlugin.getInfo('app2')
var app2_error = logPlugin.getError('app2')

app2_log('X') //低於app2定義的層級，所以不會被記錄在log
app2_info('O')
app2_error('O')

//輸出到 logs/app3
var app3_log = logPlugin.getLog('app3')
var app3_info = logPlugin.getInfo('app3')
var app3_error = logPlugin.getError('app3')

app3_log('X') //低於app3定義的層級，所以不會被記錄在log
app3_info('X') //低於app3定義的層級，所以不會被記錄在log
app3_error('O')
```

## 優先級別對應

| 類別 | 對應取得實體方法 | 優先層級 |
| ------| ------ | ------ |
| all | | -1 |
| trace | logPlugin.getLog | 0 |
| debug | logPlugin.getDebug | 1 |
| info | logPlugin.getInfo | 2 |
| warn | logPlugin.getWarn | 3 |
| error | logPlugin.getError | 4 |
| fatal | logPlugin.getFatal | 5 |

例如設定 info 級別，trace 與 debug 級別均不會被記錄

## 注意事項

一個專案中 logPlugin.init() 是一個全域方法只需要建立一次實體即可。

例如你的入口檔案 app.js 已經作了以下
```javascript
var logPlugin = require('log-plugin')
logPlugin.init(['app', 'other'])
logPlugin.setLogLv('app','all')
var log = logPlugin.getLog('app')
log('app output to log!!')
```

當另外一隻 js 需要使用
```javascript
var logPlugin = require('log-plugin')
//這裡不需要再 logPlugin.init
logPlugin.setLogLv('other','info')
var log = logPlugin.getLog('other')
log('other output to log!!')
```