<template>
  <main class="pa-3">
    <section>
    <h1 class="display-1 pa-3" align="center">Статистика по миру</h1>
    <v-row align="center" justify="center">
    <stat-card 
    v-for="card in cards" :key="card"
    :cardTitle="card.title"
    :bgColor="card.bgColor" 
    :cardAmount="card.amount" 
    :cardAmountNew="card.amountNew" 
    :cardIcon="card.icon"/>
    </v-row>
    </section>
    <section>
      <h2 class="display-1 pa-3" align="center">Графики</h2>
      <div class="small">
      <line-chart v-for="visual in visuals" :key="visual" :chart-data="visual.chartData" :options="visual.option"></line-chart>
    </div>
    </section>
  </main>
</template>

<script>
import StatCard from './StatCard'
import LineChart from './lineChart'

export default {
  name: "HelloWorld",
  data() {
    return {
      cards: [
        { title: 'Всего случаев', bgColor: 'grey darken-4',
         amount: '1000', amountNew: '200',
          icon: 'mdi-alert-decagram-outline' },          
        { title: 'Смертность', bgColor: 'grey darken-4',
         amount: '1000', amountNew: '200',
          icon: 'mdi-emoticon-dead-outline' },
        { title: 'Выздоровели', bgColor: 'grey darken-4',
         amount: '1000', amountNew: '200',
          icon: 'mdi-hospital-building' },
      ],
      visuals: [{
        chartData:{
          labels: ['Январь', 'Февраль', 'Март','Апрель','Май','Июнь','Июль'],
          datasets: [{
            label: 'С января 2021 года',
            backgroundColor: '#f87979',
            data:[40,39,10,40,39,80,40]
          }]
        },
        options: { responsive: true, maintainAspectRatio: false}
      }]
    }
  },
  components: {
    StatCard,
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
  width:100%;
  height: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
