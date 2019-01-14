<template>
  <modal @close="closeModal" required>
    <div slot="body">
      <div class="carousel slide" data-ride="carousel">
          <!-- Wrapper for slides -->
          <div class="carousel slide">
            <div class="carousel-inner">
              <div ref="carousel-0" class="carousel-item active">
                <div class="text-center">
                  <img class="mx-auto d-block mb-4" alt="DFMS" src="@/assets/logo-vertical.png" style="width: 200px">
                  <h3>Welcome to the DFMS platform</h3>
                  <p>The DFMS Project is a 3-year project to develop the Drought and Flood Mitigation Service (DFMS) for Uganda, implemented in cooperation with the Government of Uganda, led by the Ministry of Water and Environment. The project is led by the RHEA Group and receives financial support through the UK’s International Partnership Programme, administered by the UK Space Agency. <a href="http://www.dfms.co.uk/" target="__blank">Learn more...</a></p>
                </div>
              </div>

              <div ref="carousel-1" class="carousel-item">
                <div class="alert alert-primary" role="alert">
                  Lets start to define the area of interest. A list of boundaries is available but it's also possible to draw a custom area.
                </div>
                <div class="col-12">
                  <area-edition-form class="container" v-if="pos === 1" v-model="area"></area-edition-form>
                </div>
              </div>

              <div ref="carousel-2" class="carousel-item">
                <div class="text-center p-5">
                  <font-awesome-icon icon="check-circle" class="text-success display-1 mb-3" />
                  <h5>Everything is ready. You can now start to use the application.</h5>
                  <p>We recommand to launch the discovery tour before using the data.</p>
                  <button class="btn btn-primary mb-3" @click="launchDiscoveryTour">Launch the discovery tour</button>
                  <p>Or click on the Finish button to access to the platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="d-flex justify-content-between w-100">
        <button class="btn btn-secondary" @click="previous" :disabled="pos === 0">Previous</button>
        <button v-if="pos < 2" class="btn btn-secondary" @click="next" :disabled="pos === 1 && !area.valid">Next</button>
        <button v-else class="btn btn-primary" @click="closeModal">Finish</button>
      </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal/Modal'
import AreaEditionForm from '@/components/Area/AreaEditionForm'

import DefinedAreas from '@/store/definedAreas'
import UserConfiguration from '@/store/userConfiguration'

const Direction = {
  NEXT: 'next',
  PREV: 'prev'
}

const ClassName = {
  ACTIVE: 'active',
  RIGHT: 'carousel-item-right',
  LEFT: 'carousel-item-left',
  NEXT: 'carousel-item-next',
  PREV: 'carousel-item-prev'
}

export default {
  name: 'WelcomeModal',
  components: {
    Modal, AreaEditionForm
  },
  data () {
    return {
      pos: 0,
      area: {}
    }
  },
  methods: {
    reflow (element) {
      return element.offsetHeight
    },
    slide (direction) {
      let directionalClassName
      let orderClassName
      let from = this.$refs[`carousel-${this.pos}`]

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT
        orderClassName = ClassName.NEXT
        this.pos++
      } else {
        directionalClassName = ClassName.RIGHT
        orderClassName = ClassName.PREV
        this.pos--
      }

      let to = this.$refs[`carousel-${this.pos}`]
      to.classList.add(orderClassName)
      this.reflow(to)
      from.classList.add(directionalClassName)
      to.classList.add(directionalClassName)

      setTimeout(() => {
        from.classList.remove(ClassName.ACTIVE, directionalClassName)
        to.classList.add(ClassName.ACTIVE)
        to.classList.remove(orderClassName, directionalClassName)
      }, 650)
    },
    next () {
      this.slide(Direction.NEXT)
    },
    previous () {
      this.slide(Direction.PREV)
    },
    launchDiscoveryTour () {
      this.closeModal()
      this.$tours['MapTour'].start()
    },
    closeModal () {
      DefinedAreas.setAll([this.area])
      this.$emit('close')
      UserConfiguration.setDisplayHelp(false)
    }
  }
}
</script>

<style lang="scss">
.carousel-item {
  height: 580px;
}
</style>
