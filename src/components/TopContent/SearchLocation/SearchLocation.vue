<template>
  <div id="search-location">
    <div class="autocomplete">
      <input
        type="text"
        @input="onChange"
        @focus="onFocus"
        v-model="search"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter"/>
      <ul
        id="autocomplete-results"
        v-show="isOpen"
        class="autocomplete-results">
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
          {{ result.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag'

export default {
  name: 'SearchLocation',
  apollo: {
    results: {
      // gql query
      query: gql`
        query Movies($name: String!, $limit: Int!) {
          movies(subString: $name, limit: $limit) {
            title
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          name: this.search,
          limit: 5
        }
      },
      loadingKey: 'isLoading',
      update(data) {
        return data.movies;
      }
    }
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      movies: []
    }
  },

  methods: {
    onChange() {
      this.isOpen = !!this.search
      this.$emit('input', false);
      this.arrowCounter = 0
    },
    onFocus() {
      this.isOpen = !!this.search
      this.arrowCounter = 0
    },
    setResult(result) {
      this.search = result.title
      this.isOpen = false
      // Let's warn the parent that a change was made
      this.$emit('input', this.search);
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.setResult(this.results[this.arrowCounter])
      this.arrowCounter = -1
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>

.autocomplete {
  position: relative;
  width: 100%;

  input {
    width: 100%;
  }
}

.autocomplete-results {
  padding: 0;
  margin: 0;
}

.autocomplete-result {
  background-color: #eeeeee;
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover, .autocomplete-result.is-active {
  background-color: #4aae9b;
  color: white;
}
</style>
