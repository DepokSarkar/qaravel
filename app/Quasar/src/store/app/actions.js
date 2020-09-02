import router from '../../router/index'
import { Dialog } from 'quasar'

function errorDialog ({ store }, playload) {
  Dialog.create({
    title: playload.title,
    message: playload.message,
    persistent: true
  }).onOk(() => {
    router({ store }).go()
  })
}

export {
  errorDialog
}
