<template>
  <SideBar @close="close()" position="right" class="p-2">
    <ul class="nav nav-tabs">
      <li class="nav-item" id="nav-item-profile">
        <a class="nav-link" href="#" @click="selectedTab = 'profile'" v-bind:class="{'active': selectedTab === 'profile'}">Profile</a>
      </li>
      <li class="nav-item" id="nav-item-about">
        <a class="nav-link" href="#" @click="selectedTab = 'about'" v-bind:class="{'active': selectedTab === 'about'}">About</a>
      </li>
    </ul>
    <div class="tab-content pt-3">
      <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'profile'}" id="profile">
        <h5>Settings</h5>
        <Settings/>
        <button @click="logout()" id="user-logout" class="btn btn-secondary">Logout</button>
      </div>
      <div role="tabpanel" class="tab-pane fade" v-bind:class="{'active show': selectedTab === 'about'}" id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p>
        <p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.</p>
        <p>Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.</p>
        <div class="card">
          <h5 class="card-header">Contact</h5>
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
      default: 'profile'
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
