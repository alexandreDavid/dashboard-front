<template>
  <div class="flex-shrink-1 order-sm-1 order-3 sticky-top shadow">
    <nav class="navbar navbar-light navbar-expand bg-light d-none d-sm-flex">
      <a class="navbar-brand" href="#"><img src="@/assets/logo.png" style="height: 36px;"></a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="(navItem, key) in leftNav(navItems)" :key="key" v-bind:class="{active: navItem.id === $router.currentRoute.name}">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(navItem, key) in rightNav(navItems)" :key="key">
          <a class="nav-link" href="#" @click="navItem.click()"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
    </nav>
    <nav class="navbar navbar-light navbar-expand bg-light d-sm-none shadow-top">
      <ul class="navbar-nav d-flex w-100 text-center">
        <li class="nav-item flex-fill" v-for="(navItem, key) in smNav(navItems)" :key="key" v-bind:class="{active: navItem.id === $router.currentRoute.name}">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /></a>
        </li>
      </ul>
    </nav>
    <SideBar v-if="showSidebar" @close="showSidebar = false" position="right" class="p-2">
      <ManagingSidebarContent v-bind:tab2Display="sideBarTab"/>
    </SideBar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTachometerAlt from '@fortawesome/fontawesome-free-solid/faTachometerAlt'
import faMap from '@fortawesome/fontawesome-free-solid/faMap'
import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'

export default {
  name: 'NavBar',
  components: {
    FontAwesomeIcon,
    SideBar: () => import('@/components/SideBar/SideBar'),
    ManagingSidebarContent: () => import('./ManagingSidebarContent')
  },
  data() {
    let self = this
    return {
      navItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          disabled: true,
          click() {
            self.goTo(this.id)
          },
          icon: faTachometerAlt
        }, {
          id: 'map',
          label: 'Map',
          click() {
            self.goTo(this.id)
          },
          icon: faMap
        }, {
          id: 'graph',
          label: 'Graph',
          disabled: true,
          click() {
            self.goTo(this.id)
          },
          icon: faChartBar
        }, {
          id: 'about',
          label: 'About',
          click() {
            self.openSideBar(this.id)
          },
          icon: faInfoCircle,
          right: true,
          hideOnSm: true
        }, {
          id: 'profile',
          label: 'Profile',
          click() {
            self.openSideBar(this.id)
          },
          icon: faUser,
          right: true
        }
      ],
      showSidebar: false,
      sideBarTab: ''
    }
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page })
    },
    leftNav(navs) {
      return navs.filter(v => !v.right)
    },
    rightNav: function (navs) {
      return navs.filter(v => v.right)
    },
    smNav: function (navs) {
      return navs.filter(v => !v.hideOnSm)
    },
    openSideBar(sideBarTab) {
      this.sideBarTab = sideBarTab
      this.showSidebar = true
    }
  }
}
</script>
