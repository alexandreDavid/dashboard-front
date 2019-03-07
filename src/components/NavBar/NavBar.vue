<template>
<div class="flex-shrink-1 order-sm-1 order-3 d-print-none">
  <div class="sticky-top shadow">
    <nav class="navbar navbar-dark bg-dark navbar-expand bg-light d-none d-sm-flex">
      <a class="navbar-brand p-0" href="#"><img src="@/assets/logo.png" style="height: 40px;"></a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="(navItem, key) in leftNav(navItems)" :key="key" v-bind:class="{active: navItem.id === activeNavItem}" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(navItem, key) in rightNav(navItems)" :key="key" v-bind:class="{active: navItem.id === activeNavItem}" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /> {{navItem.label}}</a>
        </li>
      </ul>
      <ProfileList class="navbar-nav" @openSideBar="openSideBar"></ProfileList>
    </nav>
    <nav class="navbar navbar-dark bg-dark navbar-expand bg-light d-sm-none shadow-top">
      <ul class="navbar-nav d-flex w-100 text-center">
        <li class="nav-item flex-fill" v-for="(navItem, key) in smNav(navItems)" :key="key" v-bind:class="{active: navItem.id === activeNavItem}" :id="'nav-'+ navItem.id">
          <a class="nav-link" href="#" @click="navItem.click()" :class="{disabled: navItem.disabled}"><font-awesome-icon :icon="navItem.icon" /></a>
        </li>
      </ul>
    </nav>
    <ProfileAboutSidebar v-if="showSidebar" @close="showSidebar = false" v-bind:tab2Display="sideBarTab">
    </ProfileAboutSidebar>
  </div>
  <questionnaire-modal v-if="showQuestionnaireModal" @close="showQuestionnaireModal = false"></questionnaire-modal>
  <support-modal v-if="showSupportModal" @close="showSupportModal = false"></support-modal>
</div>
</template>

<script>
import ProfileList from '@/components/NavBar/ProfileList'
import QuestionnaireModal from '@/components/Questionnaire/QuestionnaireModal'
import SupportModal from '@/components/Support/SupportModal'
export default {
  name: 'NavBar',
  components: {
    ProfileAboutSidebar: () => import('./ProfileAboutSidebar'),
    QuestionnaireModal,
    SupportModal,
    ProfileList
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
        // }, {
        //   id: 'future-climate',
        //   label: 'Future climate',
        //   click () {
        //     self.goTo(this.id)
        //   },
        //   icon: 'forward'
        }, {
          id: 'questionnaire',
          label: 'Questionnaire',
          click () {
            self.showQuestionnaireModal = true
          },
          right: true,
          icon: 'poll-h'
        }, {
          id: 'support',
          label: 'Support',
          click () {
            self.showSupportModal = true
          },
          right: true,
          icon: 'phone'
        }
      ],
      showSidebar: false,
      showSupportModal: false,
      showQuestionnaireModal: false,
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
