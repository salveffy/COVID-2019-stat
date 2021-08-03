<template>
  <v-app id="app">

    <v-app-bar
      absolute
      color="white "
      dense
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      app
    >

      <router-link class="text-d grey--text text--darken-1 ma-10" to="/">
        <v-toolbar-title class="headline">
          <v-icon>mdi-virus-outline</v-icon> COVID-2019</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="country in countries" :key="country" @click="() => {}" link :to="'/country/' + country">
            <v-list-item-title @click="updateCountry(country)">{{ country }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
    </v-sheet>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'COVID-2019', icon: 'mdi-earth', link: '/' }
      ],
      drawer: false
    }
  },
  mounted () {
    this.$store.dispatch('updateTopCountries')
  },
  methods: {
    updateCountry (country) {
      this.$store.dispatch('newCountryName', country)
    }
  },
  computed: {
    countries () {
      return this.$store.getters.topCountries
    }
  }
}
</script>
<style>
#app {
  color: #2c3e50;
}
.text-d{
  text-decoration: none;
}
</style>