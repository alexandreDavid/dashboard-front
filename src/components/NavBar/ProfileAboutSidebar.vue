<template>
  <SideBar @close="close()" position="right" class="p-2">
    <ul class="nav nav-tabs">
      <li class="nav-item" id="nav-item-settings">
        <a class="nav-link" href="#" @click="selectedTab = 'settings'" v-bind:class="{'active': selectedTab === 'settings'}">Settings</a>
      </li>
      <li class="nav-item" id="nav-item-about">
        <a class="nav-link" href="#" @click="selectedTab = 'about'" v-bind:class="{'active': selectedTab === 'about'}">About</a>
      </li>
    </ul>
    <div class="tab-content pt-3">
      <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'settings'}" id="settings">
        <Settings/>
      </div>
      <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'about'}" id="about">
        <p>DFMS, the Drought and Flood Mitigation Service, is the result of the DFMS Project, a 3-year project to create a cloud-based platform that transforms environmental data related to into information and allows professional users to access it via an online portal. The project’s primary aim was to address Uganda’s needs to mitigate the impacts of drought and floods on its society, but in doing so it also created a tool that enables improved agricultural management in a much wider sense by providing access to robust meteorological, hydrological, and other Earth Observation (based) information.</p>
        <p>DFMS was developed in cooperation with the Government of Uganda, led by the Ministry of Water and Environment, and with participation of the Uganda National Meteorological Authority; the Office of the Prime Minister; the Ministry of Agriculture, Animal Industry and Fisheries; and the National Agricultural Research Organisation. The DFMS project received funding through the UK’s International Partnership Programme, administered by the UK Space Agency. It was implemented by a consortium of UK organisations, led by the RHEA Group, including the UK Met Office, HR Wallingford, Environment Systems, Pixalytics, AgriTechTalk, and Databasix, and supported by the Uganda-based NGOs Mercy Corps and AgriTechTalk Africa.</p>
        <div class="card">
          <h5 class="card-header">Contact</h5>
          <div class="card-body">
            <p>For more information about DFMS,</p>
            <p>email <a href="mailto:info@dfms.co.uk" target="_top">info@dfms.co.uk</a></p>
            <p>or call +44 7522 456 628.</p>
          </div>
        </div>
      </div>
    </div>
  </SideBar>
</template>

<script>
import Settings from '@/components/Settings/Settings'
import Authentication from '@/store/authentication'
import SideBar from '@/components/SideBar/SideBar'

export default {
  name: 'ProfileAboutSidebar',
  components: {Settings, SideBar},
  props: {
    tab2Display: {
      type: String,
      default: 'settings'
    }
  },
  data () {
    return {
      selectedTab: this.tab2Display
    }
  },
  methods: {
    logout () {
      Authentication.logout()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
