import { version } from '../../package.json'
import { date } from 'quasar'

export default {
  app: {
    v: version
  },
  error (message) {
    this.Vue.$q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: message,
      icon: 'report_problem'
    })
  },
  b64toBlob (b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, {
      type: contentType
    })
    return blob
  },
  getBlobURL (data) {
    const blob = this.b64toBlob(data, 'text/plain')
    const url = URL.createObjectURL(blob)
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
    return url
  },
  getDate (d) {
    if (d && typeof d === 'string') {
      if (d.indexOf('-') !== -1) {
        d = date.extractDate(d, 'YYYY-MM-DD')
      } else if (d.indexOf('/') !== -1) {
        d = date.extractDate(d, 'DD/MM/YYYY')
      }
    } else if (!d || typeof d === 'string') {
      d = new Date()
    }

    return d
  },
  cookie (key, value, days) {
    var obj = typeof key === 'object' ? key : {
      key,
      value,
      days
    }
    if (typeof obj.value === 'undefined') {
      var keyValue = document.cookie.match('(^|;) ?' + obj.key + '=([^;]*)(;|$)')
      return keyValue ? keyValue[2] : null
    } else {
      var expires = new Date()
      if (obj.value === null) {
        obj.days = -10000
      } else {
        obj.days = expires.getTime() + (isNaN(obj.days) ? 10 : obj.days) * 24 * 60 * 60 * 1000
      }
      expires.setTime(obj.days)
      document.cookie = obj.key + '=' + obj.value + ';expires=' + expires.toUTCString() + ';path=/'
    }
  },
  formatDate (d, type) {
    var format = 'DD/MM/YYYY'

    switch (type) {
      case 'sql':
        format = 'YYYY-MM-DD'
        break
    }
    if (d && typeof d === 'string') {
      d = this.getDate(d)
    }
    if (typeof d.getMonth === 'function') {
      d = date.formatDate(d, format)
    }

    return d
  },
  length (obj, o) {
    var len = 0
    if (obj && typeof obj.length === 'undefined') {
      Object.keys(obj).forEach(function (key) {
        len++
      })
    } else if (obj) {
      len = obj.length
    }
    return len
  },
  sort (arr, field, dir) {
    console.log('core.sort()', arguments)
    if (dir) {
      return arr.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
    } else {
      return arr.sort((a, b) => (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0))
    }
  },
  valid: {
    email: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
