<template lang="pug">
  block content
  div(class='container my-3')
    div(v-if="message" class='alert' :class="{'alert-danger': message.type === 'danger', 'alert-success': message.type === 'success'}") {{ message.text }}
    h4 Password
    hr
    div(class='form-group')
      label Current password <small>(required)</small>
      input(type='password' class='form-control' v-model='current' v-bind:class="{'is-invalid': !current && showError}")
      div(:class="!current && showError ? 'invalid-feedback' : 'text-muted small'") You must provide your current password in order to change it.
    div(class='form-group')
      label New password <small>(required)</small>
      input(type='password' class='form-control' v-model='password' v-bind:class="{'is-invalid': !password && showError}")
      div(class='invalid-feedback') Please provide a new password.
    div(class='form-group')
      label Password confirmation <small>(required)</small>
      input(type='password' class='form-control' v-model='passwordConfirmation' v-bind:class="{'is-invalid': !passwordConfirmation && showError}")
      div(class='invalid-feedback') Please confirm the new password.
    button(class='btn btn-primary mr-2' @click='save(current, password, passwordConfirmation)' :disabled='!isLoaded') Save password
    button(class='btn btn-link' @click='forgotPassword' :disabled='!isLoaded') I forgot my password
</template>

<script>
import auth from '@/store/authentication'

export default {
  data () {
    return {
      current: '',
      password: '',
      passwordConfirmation: '',
      message: false,
      isLoaded: true,
      showError: false
    }
  },
  methods: {
    async save (current, password, passwordConfirmation) {
      if (!current || !password || !passwordConfirmation) {
        this.showError = true
      } else {
        this.showError = false
        try {
          this.isLoaded = false
          await auth.changePassword(current, password, passwordConfirmation)
          this.message = {
            type: 'success',
            text: 'Password was successfully updated'
          }
        } catch (e) {
          this.message = {
            type: 'danger',
            text: e
          }
        }
        this.isLoaded = true
      }
    },
    async forgotPassword () {
      this.messageError = false
      try {
        await auth.forgotPassword()
        this.message = {
          type: 'success',
          text: 'We sent you an email with reset password instructions.'
        }
      } catch (e) {
        this.message = {
          type: 'danger',
          text: e
        }
      }
    }
  }
}
</script>
