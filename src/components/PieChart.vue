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
      let onePercent = this.val[1] / 100
      let insert = Math.floor(this.val[0] / onePercent) || 0
      let update = 100 - insert

      this.datacollection = {
        labels: [`Insert/Update progress: ${insert}%`],
        datasets: [
          {
            backgroundColor: ['#2f642f', '#d4d4d4'],
            data: [insert, update]
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
