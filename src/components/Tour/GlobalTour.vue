<template>
  <div v-if="$mq !== 'sm'">
    <div class="tour-mask" v-show="displayMask">
      <div class="tour-focus-container" v-bind:style="styleFocusContainer"></div>
    </div>
    <v-tour name="GlobalTour" :steps="steps" :callbacks="myCallbacks">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="(tour.currentStep === index)"
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
            <template v-if="steps[tour.currentStep].target === '#displayed-layers'">
              <div slot="content">
                Explore available data and manage the displayed layers. Click the <font-awesome-icon icon="cog" /> and <font-awesome-icon icon="play" /> icons to learn more about view and change settings for data layers on the map like date range, graph and opacity.
              </div>
            </template>
            <template>
              <div slot="actions">
                <div class="v-step__buttons">
                  <button @click.prevent="skip(tour)" v-if="!tour.isLast" class="v-step__button">{{ tour.labels.buttonSkip }}</button>
                  <button @click.prevent="tour.previousStep" v-if="!tour.isFirst" class="v-step__button">{{ tour.labels.buttonPrevious }}</button>
                  <button @click.prevent="tour.nextStep" v-if="!tour.isLast" class="v-step__button">{{ tour.labels.buttonNext }}</button>
                  <button @click.prevent="finish(tour)" v-if="tour.isLast" class="v-step__button">{{ tour.labels.buttonStop }}</button>
                </div>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
    <confirm-modal v-if="showModalChangePage" :content="continueMessage" @close="closeModal" @confirm="newPageDiscover" confirm-label="Yes" cancel-label="No"></confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from '@/components/Modal/ConfirmModal'
import Mixin from './MixinTour'

import tourConfig from './tourConfig'

export default {
  name: 'GlobalTour',
  components: {
    ConfirmModal
  },
  mixins: [ Mixin ],
  data () {
    return {
      initRoute: false,
      showModalChangePage: false,
      allPages: ['dashboard', 'map'],
      curTour: false,
      curAllPages: [],
      firstPart: true,
      continueMessage: false,
      firstRoute: false
    }
  },
  methods: {
    onStart () {
      if (this.firstPart) {
        this.steps = [...tourConfig.global.steps, ...tourConfig[this.$route.name].steps]
        this.curAllPages = [...this.allPages]
        this.firstRoute = this.$route.name
      } else {
        this.steps = tourConfig[this.$route.name].steps
      }
      this.curAllPages = this.curAllPages.filter(p => p !== this.$route.name)
      this.calculatePlacement(this.steps[0])
      this.displayMask = true
    },
    onStop () {
      this.displayMask = false
      this.firstPart = true
    },
    skip (tour) {
      tour.stop()
      this.$router.push({name: this.firstRoute})
    },
    finish (tour) {
      tour.stop()
      this.curTour = tour
      if (this.curAllPages.length) {
        this.showModalChangePage = true
        this.continueMessage = tourConfig[this.$route.name].continueMessage
      } else {
        this.$router.push({name: this.firstRoute})
      }
    },
    closeModal () {
      this.showModalChangePage = false
      this.firstPart = true
      this.$router.push({name: this.firstRoute})
    },
    newPageDiscover () {
      this.firstPart = false
      this.showModalChangePage = false
      const vm = this
      this.$router.push({name: this.curAllPages[0]}, () => {
        vm.$tours['GlobalTour'].start()
      })
    }
  }
}
</script>
