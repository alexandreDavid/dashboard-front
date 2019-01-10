<template>
  <div v-if="$mq !== 'sm'">
    <div class="tour-mask" v-show="displayMask">
      <div class="tour-focus-container" v-bind:style="styleFocusContainer"></div>
    </div>
    <v-tour name="MapTour" :steps="steps" :callbacks="myCallbacks">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.currentStep === index"
            v-for="(step, index) of tour.steps"
            :key="index"
            :step="step"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template v-if="tour.currentStep === 3">
              <div slot="content">
                Explore available data and manage the displayed layers. Click the <font-awesome-icon icon="cog" /> and <font-awesome-icon icon="play" /> icons to learn more about view and change settings for data layers on the map like date range, graph and opacity.
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'MapTour',
  components: {
    Modal
  },
  data () {
    return {
      steps: [
        {
          target: '.navbar-nav',
          content: 'Access the main navigation menu.'
        },
        {
          target: '.navbar-nav.nav-item.btn-group',
          content: 'Manage your profile here including preferred units of measurement and setting personalised notifications.'
        },
        {
          target: '#area-selection-control',
          content: 'Change the map area to search by district or place name or selecting a preferred area.'
        },
        {
          target: '#displayed-layers',
          content: 'Explore available data and manage the displayed layers. Click the "Tools" and “Play” icons to learn more about view and change settings for data layers on the map like date range, graph and opacity.'
        },
        {
          target: '#meteo-stations-control',
          content: 'View current and historical weather measurements collected from the ground at various meteorological stations.'
        },
        {
          target: '#bar-control',
          content: 'Access basic map tools and customize the basemap, including the boundaries displayed and the colour of the labels.',
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
  methods: {
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
