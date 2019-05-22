<template>
  <div id="admin-page">
    <div class="container my-3" v-if="isLoaded">
      <h4>Organisation administration</h4>
      <hr>
      <div class="form-group">
        <h5 class="strong">Name</h5>
        <editable-input v-model="organisation.name" @input="saveName" placeholder="Name" required></editable-input>
      </div>
      <hr>
      <h5>Users</h5>
      <div v-if="isSuperAdmin" class="mb-2">
        <button class="btn btn-secondary" @click="exportAllUsers">Export all users</button>
      </div>
      <div class="alert alert-primary" role="alert">
        <h6>Invite users</h6>
        <div class="form-group">
          Everyone with the link can create an account in your organisation.
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" :value="link" aria-describedby="link" disabled>
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click="copyToClipboard(link)" title="Copy URL to clipboard" readonly><font-awesome-icon icon="copy" /></button>
          </div>
        </div>
      </div>
      <h6>Existing users</h6>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.position}}</td>
            <td>{{user.role}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import EditableInput from '@/components/EditableField/EditableInput'
import Loading from '@/components/Loading/Loading'

import { Organisation, User, Users } from '@/api'

export default {
  name: 'AdminPage',
  components: {
    EditableInput, Loading
  },
  data () {
    return {
      organisation: {},
      users: [],
      link: false,
      isLoaded: false,
      isSuperAdmin: false
    }
  },
  async created () {
    this.organisation = await Organisation.getOrganisation()
    this.users = await Organisation.getOrganisationUsers()
    this.isSuperAdmin = await User.isSuperAdmin()
    this.link = `${window.location.href}token/${this.organisation.hash}`
    this.isLoaded = true
  },
  methods: {
    saveName () {
      Organisation.setOrganisation(this.organisation)
    },
    copyToClipboard: (str) => {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    exportAllUsers: Users.getAllUsersCsv
  }
}
</script>

<style lang="scss" scoped>
</style>
