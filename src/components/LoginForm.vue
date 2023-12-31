<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_message }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submissions"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 my-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:8|max:30'
      },
      login_in_submissions: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'Please wait...'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      ;(this.login_in_submissions = true),
        (this.login_show_alert = true),
        (this.login_alert_variant = 'bg-blue-500'),
        (this.login_alert_message = 'Please wait...')
      try {
        await this.authenticate(values)
      } catch (error) {
        this.login_in_submissions = false
        this.login_alert_variant = 'bg-red-500'
        this.login_alert_message = 'Invalid login details'
        return
      }
      ;(this.login_alert_variant = 'bg-green-500'),
        (this.login_alert_message = 'Login successful'),
        window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped></style>
