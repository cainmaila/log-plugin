/**
 * @file
 * 輸出Nodejs的log，並且同步輸出log檔案
 */

//     __                        __            _
//    / /___  ____ _      ____  / /_  ______ _(_)___
//   / / __ \/ __ `/_____/ __ \/ / / / / __ `/ / __ \
//  / / /_/ / /_/ /_____/ /_/ / / /_/ / /_/ / / / / /
// /_/\____/\__, /     / .___/_/\__,_/\__, /_/_/ /_/
//         /____/     /_/            /____/

/**
 * Log輸出掛件
 * @namespace LogPlugin
 * @type {Object}
 */
const log4js = require('log4js')
const logLv = process.env.NODE_ENV === 'production' ? 'info' : 'all'
export default {
    /**
     * 初始化
     * @memberof LogPlugin
     * @param  {Array}  [logList] 命名陣列
     */
    init(logList = ['log']) {
            const config = {
                appenders: [{
                    type: 'console'
                }, ],
            }
            logList.map((key) => {
                config.appenders.push({
                    type: 'file',
                    filename: 'logs/' + key,
                    maxLogSize: 20480,
                    backups: 3,
                    category: key,
                })
            })
            log4js.configure(config)
            this.setLogLv()
        },
        /**
         * 定義輸出標準
         * @memberof LogPlugin
         * @param {String} [log=log]   命名陣列陣列中的字串
         * @param {String} [lv=info]   輸出等級 trace debug info warn error fatal
         */
        setLogLv(log, lv) {
            log = log ? log : 'log'
            lv = lv ? lv : logLv
            this[log] = log4js.getLogger(log)
            this[log].setLevel(lv)
        },
        /**
         * trace輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.trace方法
         */
        getLog(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.trace.bind(logger)
        },
        /**
         * debug輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.debug方法
         */
        getDebug(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.debug.bind(logger)
        },
        /**
         * info輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.info方法
         */
        getInfo(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.info.bind(logger)
        },
        /**
         * warn輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.warn方法
         */
        getWarn(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.warn.bind(logger)
        },
        /**
         * error輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.error方法
         */
        getError(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.error.bind(logger)
        },
        /**
         * fatal輸出物件
         * @memberof LogPlugin
         * @param  {String} [log=log]   命名陣列陣列中的字串
         * @return {Function}           logger.fatal方法
         */
        getFatal(log) {
            log = log ? log : 'log'
            const logger = this[log]
            return logger.fatal.bind(logger)
        },
}
