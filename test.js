var logPlugin = require('./dist/log-plugin.min.js')

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
