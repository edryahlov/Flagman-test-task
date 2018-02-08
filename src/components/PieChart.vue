<template>
    <div class="small">
        <pie-chart :chart-data="datacollection"></pie-chart>
    </div>
</template>

<script>
import PieChart from '../PieChart.js'

export default {
  components: {
    PieChart
  },
  name: 'chart',
  data () {
    return {
      datacollection: null,
      vals: []
    }
  },
  props: ['val'],
  mounted () {
    this.fillData()
  },
  watch: {
    'val': {
      handler: function (newData, oldData) {
        if (newData !== oldData) this.fillData()
      },
      deep: true
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [`Insert ${this.val[0]}`, `Update ${this.val[1]}`],
        datasets: [
          {
            backgroundColor: ['#085f89', '#989898'],
            data: [this.val[0], this.val[1]]
          }
        ]
      }
    }
  }
}
</script>

<style>
    .small {
        max-width: 600px;
        margin:  0 auto;
    }
</style>
