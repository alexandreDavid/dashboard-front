<template>
  <div class="nav-item btn-group">
    <a class="nav-link dropdown-toggle" href="#" @click="displayDropDownMenu = true"><font-awesome-icon icon="user" /> Profile</a>
    <div class="dropdown-menu dropdown-menu-right shadow" v-bind:class="{show: displayDropDownMenu}">
      <button class="settings dropdown-item" type="button" @click="goTo('settings')">Settings</button>
      <button class="about dropdown-item" type="button" @click="goTo('about')">About</button>
      <button class="help dropdown-item" type="button" @click="openHelp">Help</button>
      <div class="dropdown-divider"></div>
      <button class="sign-out dropdown-item" type="button" @click="logout">Sign out</button>
    </div>
  </div>
</template>

<script>
import Authentication from '@/store/authentication'

export default {
  name: 'ProfileList',
  data () {
    return {
      displayDropDownMenu: false
    }
  },
  methods: {
    goTo (page) {
      this.$ga.event('profile', page)
      this.$emit('openSideBar', page)
      this.displayDropDownMenu = false
    },
    openHelp () {
      this.$ga.event('profile', 'help')
      this.displayDropDownMenu = false
      this.$router.push({ name: 'map' })
      this.$tours['MapTour'].start()
    },
    logout () {
      this.$ga.event('profile', 'logout')
      Authentication.logout()
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.displayDropDownMenu = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
