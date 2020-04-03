<template>
  <div class="resourceIncrease">
    <div class="resourceIncrease-header">
      <div class="title_cls">资源增量</div>
      <div class="resourceIncrease-container_header_handle">
        <span
          :class="handleActiveClass = handleActive === 'week' ? 'handleactive':'handleunactive'"
          @click="switchData('week')"
        >周</span>
        <a-divider type="vertical"></a-divider>
        <span
          :class="handleActiveClass = handleActive !== 'week' ? 'handleactive':'handleunactive'"
          @click="switchData('month')"
        >月</span>
      </div>
    </div>
    <div class="resourceIncrease-content">
      <div class="resourceIncrease-content-item" ref="resourceIncrease"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getIncrease } from "@/request/resource";

const dpr = 1;

@Component({})
export default class AnnularPie extends Vue {
  private handleActive: String = "week";
  private handleActiveClass: String = "handleactive";
  private erc: any;

  @Getter("BrowserUpdate") BrowserUpdate: number;

  @Watch("BrowserUpdate")
  public onBrowserUpdateChanged(newValue: number, oldValue: number) {
    if (newValue) {
      this.erc.resize();
    }
  }
  mounted(): void {
    this.$nextTick(() => {
      this.getIncreaseData();
    });
  }
  public getIncreaseData(type: String = "week") {
    getIncrease({ type }).then(res => {
      if (res.code == 0) {
        this.initEcharts(res.data);
      }
    });
  }

  public initEcharts(data: any): void {
    this.erc = this.$echarts.init(this.$refs["resourceIncrease"]);
    this.erc.setOption(this.initEchartsOption(data));
  }

  public initEchartsOption(data: any) {
    const opt = {
      grid: {
        top: "12%",
        bottom: "15%",
        left: "5%",
        right: "5%"
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "none"
        },
        formatter: `{b}<br />
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>{a}: {c}`
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#65c6e733"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      xAxis: [
        {
          type: "category",
          data: this.$utils.getArrayValue(data, "name"),
          axisLabel: {
            color: "#50A2C1"
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: "#50A2C1"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "资源总量",
          type: "bar",
          barWidth: 10 * dpr,
          animation: false,
          label: {
            normal: {
              position: "top",
              show: true,
              color: "#3FE9FD",
              formatter: " {c}"
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#01F0FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#005559" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              barBorderRadius: [0, 0, 0, 0]
            }
          },
          data: this.$utils.getArrayValue(data, "value")
        },
        {
          animation: false,
          type: "bar",
          barWidth: 4 * dpr,
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#01F0FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#005559" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              barBorderRadius: [0, 0, 0, 0]
            }
          },
          data: this.$utils.getArrayValue(data, "value"),
          barGap: 0,
          legendHoverLink: false
        },
        {
          name: "资源总量",
          type: "pictorialBar",
          itemStyle: {
            normal: {
              color: "#01F0FF"
            }
          },
          animation: false,
          symbol: 'path://m50 0 l 90 0 l 0 30 l -140 0 z fill="#01F0FF"',
          symbolRotate: 0,
          symbolSize: ["14", "3"],
          symbolOffset: ["-0.1", "-3"],
          symbolPosition: "end",
          data: this.$utils.getArrayValue(data, "value"),
          z: 3
        }
      ]
    };
    return opt;
  }

  public switchData(type: String): void {
    this.handleActive = type;
    this.getIncreaseData(type);
  }
}
</script>

<style lang="scss" scoped>
.resourceIncrease {
  padding: 0 1rem;
  .resourceIncrease-header {
    height: 3rem;
    line-height: 4rem;
    font-size: 1.38rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(135, 240, 252, 1);
    display: flex;
    justify-content: space-between;
    .title_cls {
      &::before {
        content: ".";
        color: transparent;
        font-family: "SimSun";
        margin-right: 0.3rem;
        background: linear-gradient(
          0deg,
          rgba(138, 245, 255, 1),
          rgba(82, 157, 252, 1)
        );
        display: inline-block;
        line-height: 1;
        width: 0.25rem;
      }
    }
    .resourceIncrease-container_header_handle {
      color: #87f0fc;
      font-size: 1rem;
      span.handleactive {
        color: #8af5ff;
        font-size: 1.1rem;
        text-shadow: 0 0 1rem #fff;
      }
      span {
        color: #fff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .resourceIncrease-content {
    .resourceIncrease-content-item {
      height: 12rem;
      width: 100%;
    }
  }
}
</style>
