<template>
  <main class="pa-3">
    <section>
      <h1 class="display-1 pa-3" align="center">Статистика по миру</h1>
      <v-row align="center" justify="center">
        <stat-card
          v-for="card in cards"
          :key="card"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardAmount="card.amount"
          :cardAmountNew="card.amountNew"
          :cardIcon="card.icon"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1 pa-3" align="center">Графики</h2>
      <v-row align="center" justify="center">
        <line-chart
          v-for="visual in visuals"
          :key="visual.id"
          :chart-data="visual.chartData"
          :options="visual.option"></line-chart>
      </v-row>
    </section>
  </main>
</template>

<script>
import StatCard from "./StatCard";
import LineChart from "./lineChart";

export default {
  name: "HelloWorld",
  data() {
    return {
      cards: [
        {
          title: "Всего случаев",
          bgColor: "grey darken-4",
          amount: 0,
          amountNew: 0,
          icon: "mdi-alert-decagram-outline",
        },
        {
          title: "Смертность",
          bgColor: "grey darken-4",
          amount: 0,
          amountNew: 0,
          icon: "mdi-emoticon-dead-outline",
        },
        {
          title: "Выздоровели",
          bgColor: "grey darken-4",
          amount: 0,
          amountNew: 0,
          icon: "mdi-hospital-building",
        },
      ],
      visuals: [],
      continents: null,
      allData: null,
      recovered: null
    };
  },
  components: {
    StatCard,
    LineChart,
  },
  mounted() {
    this.axios
      .get("https://corona.lmao.ninja/v2/continents?sort")
      .then((response) => {
        this.continents = response;
        this.updateStats();
      })
      .catch((error) => {
        console.error("API error: ", error);
      });

    this.axios
      .get("https://corona.lmao.ninja/v2/historical/all")
      .then((response) => {
        this.allData = response;
        this.updateVisuals();
      });
  },
  methods: {
    updateStats() {
      let data = this.continents.data;

      let cases = 0;
      let deaths = 0;
      let recoveries = 0;

      for (let elem of data) {
        cases += elem.cases;
        deaths += elem.deaths;
        recoveries += elem.recovered;
      }

      this.cards[0].amount += cases;
      this.cards[1].amount += deaths;
      this.cards[2].amount += recoveries;
    },
    updateVisuals() {
      let data = this.allData.data;
      let cases = data.cases;
      let recoveries = data.recovered;
      let deaths = data.deaths;

      let labels = [];
      let casesPerDay = [];
      let recoveriesPerDay = [];
      let deathsPerDay = [];
      

      for (let key in cases) {
        labels.push(key);
        casesPerDay.push(cases[key]);
        recoveriesPerDay.push(recoveries[key]);
        deathsPerDay.push(deaths[key]);  
      }
     
      this.visuals.push({
        id: 1,
        chartData: {
        labels: labels,
        datasets: [
          {
            label: "Всего случаев",
            backgroundColor: "black",
            data: casesPerDay,
          }],
      },
      options:{responsive: true, maintainAspectRatio: false}
      })

      this.visuals.push({
        id: 2,
        chartData: {
        labels: labels,
        datasets: [
          {
            label: "Смертность",
            backgroundColor: "black",
            data: deathsPerDay,
          }],
      },
      options:{responsive: true, maintainAspectRatio: false}
      })

      this.visuals.push({
        id: 3,
        chartData: {
        labels: labels,
        datasets: [
          {
            label: "Выздоровели",
            backgroundColor: "black",
            data: recoveriesPerDay,
          }],
      },
      options:{responsive: true, maintainAspectRatio: false}
      })

      let lastDayCases = casesPerDay[casesPerDay.length - 1] - casesPerDay[casesPerDay.length - 2];
      let lastDayDeaths = deathsPerDay[deathsPerDay.length - 1] - deathsPerDay[deathsPerDay.length - 2];
      let lastDayRecoveries = recoveriesPerDay[recoveriesPerDay.length - 1] - recoveriesPerDay[recoveriesPerDay.length - 2];

      this.cards[0].amountNew += lastDayCases;
      this.cards[1].amountNew += lastDayDeaths;
      this.cards[2].amountNew += lastDayRecoveries

    },
  },
};
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
