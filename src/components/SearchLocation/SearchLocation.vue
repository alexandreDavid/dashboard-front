<template>
  <div id="search-location">
    <div class="list-group" role="tablist">
      <div class="input-group position-relative w-100" v-bind:class="{'rounded-bottom-0': isOpen && results.length}">
        <input
          type="text"
          ref="searchLocation"
          class="form-control"
          placeholder="Search a location"
          @input="onChange"
          @focus="onFocus"
          v-model="search"
          @keyup.down="onArrowDown"
          @keyup.up="onArrowUp"
          @keyup.enter="onEnter">
        <div class="input-group-append bg-white" v-if="search">
          <button class="btn btn-outline-secondary" v-if="!isOpen && hasLocateListener" type="button" @click="locate"><font-awesome-icon icon="search" /></button>
          <button class="btn btn-outline-secondary" type="button" @click="remove"><font-awesome-icon icon="times" /></button>
        </div>
      </div>
      <div
        class="loading"
        v-show="isOpen"
        v-if="isLoading">
        Loading results...
      </div>
      <div
        v-else
        v-for="(result, i) in results"
        v-show="isOpen"
        :key="i"
        @click="setResult(result)"
        class="list-group-item list-group-item-action list-group-item-light"
        :class="{ 'active': i === arrowCounter }">
        {{ result.name }}
      </div>
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
      prevValue: false,
      isLoading: false,
      arrowCounter: 0,
      movies: [],
      areas: []
    }
  },
  created () {
    if (this.value) {
      this.search = this.value.name
    }
  },
  watch: {
    value (val) {
      this.setResult(val, false)
    }
  },
  computed: {
    hasLocateListener () {
      return this.$listeners && this.$listeners.locate
    }
  },
  methods: {
    async onChange () {
      this.isOpen = true
      if (this.search) {
        const areas = await Area.searchAreas(this.search)
        // Only 5 results
        this.results = areas.slice(0, 5)
        this.arrowCounter = 0
      } else {
        this.results = []
      }
    },
    onFocus () {
      this.prevValue = this.value
      this.onChange()
      document.addEventListener('click', this.handleClickOutside)
    },
    setResult (result, emit = true) {
      this.isOpen = false
      this.prevValue = result
      this.search = result.name
      // Let's warn the parent that a change was made
      emit && this.$emit('input', result)
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
    returnToInitialeStatement () {
      this.isOpen = false
      this.arrowCounter = -1
      this.search = (this.prevValue && this.prevValue.name) || ''
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.returnToInitialeStatement()
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    remove () {
      this.prevValue = false
      this.returnToInitialeStatement()
      this.$emit('input', false)
      this.$refs.searchLocation.focus()
    },
    locate () {
      this.$emit('locate', this.value)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.rounded-bottom-0 {
  input, button {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>
