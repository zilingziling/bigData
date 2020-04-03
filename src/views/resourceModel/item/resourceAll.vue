<template>
  <div class="resourceAll">
    <div class="resourceAll-header">
      <div class="title_cls">资源总量趋势</div>
      <div class="resourceAll-container_header_handle">
        <span
          :class="handleActiveClass = handleActive === 'week' ? 'handleactive':'handleunactive'"
          @click="switchData('week')"
        >周</span>
        <a-divider type="vertical"></a-divider>
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
    <div class="resourceAll-content">
      <div class="resourceAll-content-item" ref="resourceAll"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getAllResource } from "@/request/resource";

@Component({})
export default class ResourceAll extends Vue {
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

  public switchData(type: String): void {
    this.handleActive = type;
    this.getAllResourceData(type);
  }

  mounted(): void {
    this.$nextTick(() => {
      this.getAllResourceData();
    });
  }
  public getAllResourceData(type: String = "week") {
    getAllResource({ type }).then(res => {
      if (res.code == 0) {
        this.initEcharts(res.data);
      }
    });
  }

  public initEcharts(data: any): void {
    this.erc = this.$echarts.init(this.$refs["resourceAll"]);
    this.erc.setOption(this.initEchartsOption(data));
  }

  public initEchartsOption(data: any): Object {
    let opt: any = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255,255,255,0)" // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(255,255,255,1)" // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(255,255,255,0)" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      },
      grid: {
        top: "12%",
        left: "1%",
        right: "1%",
        bottom: "5%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: "rgba(101,198,231,0.4)"
            }
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置
            textStyle: {
              color: "#50A2C1"
            }
          },
          axisTick: {
            show: false
          },
          data: this.$utils.getArrayValue(data, "name")
        }
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#58ADF5"
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: "资源总量趋势",
          type: "line",
          showAllSymbol: true,
          lineStyle: {
            normal: {
              color: "#53fdfe" // 线条颜色
            },
            borderColor: "#f0f"
          },
          label: {
            show: false,
            position: "top",
            textStyle: {
              color: "#fff"
            }
          },
          itemStyle: {
            normal: {
              color: "rgba(255,255,255,1)"
            }
          },
          tooltip: {
            show: true
          },
          areaStyle: {
            //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,150,239,0.3)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,253,252,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: this.$utils.getArrayValue(data, "value")
        }
      ]
    };
    return opt;
  }
}
</script>

<style lang="scss" scope>
.resourceAll {
  padding: 0 1rem;
  .resourceAll-header {
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
    .resourceAll-container_header_handle {
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
  .resourceAll-content {
    .resourceAll-content-item {
      height: 12rem;
      width: 100%;
    }
  }
}
</style>