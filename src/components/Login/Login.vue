<template>
  <div class="bg-dark w-100 h-100 position-fixed">
    <div class="modal-dialog modal-sm" role="dialog">
        <div class="modal-content shadow bg-secondary">
          <div class="modal-header">
            <img src="@/assets/logo.png" style="width: 100px">
          </div>
          <div class="modal-body bg-white">
            <div class="alert alert-info" v-if="message" role="alert">{{ message }}</div>
            <div v-show="!displayReset">
              <ul class="nav nav-tabs">
                <li class="nav-item" id="nav-item-connect">
                  <a class="nav-link" href="#" @click="connectTab = 'login'" v-bind:class="{'active': connectTab === 'login'}">Log In</a>
                </li>
                <li class="nav-item" id="nav-item-about">
                  <a class="nav-link" href="#" @click="connectTab = 'signup'" v-bind:class="{'active': connectTab === 'signup'}">Sign Up</a>
                </li>
              </ul>
              <div class="tab-content pt-3">
                <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': connectTab === 'login'}" id="login">
                  <form @submit.prevent="login" id="login-form">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="email-addon">@</span>
                      </div>
                      <input type="email" class="form-control" v-model="email" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="password-addon"><font-awesome-icon icon="lock" /></span>
                      </div>
                      <input type="password" class="form-control" v-model="pass" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                    </div>
                    <button type="button" class="btn btn-link" @click="displayReset = true">Don't remember your password?</button>
                  </form>
                </div>
                <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': connectTab === 'signup'}" id="signup">
                  <form @submit.prevent="signUp" id="signup-form">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="email-addon">@</span>
                      </div>
                      <input type="email" class="form-control" v-model="email" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="password-addon"><font-awesome-icon icon="lock" /></span>
                      </div>
                      <input type="password" class="form-control" v-model="pass" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div v-show="displayReset">
              <button class="btn btn-link" @click="displayReset = false"><font-awesome-icon icon="caret-left" /> Back to login</button>
              <form @submit.prevent="resetPassword" id="reset-form">
                <p class="card-text"><small class="text-muted">Please enter your email address. We will send you an email to reset your password.</small></p>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="email-addon">@</span>
                  </div>
                  <input type="email" class="form-control" v-model="email" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                </div>
              </form>
            </div>
            <div class="alert alert-danger" v-if="messageError" role="alert">{{ messageError }}</div>
          </div>
          <div class="card-footer bg-primary">
            <button v-if="!displayReset && connectTab === 'login'" type="submit" form="login-form" class="btn btn-primary btn-lg btn-block">Log In</button>
            <button v-if="!displayReset && connectTab === 'signup'" type="submit" form="signup-form" class="btn btn-primary btn-lg btn-block">Sign Up</button>
            <button v-if="displayReset" type="submit" form="reset-form" class="btn btn-primary btn-lg btn-block">Send Email</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import auth from '@/store/authentication'
export default {
  props: ['error'],
  data () {
    return {
      email: '',
      pass: '',
      displayReset: false,
      connectTab: 'login',
      message: false,
      messageError: this.error
    }
  },
  methods: {
    async login () {
      this.messageError = false
      try {
        const callBack = await auth.login(this.email, this.pass)
        this.message = callBack
      } catch (error) {
        this.messageError = error
      }
    },
    async signUp () {
      this.messageError = false
      try {
        await auth.signUp(this.email, this.pass)
        await auth.login(this.email, this.pass)
        this.connectTab = 'login'
        this.message = 'You are successfully signed up. Please verify your email before logging in.'
      } catch (error) {
        this.messageError = error
      }
    },
    async resetPassword () {
      this.messageError = false
      try {
        const callBack = await auth.resetPassword(this.email)
        this.message = callBack
        this.displayReset = false
      } catch (error) {
        this.messageError = error
      }
    }
  }
}
</script>
