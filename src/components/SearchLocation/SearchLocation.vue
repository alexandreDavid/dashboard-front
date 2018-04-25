<template>
  <div id="search-location" class="over-map">
    {{hello}}
    <div class="autocomplete">
      <input
        type="text"
        @input="onChange"
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
          {{ result }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { MapObj } from '../../map/MapObj'
import gql from 'graphql-tag'

export default {
  name: 'SearchLocation',
  apollo: {
    posts: gql`
      {
        posts {
          id
          title
          author {
            id
            name
          }
        }
      }
    `
  },
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      hello: ''
    }
  },

  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this.search)
      this.isLoading = true
    },
    setResult(result) {
      this.search = result
      this.isOpen = false
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
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    }
  },
  watch: {
    items: function(val, oldValue) {
      this.results = val
      this.isOpen = true
      this.isLoading = false
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

<style>
.over-map {
  margin-top: 10px;
  margin-left: 10px;
  z-index: 400;
  position: absolute;
  top: 0;
}

.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
