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
      <div class="small">
        <line-chart
          v-for="visual in visuals"
          :key="visual.id"
          :chart-data="visual.chartData"
          :options="visual.option"
        ></line-chart>
      </div>
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
      visuals: [
        {
          id: 1,
          chartData: null,
          options: { responsive: true, maintainAspectRatio: false },
        },
      ],
      continents: null,
      allData: null,
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
      let todayCases = 0;
      let deaths = 0;
      let todayDeaths = 0;
      let recoveries = 0;

      for (let elem of data) {
        cases += elem.cases;
        todayCases += elem.todayCases;
        deaths += elem.deaths;
        todayDeaths += elem.todayDeaths;
        recoveries += elem.recovered;
      }

      this.cards[0].amount += cases;
      this.cards[0].amountNew += todayCases;
      this.cards[1].amount += deaths;
      this.cards[1].amountNew += todayDeaths;
      this.cards[2].amount += recoveries;
    },
    updateVisuals() {
      let data = this.allData.data.cases;

      let labels = [];
      let casesPerDay = [];

      for (let key in data) {
        labels.push(key);
        casesPerDay.push(data[key]);
      }

      console.log(labels);
      console.log(casesPerDay);

      this.visuals[0].chartData = {
        labels: labels,
        datasets: [
          {
            label: "Всего случаев",
            backgroundColor: "",
            data: casesPerDay,
          },
        ],
      };
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
