<template>
    <div id="top-content" class="over-map">
        <div class="over-map-left">
            <SearchLocation/>
        </div>
        <div class="over-map-right">
            <Managing/>
        </div>
    </div>
</template>

<script>

import SearchLocation from './SearchLocation/SearchLocation'
import Managing from './Managing/Managing'

export default {
  name: 'TopContent',
  components: {
    SearchLocation,
    Managing
  }
}
</script>

<style scoped>
#top-content {
  width: 100%;
  top: 0;
}

.over-map-left {
  margin-top: 10px;
  margin-left: 10px;
  left: 0;
  top: 0;
  position: absolute;
}

.over-map-right {
  margin-top: 10px;
  margin-right: 10px;
  right: 0;
  top: 0;
  position: absolute;
}
</style>