<template>
  <Loading/>
</template>

<script>
import Auth from '@/store/authentication'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'AuthCallback',
  components: { Loading },
  created () {
    Auth.handleAuthentication()
  }
}
</script>
