<template>
  <div class="h-100">
    <div class="d-flex h-100">
      <div class="nav-sidebar bg-light border-right">
        <div class="list-group list-group-flush">
          <a href="#/profile" class="list-group-item list-group-item-action d-flex align-items-center">
            <font-awesome-layers class="fa-2x mr-2">
              <font-awesome-icon icon="circle" class="text-white" />
              <font-awesome-icon icon="user" transform="shrink-6" />
            </font-awesome-layers>
            <b>User Settings</b>
          </a>
          <a class="list-group-item list-group-item-action" v-for="route in routes" :key="route.name" :href="route.href" :class="{active: $router.currentRoute.name === route.name}">
            <font-awesome-icon :icon="route.icon" class="mr-2" /> {{ route.label }}
          </a>
        </div>
      </div>
      <div class="flex-grow-1 h-100 position-relative p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProfileNav',
  data () {
    return {
      routes: [
        {
          name: 'profile',
          href: '#/profile',
          label: 'Profile',
          icon: 'user-circle'
        },
        {
          name: 'account',
          href: '#/profile/account',
          label: 'Account',
          icon: 'user-cog'
        },
        {
          name: 'password',
          href: '#/profile/password',
          label: 'Password',
          icon: 'lock'
        },
        {
          name: 'settings',
          href: '#/profile/settings',
          label: 'Settings',
          icon: 'cog'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-sidebar {
  width: 220px;
}
</style>
