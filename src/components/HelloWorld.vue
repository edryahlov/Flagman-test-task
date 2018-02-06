<template>
    <div class="container">
        <div class="row">
            <div class="col-6" v-for="(item, index) in result.active" v-bind:key="index">
                <div class="card">
                    <div class="card-header bg-secondary text-white">Key: {{ item.Key }}</div>
                    <div class="card-body">
                        "ShopId":{{ item.ShopId }}, // id магазина<br/>
                        "YmlcatalogId": {{ item.YmlcatalogId }}<br/>
                        "Mode": {{ item.Mode }}, // режим задачи<br/>
                        "StartTime": {{ convertDate(item.StartTime) }}, // время старта<br/>
                        "UpdateTime": {{ convertDate(item.UpdateTime) }}, // врем обновления<br/>
                        "Runtime": {{ convertRunTime(item.Runtime) }}<!--, // время выполнения в наносекундах (9 единиц после запятой)--><br/>

                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: + progress(item.Total,item.Offset) + '%'}">
                                {{ progress(item.Total,item.Offset) }}%
                            </div>
                        </div>

                        "Insert"/"Update": {{ item.Insert }}/{{ item.Update }}, // добавлено новых элементов<br/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dashboard',

  data: function () {
    return {
      result: [],
      timer: null,
      interval: 2000
    }
  },

  created () {
    console.clear()
    this.getXXX()
    this.timer = setInterval(this.getXXX, this.interval)
  },

  methods: {
    addZeros: function (val, digits = 2) {
      return ('0' + val).slice(-digits)
    },

    progress: function (val1, val2) {
      return Math.floor(100 / val1 * val2)
    },

    convertDate: function (val) {
      let date = new Date(val)
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} - ${this.addZeros(date.getHours())}:${this.addZeros(date.getMinutes())}:${this.addZeros(date.getSeconds())}`
    },

    convertRunTime: function (val) {
      val = Math.floor(val / 1000000000)
      let hh = ~~(val / (60 * 60))
      let mm = ~~(val / 60 % 60)
      let ss = ~~(val % 60)

      return `${hh} ч., ${mm} мин., ${ss} сек.`
    },

    getXXX: function () {
      fetch('http://localhost:3000/db')
        .then(response => response.json())
        .then(json => { this.result = json })
    }
  },

  beforeDestroy () {
    clearInterval(this.timer)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
