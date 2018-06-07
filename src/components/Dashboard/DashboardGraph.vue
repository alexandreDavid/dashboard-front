<template>
  <div class="card">
    <div class="card-header">
      <form>
        <div class="form-row">
          <div class="form-group col-6">
            <label for="exampleFormControlSelect1">Parameter</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="selectedParameter">
              <option v-for="parameter in allParameters" :key="parameter.paramName" v-bind:value="parameter">
                {{ parameter.displayName }}
              </option>
            </select>
          </div>
          <!-- <div class="form-group col-6">
            <label for="Model">Model</label>
            <select class="form-control" id="Model">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> -->
        </div>
      </form>
    </div>
    <div class="card-body square-div">
      <div class="square-div-content">
        <Graph v-if="selectedParameter" v-bind:area="area" v-bind:parameter="selectedParameter"></Graph>
        <span v-else>Select a parameter</span>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph/Graph'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'DashboardGraph',
  components: {
    Loading,
    Graph
  },
  props: [
    'allParameters',
    'selectedArea'
  ],
  data() {
    return {
      isLoaded: false,
      area: this.selectedArea,
      selectedParameter: this.allParameters[0],
    }
  },
  created () {
    this.isLoaded = true
  }
}
</script>

<style lang="scss" scoped>
.square-div {
  padding-bottom: 0;
  padding-top: 100%;
  position: relative;

  .square-div-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>

