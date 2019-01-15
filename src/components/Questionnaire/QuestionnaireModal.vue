<template>
  <modal @close="closeModal">
    <div slot="header">Questionnaire</div>
    <div slot="body">
      <p>This survey aims to better understand your feedback, and identifies ways in which your tools can best be supported by the DFMS platform.</p>
      <p>The questionnaire is confidential. It should take around 10-15 minutes of your time.</p>
      <p>Your contribution is greatly valued and your time much appreciated.</p>
    </div>
    <div slot="footer">
      <button class="btn btn-secondary" @click="closeModal">Close</button>
      <a class="btn btn-success" @click="closeModal" href="https://docs.google.com/forms/d/e/1FAIpQLSdrZzq7bPZkieJxuYNLjBu-_wt5j1oX77eV4brOOAST5VcG5w/viewform" target="__blank">Go</a>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'QuestionnaireModal',
  components: {
    Modal
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
