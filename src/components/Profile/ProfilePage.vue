<template lang="pug">
  block content
  div(class='container my-3' v-if='isLoaded')
    div(v-if="message" class='alert' :class="{'alert-danger': message.type === 'danger', 'alert-success': message.type === 'success'}") {{ message.text }}
    h4 Edit Profile
    hr
    //- div(class='row')
    //-   div(class='col-lg-4')
    //-     h5 Public Avatar
    //-     p You can change your avatar at <a href="https://gravatar.com" target="_blank">gravatar.com</a>
    //-   div(class='col-lg-8')
    //-     a(target='_blank' rel="noopener noreferrer" :href='user.picture')
    //-       img(alt="" class="avatar rounded-circle" :src='user.picture')
    //- hr
    h5 Main settings
    div(class='form-group')
      label Name <small>(required)</small>
      input(type='text' placeholder='Enter name' class='form-control' v-model='user.name' required v-bind:class="{'is-invalid': !user.name && showError}")
      div(class='invalid-feedback') Please choose a name.
    div(class='form-group')
      label Email address <small>(required)</small>
      input(type='email' placeholder='Enter email' class='form-control' v-model='user.email' required v-bind:class="{'is-invalid': !user.email && showError}")
      div(class='invalid-feedback') Please choose an email.
    div(class='form-group')
      label Position <small>(required)</small>
      input(type='text' placeholder='Enter position' class='form-control' v-model='user.position' required v-bind:class="{'is-invalid': !user.position && showError}")
      div(class='invalid-feedback') Please choose a position.
    button(class='btn btn-primary' @click='save(user)') Update profile settings
  loading(v-else)
</template>

<script>
import User from '@/api/user'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'ProfilePage',
  components: { Loading },
  data () {
    return {
      user: {},
      isLoaded: false,
      message: false,
      showError: false
    }
  },
  async created () {
    try {
      this.user = await User.getUser()
    } catch (_e) {
      this.message = {
        type: 'danger',
        text: 'Something went wrong'
      }
    }
    this.isLoaded = true
  },
  methods: {
    async save (user) {
      if (!user.name || !user.email || !user.position) {
        this.showError = true
      } else {
        this.showError = false
        try {
          this.isLoaded = false
          await User.setUser(user)
          this.message = {
            type: 'success',
            text: 'Profile was successfully updated'
          }
        } catch (_e) {
          this.message = {
            type: 'danger',
            text: 'Something went wrong'
          }
        }
        this.isLoaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 160px;
  height: 160px;
}
</style>
