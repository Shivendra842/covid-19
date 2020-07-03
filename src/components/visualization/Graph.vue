<template>
  <div>
    <div class="chart-wrapper">
      <chart :options="option" :class="color" class="mb-2 mr-5"></chart>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppGraph",
  data() {
    return {
      option: {
        // color: colors,
        tooltip: {
          show: true,
          trigger: "axis",
          showContent: true,
          alwaysShowContent: true,
          axisPointer: {
            type: "none"
          },
          position: ["12%", "20%"]
        },

        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "black"
              }
            },
            data: this.dateLable
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
           position:'right',
          }
        ],
        series: [
          {
            name: this.name,
            type: "line",
            smooth: true,
            data: this.dataPoints,
          }
        ],
        color: this.color.split(" ")
      }
    };
  },
  props: {
    dataPoints: {
      type: Array
    },
    dateLable: {
      type: Array
    },
    name: {
      type: String
    },
    color: {
      type: String
    }
  }
};
</script>
<style scoped>
.chart-wrapper{
  width: 100%;
}

.echarts {
  height: 200px;
  width: 400px;
}
</style>
