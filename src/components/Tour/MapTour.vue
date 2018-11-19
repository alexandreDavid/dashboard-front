<template>
  <div v-if="$mq !== 'sm'">
    <modal v-if="showModalHelp" @close="closeModal">
      <div slot="header">Welcome to the DFMS application</div>
      <div slot="body">
        <button class="btn btn-primary" @click="start">Start the help</button>
        <button class="btn btn-secondary" @click="closeModal">Skip</button>
      </div>
    </modal>
    <div class="tour-mask" v-show="displayMask && !showModalHelp">
      <div class="tour-focus-container" v-bind:style="styleFocusContainer"></div>
    </div>
    <v-tour name="MapTour" :steps="steps" :callbacks="myCallbacks"></v-tour>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import UserConfiguration from '@/store/userConfiguration'

export default {
  name: 'MapTour',
  components: {
    Modal
  },
  data () {
    return {
      showModalHelp: false,
      steps: [
        {
          target: '.navbar-nav',
          content: `Changing the displayed page`
        },
        {
          target: '.navbar-nav.nav-item.btn-group',
          content: 'Managing your profile'
        },
        {
          target: '#area-selection-control',
          content: 'Selecting a working area'
        },
        {
          target: '#displayed-layers',
          content: 'Managing the displayed layers'
        },
        {
          target: '#meteo-stations-control',
          content: 'Managing the displaying of the meteorological stations'
        },
        {
          target: '#bar-control',
          content: 'Controlling the map',
          params: {
            placement: 'right'
          }
        }
      ],
      myCallbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback,
        onNextStep: this.myCustomNextStepCallback,
        onStart: this.onStart,
        onStop: this.onStop
      },
      styleFocusContainer: {
        left: 0,
        top: 0,
        height: 0,
        width: 0
      },
      displayMask: false
    }
  },
  mounted: function () {
    // Check in the local storage
    this.showModalHelp = UserConfiguration.getDisplayingHelp()
  },
  methods: {
    start () {
      this.showModalHelp = false
      this.$tours['MapTour'].start()
    },
    closeModal () {
      this.showModalHelp = false
      UserConfiguration.setDisplayingHelp(false)
    },
    myCustomPreviousStepCallback (currentStep) {
      this.calculatePlacement(this.steps[currentStep - 1])
    },
    myCustomNextStepCallback (currentStep) {
      this.calculatePlacement(this.steps[currentStep + 1])
    },
    calculatePlacement (step) {
      let targetElement = document.querySelector(step.target)
      const rect = targetElement.getBoundingClientRect()
      this.styleFocusContainer.left = rect.left + 'px'
      this.styleFocusContainer.top = rect.top + 'px'
      this.styleFocusContainer.width = rect.width + 'px'
      this.styleFocusContainer.height = rect.height + 'px'
    },
    onStart () {
      this.calculatePlacement(this.steps[0])
      this.displayMask = true
    },
    onStop () {
      this.displayMask = false
      UserConfiguration.setDisplayingHelp(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.tour-mask {
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
  z-index: 2000;

  .tour-focus-container {
    border-radius: 4px;
    transition:opacity 0.2s;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 1;
    pointer-events: auto;
    box-shadow: 0px 0px 0px 9999px rgba(17,55,80,0.4), 0px 0px 15px rgba(0,0,0,0.5);
  }
}
</style>
