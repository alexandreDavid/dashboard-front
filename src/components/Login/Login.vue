<template>
    <form @submit.prevent="login" class="form-signin">
      <img src="@/assets/dfms_icon.png" class="mb-4">
      <h2 class="h3 mb-3 font-weight-normal">Sign in</h2>
      <label for="inputEmail" class="sr-only"></label><input class="form-control" id="inputEmail" type="email" v-model="email" placeholder="email">
      <label for="inputPassword" class="sr-only"></label><input class="form-control" id="inputPassword" type="password" v-model="pass" placeholder="password">
      <button type="submit" class="btn btn-lg btn-primary btn-block">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
</template>

<script>
  import auth from '@/store/authentication'
  export default {
    data () {
      return {
        email: 'joe@example.com',
        pass: '',
        error: false
      }
    },
    methods: {
      login () {
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      }
    }
  }
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
