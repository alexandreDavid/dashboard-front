<template>
  <div class="nav-item btn-group">
    <a class="nav-link dropdown-toggle" href="#" @click="displayDropDownMenu = true"><font-awesome-icon icon="user" /> Profile</a>
    <div class="dropdown-menu dropdown-menu-right shadow" v-bind:class="{show: displayDropDownMenu}">
      <button class="profile dropdown-item" type="button" @click="goTo('profile')">Profile</button>
      <button class="settings dropdown-item" type="button" @click="openSideBar('settings')">Settings</button>
      <button class="about dropdown-item" type="button" @click="openSideBar('about')">About</button>
      <button class="help dropdown-item" type="button" @click="openHelp">Take a tour</button>
      <a class="dropdown-item" href="mailto:support@dfms.co.uk?subject=DFMS support">Contact us</a>
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
      this.$router.push({ name: page })
      this.displayDropDownMenu = false
    },
    openSideBar (page) {
      this.$ga.event('profile', page)
      this.$emit('openSideBar', page)
      this.displayDropDownMenu = false
    },
    openHelp () {
      this.$ga.event('profile', 'help')
      this.displayDropDownMenu = false
      this.$tours['GlobalTour'].start()
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
