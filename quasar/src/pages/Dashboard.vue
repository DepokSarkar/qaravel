<template>
  <q-page padding>
    <div class="text-h4">Welcome to Dashboard</div>
    <q-btn :to="{name: 'Home'}" class="q-ml-xl text-orange" flat no-caps>Home</q-btn>
    <q-btn :to="{name: 'Dashboard'}" class="q-ml-xl text-orange" flat no-caps>Dashboard</q-btn>
    <q-btn :to="{name: 'Page1'}" class="q-ml-xl text-orange" flat no-caps>Page1</q-btn>
    <q-btn :to="{name: 'Page2'}" class="q-ml-xl text-orange" flat no-caps>Page2</q-btn>
  </q-page>
</template>

<script>
export default {
  created () {
    if (this.$route.params.denyed) {
      this.$core.error('You haven\'t permission to access this page.')
    }
  }
}
</script>
