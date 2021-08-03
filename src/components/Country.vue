<template>
  <main class="pa-3">
    <section>
       <h1 class="display-1 mb-5 pa-3" align="center">{{ queryName }}</h1>
      <v-row align="center" justify="center" class="mb-5">
        <stat-card
          v-for="card in countryDataCards"
          :key="card.title"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardAmount="card.amount"
          :cardAmountNew="card.amountNew"
          :cardIcon="card.icon"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1 mb-10 pa-3" align="center">Графики за последний месяц</h2>
      <v-row align="center" justify="center">
        <line-chart class="ma-1"
          v-for="visual in countryDataVisuals"
          :key="visual.id"
          :chart-data="visual.chartData"
          :options="visual.option"
        ></line-chart>
      </v-row>
    </section>
  </main>
</template>
<script>
import StatCard from './StatCard'
import LineChart from './lineChart'
export default {
  name: 'Country',
  props: ['queryName'],
  data () {
    return {
      cards: [],
      visuals: []
    }
  },
  components: {
    StatCard,
    LineChart
  },
  mounted () {
    // this.$store.dispatch('newCountry', this.queryName)
    // this.$store.dispatch('newCountryName', this.queryName)
    // this.updateCountryStats()
  },
  methods: {
    updateCountryStats () {
      let data = this.$store.getters.country
      this.cards.push({ title: 'Всего случаев заражения', bgColor: '#F9A825', amount: data.cases, amountNew: data.cases, icon: 'mdi-alert-decagram-outline' })
      this.cards.push({ title: 'Смертность', bgColor: '#C62828', amount: data.deaths, amountNew: 0, icon: 'mdi-emoticon-dead-outline' })
      this.cards.push({ title: 'Выздоровели', bgColor: '#558B2F', amount: data.recoveries, amountNew: 0, icon: 'mdi-hospital-building' })
      this.visuals = []
      this.visuals.push({
        id: 1,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Всего случаев заражения, в миллионах',
            backgroundColor: '#F9A825',
            data: data.visualData.cases
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 2,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Смертность, в миллионах',
            backgroundColor: '#C62828',
            data: data.visualData.deaths
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 3,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Выздоровели, в милионнах',
            backgroundColor: '#558B2F',
            data: data.visualData.recoveries
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
    }
  },
  computed: {
    countryDataCards () {
      let countryData = this.$store.getters.country
      let cards = []
      cards.push({ title: 'Всего случаев заражения', bgColor: 'yellow darken-3', amount: Math.round(countryData.cases * 1000000), amountNew: countryData.visualData.casesPerDay, icon: 'mdi-alert-decagram-outline' })
      cards.push({ title: 'Смертность', bgColor: 'red darken-3', amount: countryData.deaths, amountNew: countryData.visualData.deathsPerDay, icon: 'mdi-emoticon-dead-outline' })
      cards.push({ title: 'Выздоровели', bgColor: 'light-green darken-3', amount: Math.round(countryData.recoveries * 1000000), amountNew: countryData.visualData.recoveriesPerDay, icon: 'mdi-hospital-building' })
      return cards
    },
    countryDataVisuals () {
      let countryData = this.$store.getters.country
      let visuals = []
      visuals.push({
        id: 1,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Всего случаев заражения, в миллионах',
            backgroundColor: '#F9A825',
            data: countryData.visualData.cases
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      visuals.push({
        id: 2,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Смертность',
            backgroundColor: '#C62828',
            data: countryData.visualData.deaths
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      visuals.push({
        id: 3,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Выздоровели, в милионнах',
            backgroundColor: '#558B2F',
            data: countryData.visualData.recoveries
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      return visuals
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.small {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
