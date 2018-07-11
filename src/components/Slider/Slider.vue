<template>
  <div
    ref="wrap"
    class="vue-slide-bar-component vue-slide-bar-vertical"
    :style="calculateMinHeight"
    @click="wrapClick">
    <div ref="elem" class="vue-slide-bar" :style="{width: `${lineHeight}px`}">
      <template>
        <div ref="dot"
          class="vue-slide-bar-always vue-slide-bar-dot"
          :style="{'height': `${iconWidth}px`}"
          @mousedown="moveStart"
          @touchstart="moveStart">
          <div class="vue-slide-bar-pointer" :style="tooltipStyles"></div>
          <span class="vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap" v-if="showTooltip">
            <slot name="tooltip">
              <small class="vue-slide-bar-tooltip" :style="tooltipStyles">{{ val }}</small>
            </slot>
          </span>
        </div>
      </template>
      <div ref="process" class="vue-slide-bar-process" :style="processStyle"></div>
    </div>
    <div v-if="range" class="vue-slide-bar-range">
      <div v-for="(r, index) in range" :key="index" class="vue-slide-bar-separate" :style="dataLabelStyles">
        <span v-if="!r.isHide" class="vue-slide-bar-separate-text">
          {{ r.label }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlideBar from 'vue-slide-bar'
export default {
  mixins: [VueSlideBar],
  methods: {
    getPos (e) {
      this.realTime && this.getStaticData()
      return this.size - e.clientY + this.offset
    },
    setTransform (val) {
      let translateValue = `translateY(-${val}px)`
      this.slider.style.transform = translateValue
      this.slider.style.WebkitTransform = translateValue
      this.slider.style.msTransform = translateValue
      this.$refs.process.style.height = `${val}px`
      this.$refs.process.style['left'] = 0
    },
    getStaticData () {
      if (this.$refs.elem) {
        this.size = this.$refs.elem.offsetHeight
        this.offset = this.$refs.elem.getBoundingClientRect().top
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-slide-bar-component {
  position: relative;
  box-sizing: border-box;
  user-select: none;
}
.vue-slide-bar-vertical {
  height: 100%;
  position: absolute;
  right: 0;
  .vue-slide-bar {
    width: 5px;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
.vue-slide-bar {
  position: relative;
  display: block;
  border-radius: 3px;
  background-color: var(--secondary);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
.vue-slide-bar-process {
  position: absolute;
  border-radius: 15px;
  background-color: var(--secondary);
  transition: all 0s;
  z-index: 1;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  will-change: width;
}
.vue-slide-bar-dot {
  position: absolute;
  transition: all 0s;
  will-change: transform;
  cursor: pointer;
  z-index: 3;
  right: -8px;
  bottom: -10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: var(--secondary);
}
.vue-slide-bar-tooltip-wrap {
  position: absolute;
  z-index: 9;
}
.vue-slide-bar-tooltip-top {
  right: 25px;
  transform: translateY(-50%);
  top: 10px;
}
.vue-slide-bar-tooltip {
  position: relative;
  white-space: nowrap;
  padding: 2px 5px;
  min-width: 20px;
  text-align: center;
  color: var(--white);
  border-radius: 5px;
  border: 1px solid var(--secondary);
  background-color: var(--secondary);
}
.vue-slide-bar-range {
  display: flex;
  padding: 5px 0;
  justify-content: space-between;
}
.vue-slide-bar-separate {
  position: relative;
  width: 2px;
  background-color: #9e9e9e;
  height: 5px;
  cursor: pointer;
}
.vue-slide-bar-separate-text {
  text-align: center;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%, 0);
  top: 6px;
}
</style>
