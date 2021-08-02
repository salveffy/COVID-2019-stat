<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      class="grey darken-4"
      dark
      app
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      absolute
      color="white "
      dense
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline"
        ><v-icon>mdi-virus-outline</v-icon> COVID-2019</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
        { title: 'Статистика по миру', icon: 'mdi-earth', link: '/' },
        { title: 'Статистика по стране', icon: 'mdi-flag-outline', link: '/countries' },
        { title: 'Новости', icon: 'mdi-newspaper-variant-outline', link: '/countries' }
      ],
      drawer: false
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}

</style>
