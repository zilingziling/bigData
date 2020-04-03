<template>
  <div class="num">
    <Title title="报警数量统计" />
    <div ref="warnNum" class="warnNum"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Title from "@/components/Title/index.vue";
@Component({
  components: {
    Title
  }
})
export default class WarningNum extends Vue {
  public onClassChart: any;
  mounted() {
    this.initEcharts();
  }
  public initEcharts(): void {
    this.onClassChart = this.$echarts.init(this.$refs["warnNum"]);
    this.onClassChart.setOption(this.initEchartsOption());
  }
  public initEchartsOption(): void {
    let colors = [
      {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#01F0FF"
          },
          {
            offset: 0.5,
            color: "#01F0FF"
          },
          {
            offset: 0.5,
            color: "#005559"
          },
          {
            offset: 1,
            color: "#005559"
          }
        ]
      },
      {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#01F0FF"
          },
          {
            offset: 0.5,
            color: "#01F0FF"
          },
          {
            offset: 0.5,
            color: "rgb(1,153,164)"
          },
          {
            offset: 1,
            color: "rgb(1,153,164)"
          }
        ]
      }
    ];

    let barWidth = 20;
    const option:any = {
        grid:{
            x:8,
            y:25,
            x2:25,
            y2:35,

        },

      xAxis: {
        data: ["2011", "2011", "2011", "2011", "2011", "2011", "2011"],
          splitLine: {
              show: false,
          },
          axisLine: {

              lineStyle: {
                  color: '#6EA8C2', // 颜色
                  width:1 // 粗细
              }
          },
          axisLabel : {
              textStyle: { //改变刻度字体样式
                  color: '#50A2C1',
                  fontSize: 14
              }
          },
          axisTick: { // X轴线 刻度线
              show: true,
              length: 5,
              alignWithLabel: true,
              lineStyle: {
                  color: '#6EA8C2',
                  type: 'solid',
                  width: 2
              }
          },
      },
      yAxis: {

          axisLine: {
              show: false,//不显示坐标轴线
          },
          splitLine: {
              show: true,
              lineStyle:{
                  color: 'rgb(25,46,100)',
                  width: 1,
                  type: 'solid'
              }
          },
      },
      series: [
        {
          z: 1,
          type: "bar",
          barWidth: barWidth,
          data: [220, 182, 191, 234, 290, 330, 310],
          itemStyle: {
            normal: {
              color: colors[1]
            }
          }
        },
        {
          z: 2,
          name: "底部",
          type: "pictorialBar",
          data: [1, 1, 1, 1, 1, 1, 1],
          symbol: "diamond",
          symbolOffset: [0, "50%"],
          symbolSize: [barWidth, 10],
          itemStyle: {
            normal: {
              color: colors[1]
            }
          }
        },
        {
          z: 3,
          name: "上部1",
          type: "pictorialBar",
          symbolPosition: "end",
          data: [220, 182, 191, 234, 290, 330, 310],
          symbol: "diamond",
          symbolOffset: [0, "-50%"],
          symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
          itemStyle: {
            normal: {
              borderColor: "rgba(0,85,89,.2)",
              borderWidth: 2,
              color: "rgba(43,250,255,1)"
            }
          }
        }
      ]
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
    .num{
        .warnNum{
            width: 31rem;
            height: 17rem;
            margin-top: 1.5rem;
        }
    }
</style>
