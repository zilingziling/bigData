<template>
  <div class="coursesScore">
    <div class="coursesScore-header">
      <div class="title_cls">课程分值分布及高分课程</div>
      <div class="coursesScore-container_header_handle">
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
    <div class="coursesScore-content">
      <div class="coursesScore-content-item">
        <div class="coursesScore-content-pie" ref="coursesScore"></div>
        <transition name="fade">
          <div class="coursesScore-content-item_bottom" v-if="listshow">
            <template v-for="item in coursesScoreList">
              <div class="bottom_list_item" :key="item.id">
                <div class="bottomitem_name">{{item.name}}</div>
                <div class="bottomitem_score">{{item.score}}分</div>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getCoursesScore } from "@/request/resource";
interface scoreObj {
  name: String;
  value: String;
  id: number;
}
@Component({})
export default class CurriculumScore extends Vue {
  private handleActive: String = "month";
  private handleActiveClass: String = "handleactive";
  private coursesScoreList: Array<scoreObj> = [];
  private erc: any;
  private listshow: boolean = false;

  @Getter("BrowserUpdate") BrowserUpdate: number;

  @Watch("BrowserUpdate")
  public onBrowserUpdateChanged(newValue: number, oldValue: number) {
    if (newValue) {
      this.erc.resize();
    }
  }

  public switchData(type: String): void {
    this.listshow = false;
    this.handleActive = type;
    this.getCoursesScoreData(type);
  }

  mounted(): void {
    this.$nextTick(() => {
      this.getCoursesScoreData();
    });
  }
  public getCoursesScoreData(type: String = "month") {
    getCoursesScore({ type }).then(res => {
      if (res.code == 0) {
        this.initEcharts(res.data.statistics);
        this.coursesScoreList = this.formatTeacherList(res.data.rank);
        this.listshow = true;
      }
    });
  }
  public initEcharts(data: any): void {
    this.erc = this.$echarts.init(this.$refs["coursesScore"]);
    this.erc.setOption(this.initEchartsOption(this.formateData(data)));
  }
  public initEchartsOption(data: any) {
    const color: Array<String> = [
      "#F96D65",
      "#FA9B22",
      "#005CD9",
      "#3CD5B3",
      "#A176FF",
      "#FFAD05"
    ];
    const opt: any = {
      color,
      grid: {
        left: "1%",
        right: "5%",
        bottom: "15%",
        top: "2%",
        containLabel: true
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vartical",
        top: "center",
        right: "10%",
        itemHeight: 10,
        itemGap: 14,
        textStyle: {
          color: "#A3E2F4",
          fontSize: 14,
          fontWeight: 0
        },
        data: this.getLegendData(data, color)
      },
      polar: {
        center: ["30%", "50%"]
      },
      angleAxis: {
        interval: 1,
        type: "category",
        data: [],
        z: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B4A6B",
            width: 1,
            type: "solid"
          }
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: "#0B4A6B",
          margin: 8,
          fontSize: 16
        }
      },
      radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B3E5E",
            width: 1,
            type: "solid"
          }
        },
        axisLabel: {
          formatter: "{value} %",
          show: false,
          padding: [0, 0, 20, 0],
          color: "#0B3E5E",
          fontSize: 16
        },
        splitLine: {
          lineStyle: {
            color: "#0B3E5E",
            width: 2,
            type: "solid"
          }
        }
      },
      calculable: true,
      series: [
        {
          /**
           * 样式圆环
           */
          type: "pie",
          radius: ["0%", "20%"],
          center: ["30%", "50%"],
          hoverAnimation: false,
          silent: true,
          tooltip: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: [
            {
              name: "",
              value: 0,
              itemStyle: {
                normal: {
                  color: "#000"
                }
              }
            }
          ]
        },
        {
          /**
           * 样式圆环
           */
          type: "pie",
          radius: ["4%", "5.5%"],
          center: ["30%", "50%"],
          hoverAnimation: false,
          silent: true,
          tooltip: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: [
            {
              name: "",
              value: 0,
              itemStyle: {
                normal: {
                  color: "#fff"
                }
              }
            }
          ]
        },
        {
          /**
           * 样式圆环
           */
          type: "pie",
          radius: ["11%", "13%"],
          center: ["30%", "50%"],
          hoverAnimation: false,
          silent: true,
          tooltip: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: [
            {
              name: "",
              value: 0,
              itemStyle: {
                normal: {
                  color: "#fff"
                }
              }
            }
          ]
        },
        {
          /**
           * 样式圆环
           */
          type: "pie",
          radius: ["88%", "90%"],
          center: ["30%", "50%"],
          hoverAnimation: false,
          silent: true,
          tooltip: {
            show: false
          },
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          name: "",
          data: [
            {
              name: "",
              value: 0,
              itemStyle: {
                normal: {
                  color: "#0B4A6B"
                }
              }
            }
          ]
        },
        {
          /**
           * 蓝丁格尔图
           */
          stack: "a",
          type: "pie",
          radius: ["20%", "72%"],
          center: ["30%", "50%"],
          roseType: "radius",
          zlevel: 10,
          label: {
            normal: {
              show: false,
              formatter: "{c}",
              textStyle: {
                fontSize: 12
              },
              position: "outside"
            }
          },
          labelLine: {
            normal: {
              show: false,
              length: 20,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          data: data
        }
      ]
    };
    return opt;
  }

  public formateData(data: Array<any>) {
    const color: Array<any> = [
      {
        offset0: "#F96D65",
        offset1: "#FE5046"
      },
      {
        offset0: "#FA9B22",
        offset1: "#FC4936"
      },
      {
        offset0: "#5A9FFE",
        offset1: "#227FFD"
      },
      {
        offset0: "#6BF8D9",
        offset1: "#03C499"
      },
      {
        offset0: "#C6ADFD",
        offset1: "#AB53FF"
      }
    ];
    return data.map((item, index) => {
      return {
        name: item.name,
        value: item.value,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color[index].offset0 // 0% 处的颜色
              },
              {
                offset: 1,
                color: color[index].offset1 // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      };
    });
  }
  public getLegendData(data: Array<any>, color: Array<String>): Array<any> {
    return data.map((item, index) => {
      return {
        name: item.name,
        textStyle: {
          color: color[index]
        }
      };
    });
  }
  public formatTeacherList(data: Array<any>): Array<any> {
    let arr = data.map((item, index) => {
      return {
        name: item.name,
        score: item.value,
        id: item.name + item.value + index
      };
    });
    if (arr.length < 5) {
      const l = arr.length;
      for (let i = 0; i < 5 - l; i++) {
        arr.push({
          name: "无",
          score: 0,
          id: "暂无" + i
        });
      }
    }
    return arr;
  }
}
</script>

