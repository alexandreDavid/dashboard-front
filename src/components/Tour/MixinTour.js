export default {
  data () {
    return {
      steps: [],
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
    async myCustomNextStepCallback (currentStepIdx) {
      const currentStep = this.steps[currentStepIdx]
      if (currentStep.onNextStep) {
        currentStep.onNextStep(currentStepIdx)
      }
      this.calculatePlacement(this.steps[currentStepIdx + 1])
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
