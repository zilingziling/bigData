<template>
  <div class="home">
    <div class="echarts-map" ref="echarts-map"></div>
    <div class="echarts-baritem">
      <ErcBar />
    </div>
  </div>
</template>
<script lang="ts">
import "echarts/extension/bmap/bmap";
import { Vue, Component } from "vue-property-decorator";
import ErcBar from "./item/echartTest.vue";

interface ToolTip {
  componentType: String;
  seriesType: string;
  seriesIndex: number;
  seriesName: string;
  name: string;
  dataIndex: number;
  data: Object;
  value: Array<any>;
  encode: Object;
  dimensionNames: Array<String>;
  dimensionIndex: number;
  color: string;
  percent: number;
}

@Component({
  components: {
    ErcBar
  }
})
export default class MapModel extends Vue {
  adata: Array<any> = [
    { name: "cangxi", value: 20 },
    { name: "chengjiao", value: 30 },
    { name: "shiyan", value: 25 },
    { name: "qiping", value: 24 },
    { name: "guangyuan", value: 15 },
    { name: "chaotian", value: 35 },
    { name: "wangcang", value: 28 },
    { name: "jiange", value: 20 },
    { name: "qingchuan", value: 19 },
    { name: "lizhou", value: 22 }
  ];
  geoCoordMap: any = {
    cangxi: {
      name: "苍溪中学",
      id: 1,
      location: [105.944903, 31.740402]
    },
    chengjiao: {
      name: "苍溪县城郊中学",
      id: 2,
      location: [105.942323, 31.743137]
    },
    shiyan: {
      name: "苍溪县实验中学",
      id: 3,
      location: [105.941288, 31.744075]
    },
    qiping: {
      name: "苍溪县歧坪中学",
      id: 4,
      location: [106.155946, 31.89339]
    },
    guangyuan: {
      name: "广元中学",
      id: 5,
      location: [105.855455, 32.442221]
    },
    chaotian: {
      name: "朝天中学",
      id: 6,
      location: [105.899062, 32.651727]
    },
    wangcang: {
      name: "旺苍中学",
      id: 7,
      location: [106.303969, 32.233332]
    },
    jiange: {
      name: "剑阁中学",
      id: 8,
      location: [105.480783, 32.043786]
    },
    qingchuan: {
      name: "青川中学",
      id: 9,
      location: [105.230166, 32.574446]
    },
    lizhou: {
      name: "利州中学",
      id: 10,
      location: [105.843792, 32.436472]
    }
  };

  option: any = {
    tooltip: {
      trigger: "item"
    },
    bmap: {
      center: [105.855455, 32.442221],
      zoom: 11,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#021019"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#147a92"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#0b3d51"
            }
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#08304b"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#08304b"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -70
            }
          },
          {
            featureType: "building",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#857f7f"
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#000000"
            }
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#022338"
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#062032"
            }
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#1e1c1c"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#022338"
            }
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "all",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2da0c6",
              visibility: "on"
            }
          }
        ]
      }
    },
    series: []
  };

  mounted() {
    this.$nextTick(() => this.initEcharts());
  }
  initEcharts() {
    let chart: any = this.$echarts.init(this.$refs["echarts-map"] as
      | HTMLCanvasElement
      | HTMLDivElement);
    let series: Array<Object> = [
      {
        name: "详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        data: this.convertData(this.adata),
        symbolSize: function(val: Array<any>) {
          return 30;
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#00e5ff",
            shadowBlur: 10,
            shadowColor: "#333"
          }
        },
        tooltip: {
          formatter: (params: ToolTip, ticket: string) => {
            return "上课教室：" + params.value[2];
          }
        },
        zlevel: 1
      }
    ];
    this.option.series = series;
    chart.on("click", (params: ToolTip) => {
      console.log("当前点击对象", params);
      alert("上课教室有：" + params.value[2] + "间");
    });
    chart.setOption(this.option);
  }

  convertData(data: Array<any>) {
    var res: Array<any> = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord: any = this.geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: geoCoord.name,
          value: geoCoord.location.concat(data[i].value)
        });
      }
    }
    return res;
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  .echarts-map {
    width: 100%;
    height: calc(100vh - 7rem);
  }
  .echarts-baritem {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background: rgba(78, 102, 107, 0.5);
  }
}
</style>