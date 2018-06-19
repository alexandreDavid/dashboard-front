<template>
  <div id="search-location">
    <div class="autocomplete">
      <input
        type="text"
        class="form-control"
        placeholder="Search a location"
        @input="onChange"
        @focus="onFocus"
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
          {{ result.displayName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

// import gql from 'graphql-tag'
import Area from '@/store/area'

export default {
  name: 'SearchLocation',
  // apollo: {
  //   results: {
  //     // gql query
  //     query: gql`
  //       query Movies($name: String!, $limit: Int!) {
  //         movies(subString: $name, limit: $limit) {
  //           title
  //         }
  //       }
  //     `,
  //     // Reactive parameters
  //     variables() {
  //       // Use vue reactive properties here
  //       return {
  //         name: this.search,
  //         limit: 5
  //       }
  //     },
  //     loadingKey: 'isLoading',
  //     update(data) {
  //       return data.movies;
  //     }
  //   }
  // },
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
  async created () {
    this.areas = await Area.getAllAreas()
    const selectedArea = Area.getSelectedArea()
    if (selectedArea) {
      this.search = selectedArea.displayName
    }
  },

  methods: {
    onChange () {
      this.isOpen = !!this.search
      this.$emit('input', false)
      this.filterResults()
      this.arrowCounter = 0
    },
    onFocus () {
      this.isOpen = !!this.search
      this.filterResults()
      this.arrowCounter = 0
    },
    setResult (result) {
      this.search = result.displayName
      this.isOpen = false
      Area.setSelectedArea(result)
      // Let's warn the parent that a change was made
      this.$emit('input', result)
    },
    onArrowDown (evt) {
      if (this.arrowCounter < this.results.length) {
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
    filterResults () {
      // Only 5 results
      this.results = this.areas.filter(area => area.displayName.toLowerCase().indexOf(this.search.toLowerCase()) > -1).slice(0, 5)
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
