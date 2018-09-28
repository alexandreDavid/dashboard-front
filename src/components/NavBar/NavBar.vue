<template>
  <div class="flex-shrink-1 order-sm-1 order-3 sticky-top shadow">
    <nav class="navbar navbar-light navbar-expand bg-light d-none d-sm-flex">
      <a class="navbar-brand" href="#"><img src="@/assets/logo.png" style="height: 36px;"></a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="(navItem, key) in leftNav(navItems)" :key="key" v-bind:class="{active: navItem.id === activeNavItem}" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(navItem, key) in rightNav(navItems)" :key="key" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
    </nav>
    <nav class="navbar navbar-light navbar-expand bg-light d-sm-none shadow-top">
      <ul class="navbar-nav d-flex w-100 text-center">
        <li class="nav-item flex-fill" v-for="(navItem, key) in smNav(navItems)" :key="key" v-bind:class="{active: navItem.id === activeNavItem}" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /></a>
        </li>
      </ul>
    </nav>
    <ProfileAboutSidebar v-if="showSidebar" @close="showSidebar = false" v-bind:tab2Display="sideBarTab">
    </ProfileAboutSidebar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {
    ProfileAboutSidebar: () => import('./ProfileAboutSidebar')
  },
  data () {
    let self = this
    return {
      navItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          click () {
            self.goTo(this.id)
          },
          icon: 'tachometer-alt'
        }, {
          id: 'map',
          label: 'Map',
          click () {
            self.goTo(this.id)
          },
          icon: 'map'
        // }, {
        //   id: 'graph',
        //   label: 'Graph',
        //   click () {
        //     self.goTo(this.id)
        //   },
        //   icon: faChartBar
        }, {
          id: 'historical',
          label: 'Historical',
          click () {
            self.goTo(this.id)
          },
          icon: 'history'
        }, {
          id: 'future-climate',
          label: 'Future climate',
          click () {
            self.goTo(this.id)
          },
          icon: 'forward'
        }, {
          id: 'about',
          label: 'About',
          click () {
            self.openSideBar(this.id)
          },
          icon: 'info-circle',
          right: true,
          hideOnSm: true
        }, {
          id: 'profile',
          label: 'Profile',
          click () {
            self.openSideBar(this.id)
          },
          icon: 'user',
          right: true
        }
      ],
      showSidebar: false,
      sideBarTab: '',
      activeNavItem: this.$router.currentRoute && this.$router.currentRoute.name
    }
  },
  watch: {
    $route (to) {
      this.activeNavItem = to.name
    }
  },
  methods: {
    goTo (page) {
      this.$router.push({ name: page })
    },
    leftNav (navs) {
      return navs.filter(v => !v.right)
    },
    rightNav (navs) {
      return navs.filter(v => v.right)
    },
    smNav (navs) {
      return navs.filter(v => !v.hideOnSm)
    },
    openSideBar (sideBarTab) {
      this.sideBarTab = sideBarTab
      this.showSidebar = true
    }
  }
}
</script>
