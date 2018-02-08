<template>
    <div class="container">
        <div class="row col-12">
            Скорость обновления: &nbsp;&nbsp;&nbsp;
            <select v-model="selected">
                <option v-for="(val, key) in intervals" :value="val" :key="val.id">{{ key }}</option>
            </select>

        </div>
        <div class="row col-12">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: isActive }" href="javascript:void(0)" @click="nav('active')">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: !isActive }" href="javascript:void(0)" @click="nav('finish')">Finished</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12" v-for="item in result[type]" v-bind:key="item.id">
                <div class="card">
                    <div class="card-header bg-secondary text-white">Key: {{ item.Key }} ({{ type }})</div>
                    <div class="card-body">
                        "ShopId":{{ item.ShopId }}<br/>
                        "YmlcatalogId": {{ item.YmlcatalogId }}<br/>
                        "Mode": {{ item.Mode }}<br/>
                        "StartTime": {{ convertDate(item.StartTime) }}<br/>
                        "UpdateTime": {{ convertDate(item.UpdateTime) }}<br/>
                        "Runtime": {{ convertRunTime(item.Runtime) }}<br/>

                        <div class="card">
                            <div class="card-header bg-light text-black">Total/Offset progress</div>
                            <div class="card-body">

                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: + progress(item.Total,item.Offset) + '%'}">
                                        {{ progress(item.Total,item.Offset) }}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- "Insert"/"Update": {{ item.Insert }}/{{ item.Update }}, // добавлено новых элементов<br/>-->
                        <chart :val="[item.Insert, item.Update]"></chart>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dashboard',

  data () {
    return {
      result: [],
      timer: null,
      intervals: {'2 sec': 2000, '5 sec': 5000, '10 sec': 10000, '15 sec': 15000, '30 sec': 30000, '1 min': 60000, '2 min': 120000, '5 min': 30000, '10 min': 600000},
      selected: 2000,
      type: 'active',
      isActive: true
    }
  },

  created () {
    console.clear()
    this.loadJSON()
    this.timer = setInterval(this.loadJSON, this.selected)
  },

  watch: {
    selected: function () {
      clearInterval(this.timer)
      this.timer = setInterval(this.loadJSON, this.selected)
    }
  },

  mounted () {
  },

  methods: {
    nav: function (type) {
      this.type = type
      this.isActive = !this.isActive
    },

    addZeros: function (val, digits = 2) {
      return ('0' + val).slice(-digits)
    },

    progress: function (val1, val2) {
      return Math.floor(100 / val2 * val1) || 0
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

    loadJSON: function () {
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
    .nav {
        margin: 50px 0;
    }
    .card {
        margin-bottom: 20px;
    }
</style>
