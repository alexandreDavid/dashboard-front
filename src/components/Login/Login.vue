<template>
  <div class="bg-dark w-100 h-100 position-fixed">
    <div class="modal-dialog modal-sm" role="dialog">
        <div class="modal-content shadow bg-secondary">
          <div class="modal-header">
            <img src="@/assets/logo.png" style="width: 100px">
          </div>
          <div id="login-content" class="modal-body bg-white">
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
                  <form @submit.prevent="signUpCheckModal" id="signup-form">
                    <div class="form-group mb-2">
                      <label class="small" for="signup-name">Name</label>
                      <input type="text" class="form-control" v-model="name" id="signup-name" placeholder="Name" required>
                    </div>
                    <div class="form-group mb-2" v-if="!hash">
                      <label class="small" for="signup-organisation">Organisation</label>
                      <input type="text" class="form-control" v-model="organisation" id="signup-organisation" placeholder="Organisation" required>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" v-if="!hash">
                      <input type="radio" id="signup-type-government" v-model="organisationType" name="organisationType" value="organisation" class="custom-control-input" required>
                      <label class="custom-control-label" for="signup-type-government">Government</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" v-if="!hash">
                      <input type="radio" id="signup-type-other" v-model="organisationType" name="organisationType" value="other" class="custom-control-input" required>
                      <label class="custom-control-label" for="signup-type-other">Other</label>
                    </div>
                    <div class="form-group mb-2">
                      <label class="small" for="signup-position">Position</label>
                      <input type="text" class="form-control" v-model="position" id="signup-position" placeholder="Position" required>
                    </div>
                    <div class="form-group mb-2">
                      <label class="small" for="signup-email">Email</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="email-signup-addon">@</span>
                        </div>
                        <input type="email" class="form-control" id="signup-email" v-model="email" placeholder="Email" aria-label="Email" aria-describedby="email-signup-addon">
                      </div>
                    </div>
                    <div class="form-group mb-2">
                      <label class="small" for="signup-password">Password</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="password-signup-addon"><font-awesome-icon icon="lock" /></span>
                        </div>
                        <input type="password" class="form-control" id="signup-password" v-model="pass" placeholder="Password" aria-label="Password" aria-describedby="password-signup-addon">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div v-show="displayReset">
              <button class="btn btn-link" @click="displayReset = false"><font-awesome-icon icon="caret-left" /> Back to login</button>
              <form @submit.prevent="forgotPassword" id="reset-form">
                <p class="card-text"><small class="text-muted">Please enter your email address. We will send you an email to reset your password.</small></p>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="email-reset-addon">@</span>
                  </div>
                  <input type="email" class="form-control" v-model="email" placeholder="Email" aria-label="Email" aria-describedby="email-reset-addon">
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
    <license-agreement-modal v-if="showLicenseAgreement" @close="showLicenseAgreement = false" @validate="agreeLicence"></license-agreement-modal>
  </div>
</template>

<script>
import auth from '@/store/authentication'
import organisationApi from '@/api/organisation'

export default {
  props: ['error', 'hash'],
  components: {
    LicenseAgreementModal: () => ({
      component: import('@/components/Login/LicenseAgreementModal'),
      delay: 0
    })
  },
  data () {
    return {
      email: '',
      pass: '',
      name: '',
      organisation: '',
      position: '',
      organisationType: false,
      displayReset: false,
      connectTab: 'login',
      message: false,
      messageError: this.error,
      showLicenseAgreement: false
    }
  },
  async created () {
    if (this.hash) {
      this.connectTab = 'signup'
      const orga = await organisationApi.getOrganisationByHash(this.hash)
      this.organisation = orga.name
    }
    if (this.error) {
      this.messageError = this.error
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
    signUpCheckModal () {
      if (this.organisationType === 'other') {
        this.showLicenseAgreement = true
      } else {
        this.signUp()
      }
    },
    async signUp (addDateAgreement) {
      // If it's other popin
      this.messageError = false
      try {
        let metadata = {
          name: this.name,
          organisation: this.organisation,
          position: this.position
        }
        if (this.organisationType) {
          metadata.organisationType = this.organisationType
        }
        if (addDateAgreement) {
          metadata.agreementDate = new Date()
        }
        await auth.signUp(this.email, this.pass, metadata, this.hash)
        this.connectTab = 'login'
        this.message = 'You are successfully signed up. Please verify your email before logging in.'
      } catch (error) {
        this.messageError = error
      }
    },
    async forgotPassword () {
      this.messageError = false
      try {
        const callBack = await auth.forgotPassword(this.email)
        this.message = callBack
        this.displayReset = false
      } catch (error) {
        this.messageError = error
      }
    },
    agreeLicence () {
      this.showLicenseAgreement = false
      this.signUp(true)
    }
  }
}
</script>

<style lang="scss" scoped>
#login-content {
  max-height: 60vh;
  overflow: auto;
}
</style>
