<template>
  <div ref="erc-br" class="erc-br"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ErcBar extends Vue {
  option: Object = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
    });
  }
  initEcharts() {
    let chart: any = this.$echarts.init(this.$refs["erc-br"] as
      | HTMLCanvasElement
      | HTMLDivElement);
    chart.setOption(this.option);
  }
}
</script>
<style lang="scss" scoped>
.erc-br {
  width: 20rem;
  height: 20rem;
}
</style>