<style lang="scss" scoped>
/**
    * 定义进入动画和退出动画的过程
    * 代表关注的是height的变化，动画的时间是5
    */
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s;
}

/* 定义进入动画的初始状态*/
.fade-enter {
  top: 17rem;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
  top: 0;
}

/* 定义离开动画的初始状态*/
.fade-leave {
  opacity: 1;
}

/* 定义离开动画的结束状态*/
.fade-leave-to {
  opacity: 0;
}

.coursesScore {
  padding: 0 1rem;
  overflow: hidden;
  .coursesScore-header {
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
    .coursesScore-container_header_handle {
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
  .coursesScore-content {
    .coursesScore-content-item {
      height: 28rem;
      width: 100%;
      .coursesScore-content-pie {
        height: 11rem;
        display: flex;
        .score_top1 {
          padding-top: 3%;
          .topitem_ranking {
            color: #ff15c5;
          }
        }
        .score_top2,
        .score_top3 {
          padding-top: 9%;
          .topitem_ranking {
            color: #ac54ff;
          }
        }

        .score_topitem {
          flex: 1;

          .no1 {
            width: 4.13rem;
            height: 4.13rem;
            background: linear-gradient(
              135deg,
              rgba(221, 86, 188, 1),
              rgba(111, 72, 236, 1)
            );
            border-radius: 50%;
            line-height: 4.13rem;
          }
          .no2,
          .no3 {
            width: 3.44rem;
            height: 3.44rem;
            background: linear-gradient(
              135deg,
              rgba(45, 202, 255, 1),
              rgba(111, 72, 236, 1)
            );
            line-height: 3.44rem;
          }

          .topitem_ranking {
            font-size: 1.38rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
          }
          .topitem_forshort {
            border-radius: 50%;
            margin: auto;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .topitem_score {
            font-size: 1rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(17, 210, 251, 1);
          }
          .topitem_name {
            font-size: 0.88rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          div {
            margin-bottom: 0.3rem;
          }
        }
      }
      .coursesScore-content-item_bottom {
        height: 17rem;
        position: relative;
        .bottom_list_item {
          display: flex;
          height: 2.88rem;
          font-size: 0.88rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          align-items: center;
          justify-content: space-between;
          background: rgba(12, 54, 77, 0.2);
          box-shadow: 0rem 0rem 1rem 0rem rgba(21, 213, 241, 0.2) inset;
          //   opacity: 0.3;
          text-align: center;
          margin-bottom: 0.6rem;
          .bottomitem_name {
            color: rgba(255, 255, 255, 1);
            margin-left: 1rem;
          }
          .bottomitem_score {
            color: rgba(255, 255, 255, 1);
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}
</style>