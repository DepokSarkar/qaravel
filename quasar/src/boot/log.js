
export default () => {
  window.console = (function (origConsole) {
    if (!window.console || !origConsole) {
      origConsole = {}
    }

    var isDebug = process.env.DEV, isSaveLog = false,
      logArray = {
        logs: [],
        errors: [],
        warns: [],
        infos: []
      }

    return {
      core: function () {
        this.addLog(arguments, 'core')
        Array.prototype.unshift.call(arguments, '[Core]')
        origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      log: function () {
        this.addLog(arguments, 'logs')
        Array.prototype.unshift.call(arguments, '[Debug]')
        isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments)
      },
      warn: function () {
        this.addLog(arguments, 'warns')
        Array.prototype.unshift.call(arguments, '[Warn]')
        isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments)
      },
      error: function () {
        this.addLog(arguments, 'errors')
        Array.prototype.unshift.call(arguments, '[Error]')
        isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments)
      },
      info: function (v) {
        this.addLog(arguments, 'infos')
        Array.prototype.unshift.call(arguments, '[Info]')
        isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments)
      },
      debug: function (bool) {
        isDebug = bool
      },
      saveLog: function (bool) {
        isSaveLog = bool
      },
      addLog: function (args, array) {
        if (!isSaveLog) {
          return
        }
        logArray[array || 'logs'].push(args)
      },
      logArray: function () {
        return logArray
      }
    }
  }(window.console))
}
