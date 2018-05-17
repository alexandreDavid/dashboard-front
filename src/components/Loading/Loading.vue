<template>
  <div class="text-center p-3">
    <font-awesome-icon :icon="iconSpinner" spin class="display-4 mb-2"/>
    <div>Loading...</div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

export default {
  name: 'Loading',
  components: {
    FontAwesomeIcon
  },
  computed: {
    iconSpinner() {
      return faSpinner
    }
  }
}
</script>
