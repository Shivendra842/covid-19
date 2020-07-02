<template>
  <div>
    <div>
      <chart :options="option" :class="color" class="mb-2"></chart>
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
            }
          }
        ],
        series: [
          {
            name: this.name,
            type: "line",
            smooth: true,
            data: this.dataPoints
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
</style>
