<template>
  <div class="coursesCollect">
    <div class="coursesCollect-header">
      <div class="title_cls">课程收藏榜TOP5</div>
      <div class="coursesCollect-container_header_handle">
        <span
          :class="handleActiveClass = handleActive === 'month' ? 'handleactive':'handleunactive'"
          @click="switchData('month')"
        >月</span>
        <a-divider type="vertical"></a-divider>
        <span
          :class="handleActiveClass = handleActive === 'all' ? 'handleactive':'handleunactive'"
          @click="switchData('all')"
        >全部</span>
      </div>
    </div>
    <div class="coursesCollect-content">
      <div class="coursesCollect-content-item" ref="coursesCollect"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getCoursesCollect } from "@/request/resource";

@Component({})
export default class CurriculumCollect extends Vue {
  private handleActive: String = "month";
  private handleActiveClass: String = "handleactive";
  private erc: any;

  @Getter("BrowserUpdate") BrowserUpdate: number;

  @Watch("BrowserUpdate")
  public onBrowserUpdateChanged(newValue: number, oldValue: number) {
    if (newValue) {
      this.erc.resize();
    }
  }
  public switchData(type: String): void {
    this.handleActive = type;
    this.getCoursesCollectData(type);
  }
  mounted(): void {
    this.$nextTick(() => {
      this.getCoursesCollectData();
    });
  }
  public getCoursesCollectData(type: String = "month") {
    getCoursesCollect({ type }).then(res => {
      if (res.code == 0) {
        this.initEcharts(res.data);
      }
    });
  }
  public initEcharts(data: any): void {
    this.erc = this.$echarts.init(this.$refs["coursesCollect"]);
    this.erc.setOption(this.initEchartsOption(data));
  }

  public initEchartsOption(data: any) {
    const opt: any = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "5%",
        left: "-8%",
        right: "10%",
        bottom: "-8%",
        containLabel: true
      },
      xAxis: [
        {
          show: false
        }
      ],
      yAxis: [
        {
          triggerEvent: true,
          show: true,
          inverse: true,
          data: this.$utils.getArrayValue(data, "name"),
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: "left",
            margin: 100,
            rich: {
              idx0: {
                color: "#FA0000"
              },
              idx1: {
                color: "#FEAF04"
              },
              idx2: {
                color: "#04BAFD"
              },
              title: {
                color: "#fff"
              }
            },
            formatter: function(value: String, index: number) {
              if (value.length > 4) value = value.substr(0, 4) + "..";
              if (index < 3) {
                return (
                  "{idx" +
                  index +
                  "|TOP" +
                  (1 + index) +
                  "}  {title|" +
                  value +
                  "}"
                );
              } else {
                return "{title|TOP" + (1 + index) + "}  {title|" + value + "}";
              }
            }
          }
        }
      ],
      series: [
        {
          name: "数量",
          type: "bar",
          label: {
            normal: {
              position: "right",
              show: true,
              color: "#3FE9FD",
              formatter: "{c}"
            }
          },
          barMaxWidth: 12,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#D09343" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#B06FDE" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          data: data
        }
      ]
    };
    return opt;
  }
}
</script>

<style lang="scss" scoped>
.coursesCollect {
  padding: 0 1rem;
  .coursesCollect-header {
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
    .coursesCollect-container_header_handle {
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
  .coursesCollect-content {
    .coursesCollect-content-item {
      height: 12rem;
      width: 100%;
    }
  }
}
</style>