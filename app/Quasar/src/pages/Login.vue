<template>
  <q-page class="flex flex-center text-center bg-grey">
    <template>
      <div style="width: 350px; max-width:90vw">
        <q-card>
          <q-card-section>
            <img src="~assets/logo.png" class="full-width q-mb-sm">
            <q-form class="full-width" @submit="onSubmit">
              <q-input dense class="q-mb-xs" v-model="email" name="email" type="text" outlined placeholder="Email"
                lazy-rules
                :rules="[
                  val => !!val || 'Email address is required.',
                  val => this.$core.valid.email(val) || 'Please enter a valid email address.'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="las la-envelope" />
                </template>
              </q-input>
              <q-input dense v-model="password" name="password" type="password" outlined placeholder="Password"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your password.']"
              >
                <template v-slot:prepend>
                  <q-icon name="las la-lock" />
                </template>
              </q-input>
              <div class="row">
                <q-checkbox dense v-model="remember" name="remember"  class="q-mb-xs text-grey fw-800" color="positive" label="Remeber me"/>
              </div>
              <q-btn type="submit" class="full-width bg-secondary q-mt-md" color="white" size="md" flat>Login</q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    ...mapActions('user', ['Login', 'Register', 'getUser']),
    onSubmit () {
      this.$q.loading.show()
      this.Login({
        email: this.email,
        password: this.password,
        remember: this.remember
      }).then(response => {
        console.log('Login', response)
        this.$q.loading.hide()
        this.$router.push({ name: 'Dashboard' })
      }).catch(error => {
        console.log('Login', error)
        this.$q.loading.hide()
        this.$core.error('Failed! Please try again.')
      })
    }
  },
  mounted () {
    if (this.$route.path === '/login/user') {
      this.$store.commit('user/userType', 'user')
    } else if (this.$route.path === '/login/staff') {
      this.$store.commit('user/userType', 'staff')
    } else if (this.$route.path === '/login/admin') {
      this.$store.commit('user/userType', 'admin')
    }
    console.log('role', this.$store.state.current_user)
  }
}
</script>
