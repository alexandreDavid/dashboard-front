<template>
  <div id="search-location">
    <div class="autocomplete">
      <input
        type="text"
        class="form-control"
        placeholder="Search a location"
        @input="onChange"
        @focus="onChange"
        v-model="search"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter">
      <ul
        id="autocomplete-results"
        v-show="isOpen"
        class="autocomplete-results shadow">
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
          class="autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Area from '@/store/area'

export default {
  name: 'SearchLocation',
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
      this.search = result.name
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
