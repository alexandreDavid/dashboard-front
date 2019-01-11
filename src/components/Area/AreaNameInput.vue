<template>
  <div class="input-group input-group-sm">
    <input type="text" ref="input" v-model="val" class="form-control" placeholder="Area name" aria-label="Area name" :disabled="!editing">
    <div class="input-group-append">
      <button class="btn btn-secondary" v-if="!editing" type="button" @click="edit"><font-awesome-icon icon="edit" /></button>
      <button class="btn btn-danger" v-if="editing && value" type="button" @click="cancel"><font-awesome-icon icon="times" /></button>
      <button class="btn btn-success" v-if="editing" type="button" @click="validate(val)" :disabled="!val"><font-awesome-icon icon="check" /></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AreaNameInput',
  props: ['value'],
  data () {
    return {
      val: false,
      editing: false
    }
  },
  mounted () {
    this.value || this.edit()
  },
  methods: {
    edit () {
      this.editing = true
      this.$nextTick(() => this.$refs.input.focus())
    },
    cancel () {
      this.val = this.value
      this.editing = false
    },
    validate (val) {
      this.editing = false
      this.$emit('input', val)
    }
  },
  watch: {
    value (val) {
      this.editing = !val
      this.val = val
    }
  }
}
</script>
