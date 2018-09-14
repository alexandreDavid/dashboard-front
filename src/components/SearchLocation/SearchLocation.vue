<template>
  <div id="search-location">
    <div class="autocomplete position-relative w-100">
      <input
        type="text"
        class="form-control w-100"
        placeholder="Search a location"
        @input="onChange"
        @focus="onChange"
        v-model="search"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter">
      <ul
        v-show="isOpen"
        class="list-group shadow">
        <li
          class="loading"
          v-if="isLoading">
          Loading results...
        </li>
        <li
          v-else
          v-for="(result, i) in results"
          :key="i"
          @click="setResult(result)"
          class="list-group-item list-group-item-action"
          :class="{ 'active': i === arrowCounter }">
          {{ result.name }}
        </li>
        <li
          @click="openMap()"
          class="list-group-item list-group-item-action">
          <!-- <button type="button" class="btn btn-secondary">Open the map selector</button> -->
          <!-- <a>Open the map selector</a> -->
          <a href="#" class="link">Open the map selector</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Area from '@/store/area'

export default {
  name: 'SearchLocation',
  props: ['value'],
  data () {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      movies: [],
      areas: []
    }
  },
  created () {
    const selectedArea = Area.getSelectedArea()
    if (selectedArea) {
      this.search = selectedArea.name
    }
  },
  watch: {
    value (val, oldVal) {
      if (val) {
        this.search = val.name
        this.setResult(val)
      }
    }
  },
  methods: {
    async onChange () {
      this.$emit('input', false)
      this.areas = await Area.searchAreas(this.search)
      this.calculateDisplaying()
    },
    calculateDisplaying () {
      this.isOpen = !!this.search
      // Only 5 results
      this.results = this.areas.slice(0, 5)
      this.arrowCounter = 0
    },
    setResult (result) {
      this.isOpen = false
      Area.setSelectedArea(result)
      // Let's warn the parent that a change was made
      this.$emit('input', result)
    },
    onArrowDown () {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter () {
      this.setResult(this.results[this.arrowCounter])
      this.arrowCounter = -1
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    },
    openMap () {
      this.isOpen = false
      this.$emit('openMap')
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
