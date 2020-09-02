<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('user', ['currentUser']),
    ...mapActions('app', ['errorDialog']),
    onReady () {
      this.$q.loading.show()
      this.currentUser().then(response => {
        this.$q.loading.hide()
      }).catch(() => {
        this.$q.loading.hide()
        // this.$router.push({ name: 'Login' })
      })
    }
  },
  mounted () {
    if (navigator.onLine) {
      this.onReady()
    } else {
      this.errorDialog({
        title: 'Confirm',
        message: 'Please check your internet connection and try again.'
      })
    }
  }
}
</script>
