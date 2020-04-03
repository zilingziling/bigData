<template>
  <div class="resourceStatistics">
    <div class="resourceStatistics-top">
      <div class="resourceStatistics-top-item">
        <div class="resourceStatistics-top-item_top">课程总量</div>
        <div class="resourceStatistics-top-item_bottom">
          <template v-for="(item,index) in CurriculumNum">
            <div class="resourceStatistics-top-item_bottom_num" :key="item+index">{{item}}</div>
          </template>
        </div>
      </div>
      <div class="resourceStatistics-top-item">
        <div class="resourceStatistics-top-item_top">播放总量</div>
        <div class="resourceStatistics-top-item_bottom">
          <template v-for="(item,index) in PlayNum">
            <div class="resourceStatistics-top-item_bottom_num" :key="item+index">{{item}}</div>
          </template>
        </div>
      </div>
    </div>
    <div class="resourceStatistics-center"></div>
    <div class="resourceStatistics-bottom">
      <div ref="subjects" class="resourceStatistics-bottom-item"></div>
      <div ref="curriculum" class="resourceStatistics-bottom-item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { getGross } from "@/request/resource";

interface pieItemObj {
  name: String;
  value: number;
}

interface pieOptions {
  series: Array<any>;
  yAxis: Array<any>;
  graphic: any;
}

@Component({})
export default class ResourceStatistics extends Vue {
  private CurriculumNum: Array<any> = ["0", "0", "0", "0", "0"];
  private PlayNum: Array<any> = ["0", "0", "0", "0", "0"];
  private erc: any;
  private erc2: any;
  private timeStamp: number;

  @Getter("BrowserUpdate") BrowserUpdate: number;

  @Watch("BrowserUpdate")
  public onBrowserUpdateChanged(newValue: number, oldValue: number) {
    if (newValue) {
      this.erc.resize();
      this.erc2.resize();
    }
  }
  mounted(): void {
    this.$nextTick(() => {
      this.getGrossData();
    });
  }
  public getGrossData() {
    getGross().then(res => {
      if (res.code == 0) {
        this.initExhibitionNum(
          res.data.totalClasses.value,
          res.data.totalPlay.value
        );
        this.initEcharts(res.data.top3ClassesList, res.data.top3PlayList);
      }
    });
  }

  public initEcharts(
    courseList: Array<pieItemObj>,
    playList: Array<pieItemObj>
  ): void {
    this.erc = this.$echarts.init(this.$refs["subjects"]);
    this.erc2 = this.$echarts.init(this.$refs["curriculum"]);
    this.erc.setOption(this.initEchartsOption(courseList, "科目课程量TOP3"));
    this.erc2.setOption(this.initEchartsOption(playList, "课程播放量TOP3"));
  }

