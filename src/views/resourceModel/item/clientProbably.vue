<template>
  <div class="clientProbably">
    <div class="clientProbably-header">
      <div class="title_cls">平台概况</div>
    </div>
    <div class="clientProbably-content">
      <div class="clientProbably-content-item" ref="clientProbably">
        <template v-for="(item,index) in ProbablyList">
          <div
            :key="item.name+index"
            :class="'item-bubble item-bubble'+$utils.randomNum(1, 4)"
            :style="{width:item.width,height:item.height,top:item.top,left:item.left,animationDuration:item.animation}"
          >
            <div
              class="item-bubblebg"
              :style="{background:item.background,zIndex:item.z-1,animationDuration:item.animation}"
            ></div>
            <div class="item-bubbletext" :style="{zIndex:item.z}">
              <p class="item-bubblenum" :style="{fontSize:item.fontsizenum}">{{item.value}}</p>
              <p class="item-bubbleinfo" :style="{fontSize:item.fontsizetext}">{{item.name}}</p>
            </div>
          </div>
        </template>
        <div
          :class="'item-bubble item-bubble'+$utils.randomNum(1, 4)"
          style="width:2.5rem;height:2.5rem;top:85%;left:50%;animationDuration:10s"
        >
          <div class="item-bubblebg" style="background:#19A572;zIndex:1;animationDuration:10s"></div>
          <div class="item-bubbletext" style="zIndex:1">
            <p class="item-bubblenum"></p>
            <p class="item-bubbleinfo"></p>
          </div>
        </div>
        <div
          :class="'item-bubble item-bubble'+$utils.randomNum(1, 4)"
          style="width:2rem;height:2rem;top:80%;left:90%;animationDuration:10s"
        >
          <div class="item-bubblebg" style="background:#67AE19;zIndex:1;animationDuration:10s"></div>
          <div class="item-bubbletext" style="zIndex:1">
            <p class="item-bubblenum"></p>
            <p class="item-bubbleinfo"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getClientProbably } from "@/request/resource";
interface ProbablyObj {
  name: String;
  value: number;
}
@Component({})
export default class ClientProbably extends Vue {
  private ProbablyList: Array<ProbablyObj> = [];
  mounted() {
    this.$nextTick(() => {
      this.getClientProbablyData();
    });
  }
  public getClientProbablyData() {
    getClientProbably().then(res => {
      if (res.code == 0) {
        this.ProbablyList = this.formateProbablyObj(res.data);
      }
    });
  }
  public formateProbablyObj(data: Array<ProbablyObj>) {
    const color: Array<String> = [
      "#1B9BFF",
      "#2DCAFF",
      "#67AE19",
      "#A95FEF",
      "#E9CD2E",
      "#5A37CC",
      "#19A572",
      "#A95FEF"
    ];
    const position: Array<any> = [
      {
        top: "8%",
        left: "10%"
      },
      {
        top: "2%",
        left: "36%"
      },
      {
        top: "60%",
        left: "5%"
      },
      {
        top: "60%",
        left: "25%"
      },
      {
        top: "5%",
        left: "65%"
      },
      {
        top: "33%",
        left: "85%"
      },
      {
        top: "60%",
        left: "70%"
      },
      {
        top: "40%",
        left: "45%"
      }
    ];

    const arr = data.map((item, index) => {
      let text = item.name;
      let value = String(item.value);
      let diff = String(item.value).length - text.length;
      let length;
      if (diff > 0) {
        length = String(item.value).length;
      } else {
        length = text.length;
      }
      return {
        name: item.name,
        value: item.value,
        width: length * 1.4 + "rem",
        height: length * 1.4 + "rem",
        top: position[index].top,
        left: position[index].left,
        fontsizenum: 1.8 + "rem",
        fontsizetext: "1rem",
        background: color[index],
        animation: this.$utils.randomNum(10, 13) + "s",
        z: index + 2
      };
    });
    return arr;
  }
}
</script>

<style lang="scss" scoped>
.clientProbably {
  padding: 0 1rem;
  .clientProbably-header {
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
  }
  .clientProbably-content {
    .clientProbably-content-item {
      height: 21rem;
      width: 100%;
      position: relative;
      .item-bubble {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        cursor: pointer;
        &:hover {
          .item-bubblebg {
            box-shadow: 0rem 0rem 2rem 0rem rgba(255, 255, 255, 0.3);
          }
        }
        .item-bubblebg {
          display: inline-block;
          width: inherit;
          height: inherit;
          border-radius: 45% 48% 46% 46%;
          box-shadow: 0rem 0rem 1rem 0rem rgba(255, 255, 255, 0.3);
          position: absolute;
          animation: rotate linear infinite;
        }
      }
      .item-bubble1 {
        animation: translatebubble1 linear infinite;
      }
      .item-bubble2 {
        animation: translatebubble1 linear infinite;
      }
      .item-bubble3 {
        animation: translatebubble1 linear infinite;
      }
      .item-bubble4 {
        animation: translatebubble1 linear infinite;
      }
    }
  }
}
@keyframes translatebubble1 {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(-3px, -3px);
  }
  50% {
    transform: translate(0px, -6px);
  }
  75% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes translatebubble2 {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(3px, -3px);
  }
  50% {
    transform: translate(0px, -6px);
  }
  75% {
    transform: translate(-3px, -3px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes translatebubble3 {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(3px, 3px);
  }
  50% {
    transform: translate(0px, 6px);
  }
  75% {
    transform: translate(-3px, 3px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes translatebubble4 {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(-3px, 3px);
  }
  50% {
    transform: translate(0px, 6px);
  }
  75% {
    transform: translate(3px, 3px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>