<template>
  <div id="search-location-result" class="bg-secondary text-white">
    <div v-if="!isLoading" class="p-3">
      <h4>{{locationDetails.period}}</h4>
      <div class="d-flex">
        <div class="pr-2">
          <img :src="locationDetails.weather.image" class="weather-img">
        </div>
        <div class="pl-2 flex-grow-1">
          <div class="lead">{{locationDetails.weather.description}}</div>
          <div class="d-flex">
            <div class="d-inline align-self-center pr-3">
              <div class="font-weight-bold lead">{{locationDetails.weather.temperature.max}} {{unitTemperature}}</div>
              <div>{{locationDetails.weather.temperature.min}} {{unitTemperature}}</div>
            </div>
            <div class="d-inline align-self-center">
              <div>Wind {{locationDetails.weather.wind.speed}} {{unitWind}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Area from '@/store/area'
import Settings from '@/store/settings'

export default {
  name: 'SearchLocationResult',
  props: ['searchLocationResult'],
  data() {
    return {
      locationDetails: {},
      isLoading: true,
      units: Settings.getSettings()
    }
  },
  async created () {
    const infos = await Area.getAreaInfos(this.SearchLocationResult)
    this.locationDetails = infos
    this.isLoading = false
  },
  computed: {
    unitTemperature () {
      return this.units.find(u => u.id === 'temperature').label
    },
    unitWind () {
      return this.units.find(u => u.id === 'wind-speed').label
    }
  },
  // apollo: {
  //   locationDetails: {
  //     // gql query
  //     query: gql`
  //       query Movies($name: String!, $limit: Int!) {
  //         movies(subString: $name, limit: $limit) {
  //           year,
  //           plot,
  //           poster,
  //           imdbRating,
  //         }
  //       }
  //     `,
  //     // Reactive parameters
  //     variables() {
  //       // Use vue reactive properties here
  //       return {
  //         name: this.searchLocationResult,
  //         limit: 5
  //       }
  //     },
  //     loadingKey: 'isLoading',
  //     update(data) {
  //       return data.movies[0];
  //     }
  //   }
  // },
}
</script>

<style lang="scss">
#search-location-result {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 50px;

  .weather-img {
    width: 84px;
  }
}
</style>