  public initEchartsOption(arr: Array<pieItemObj>, title: String) {
    const opt = {
      graphic: this.getData(arr).graphic,
      title: {
        text: title,
        bottom: "1%",
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: 14,
          fontWeight: 400
        }
      },
      legend: {
        type: "scroll",
        show: true,
        icon: "circle",
        data: this.$utils.getArrayValue(arr, "name"),
        top: "8%",
        left: "center",
        itemGap: 15,
        itemWidth: 6,
        itemHeight: 6,
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{b}: {c}个"
      },
      color: ["#A094FF", "#BDF489", "#38C0FE"],
      grid: {
        bottom: "50.5%",
        left: "7%",
        right: "7%",
        containLabel: false
      },
      yAxis: [
        {
          show: false,
          type: "category",
          inverse: false
        }
      ],
      xAxis: [
        {
          type: "category",
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#3573fc5e",
              width: 2
            }
          },
          axisTick: {
            show: false,
            interval: 1,
            inside: true
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: "#fff",
              fontSize: 16
            },
            show: false
          },
          data: []
        }
      ],
      series: this.getData(arr).series
    };
    return opt;
  }

  public getData(data: Array<any>): pieOptions {
    let res: pieOptions = {
      series: [],
      yAxis: [],
      graphic: {
        elements: []
      }
    };
    let arrValue: Array<any> = this.$utils.getArrayValue(data, "value");
    let sumValue: number = eval(arrValue.join("+"));
    for (let i = 0; i < data.length; i++) {
      res.series.push({
        name: "",
        type: "pie",
        startAngle: 180,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [75 - i * 15 + "%", 67 - i * 15 + "%"],
        center: ["50%", "50%"],
        label: {
          show: false
        },
        markLine: {
          animation: false,
          data: [
            [
              {
                name: data[i].value + "个",
                symbol: "none",
                lineStyle: {
                  opacity: 0
                },
                x: "0",
                y: "40%"
              },
              {
                symbol: "none",
                lineStyle: {
                  opacity: 0
                },
                x: 28 + i * 7.5 + "%",
                y: 7.5 * (i + 3.8) + "%"
              }
            ]
          ],
          label: {
            color: "#ffffff"
          }
        },
        itemStyle: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          borderWidth: 5
        },
        data: [
          {
            value: data[i].value,
            name: data[i].name
          },
          {
            value: sumValue,
            // value: data[0].value,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }
        ]
      });
      res.series.push({
        name: "",
        type: "pie",
        silent: true,
        z: 1,
        startAngle: 180,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [75 - i * 15 + "%", 67 - i * 15 + "%"],
        center: ["50%", "50%"],
        label: {
          show: false
        },
        itemStyle: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          borderWidth: 5
        },
        data: [
          {
            value: 10,
            itemStyle: {
              color: "#395667",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          },
          {
            value: 10,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }
        ]
      });
      // res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + "%");
      res.graphic.elements.push({
        type: "polyline",
        top: 26 + i * 8 + "%",
        //26% 34% 42%
        left: 13 + i * 8 + "%",
        //13% 21% 29%
        shape: {
          // points: [[37, 93], [37, 40], [68, 40]]
          // points: [[55, 93], [55, 60], [88, 60]]
          // points: [[73, 93], [73, 80], [108, 80]]
          points: [
            [37 + i * 18, 119],
            [37 + i * 18, 65 + i * 20],
            [68 + i * 20, 65 + i * 20]
          ]
        },
        style: {
          stroke: "#3573FC"
        }
      });
    }
    return res;
  }

  public initExhibitionNum(course: number, play: number): void {
    this.CurriculumNum = this.formatNum(String(course));
    this.PlayNum = this.formatNum(String(play));
  }

  public formatNum(num: String): String[] {
    let arr: String[] = num.split("");
    if (arr.length < 5) {
      let count: number = 5 - arr.length;
      for (let i = 0; i < count; i++) {
        arr.unshift("0");
      }
    }
    return arr || [];
  }
}
</script>

<style lang="scss">
.resourceStatistics {
  padding: 1rem;
  .resourceStatistics-top {
    width: 100%;
    height: 8.1rem;
    display: flex;
    font-size: 0.99rem;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(160, 210, 227, 1);
    padding: 0 1rem;
    .resourceStatistics-top-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;

      .resourceStatistics-top-item_top {
        height: 2rem;
        background: url("./../../../assets/images/resource-top-title.png");
        background-size: 100% 100%;
        width: 10rem;
        line-height: 2rem;
        margin-bottom: 0.8rem;
      }
      .resourceStatistics-top-item_bottom {
        width: 10rem;
        height: 4.5rem;
        background: url("./../../../assets/images/resource-topleft-num.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .resourceStatistics-top-item_bottom_num {
          width: 1.5rem;
          height: 2rem;
          line-height: 2rem;
          font-size: 1.59rem;
          font-family: fantasy;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            0deg,
            rgba(0, 228, 255, 1) 17%,
            rgba(0, 186, 255, 1) 98%
          );
          margin-right: 2px;
          border-radius: 4px;
        }
      }
    }
  }
  .resourceStatistics-center {
    width: 10rem;
    height: 0.1rem;
    background: linear-gradient(to left, transparent, #1b9bff, transparent);
    background-size: 100%;
    margin: auto;
  }
  .resourceStatistics-bottom {
    display: flex;
    justify-content: space-between;
    .resourceStatistics-bottom-item {
      width: 49%;
      height: 15rem;
    }
  }
}
</style>