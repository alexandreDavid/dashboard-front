<template>
  <div id="search-location-result">
    <img :src="locationDetails.poster" style="width: 50px;">
    <div>Year: {{locationDetails.year}}<br>
    Imdb rating: {{locationDetails.imdbRating}}<br>
    Plot: {{locationDetails.plot}}</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'SearchLocationResult',
  props: ['searchLocationResult'],
  data() {
    return {
      locationDetails: {}
    }
  },
  apollo: {
    locationDetails: {
      // gql query
      query: gql`
        query Movies($name: String!, $limit: Int!) {
          movies(subString: $name, limit: $limit) {
            year,
            plot,
            poster,
            imdbRating,
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          name: this.searchLocationResult,
          limit: 5
        }
      },
      loadingKey: 'isLoading',
      update(data) {
        return data.movies[0];
      }
    }
  },
}
</script>

<style lang="scss">
#search-location-result {
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 50px;
  background: rgba(100, 100, 100, 0.8);
  color: white;
}
</style>
