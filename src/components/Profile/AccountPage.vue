<template lang="pug">
  block content
  div(class='container my-3')
    h4 Account
    hr
    h5(class='text-danger') Delete account
    p Deleting your account will disable your Profile. All your dashboards will be removed even the shared dashboards.
    button(class='btn btn-danger' @click='showConfirmDelete = true') Delete account
    confirm-modal(v-if='showConfirmDelete' content='Are you really sure you want to delete your account? This cannot be undone!' @close='showConfirmDelete = false' @confirm='deleteUser')
</template>

<script>
import auth from '@/store/authentication'
import ConfirmModal from '@/components/Modal/ConfirmModal'

export default {
  components: { ConfirmModal },
  data () {
    return {
      showConfirmDelete: false
    }
  },
  methods: {
    deleteUser () {
      auth.deleteUser()
    }
  }
}
</script>
