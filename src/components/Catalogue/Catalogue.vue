<template>
  <div id="forecast-selection">
    <div v-if="isLoaded">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="parameter in parameters" :key="parameter.name" @click="selectParameter(parameter)">
        <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">{{parameter.name}}</div>
          <font-awesome-layers class="fa-lg display-infos text-secondary" v-on:click.stop="displayInfos(parameter)">
            <font-awesome-icon icon="circle" class="text-white" size="xs" />
            <font-awesome-icon icon="info-circle" />
          </font-awesome-layers>
        </div>
        <div v-show="parameter.name === displayedInfo" class="displayed-infos">
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
          <small v-if="parameter.unit"><br>Unit: {{parameter.unit}}</small>
        </div>
      </a>
    </div>
    <Loading v-if="!isLoaded"/>
  </div>
</template>

<script>
import Georessources from '@/store/geoRessources'
import Loading from '@/components/Loading/Loading'
import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Catalogue',
  components: {
    Loading,
    FontAwesomeLayers
  },
  data () {
    return {
      parameters: [],
      isLoaded: false,
      displayedInfo: false
    }
  },
  async created () {
    this.parameters = await Georessources.getAll()
    this.isLoaded = true
  },
  methods: {
    selectParameter (selectedParameter) {
      this.$emit('selectedParameter', selectedParameter)
    },
    displayInfos (parameter) {
      this.displayedInfo = parameter.name
    }
  }
}
</script>
