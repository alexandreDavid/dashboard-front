<template>
  <div id="ManagingSidebarContent">
    <div class="card">
      <h5 class="card-header">Settings</h5>
      <Settings/>
    </div>
    <button @click="logout()" class="btn btn-secondary mt-2">Logout</button>
  </div>
</template>

<script>
import Settings from '@/components/Settings/Settings'
import Authentication from '@/store/authentication'

export default {
  name: 'ManagingSidebarContent',
  components: {Settings},
  methods: {
    logout() {
      Authentication.logout()
    }
  }
}
</script>
