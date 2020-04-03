<template>
  <div class="unfind_contaiber">
    <svg
      width="380px"
      height="500px"
      viewBox="0 0 837 1045"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
    >
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        sketch:type="MSPage"
      >
        <path
          d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
          id="Polygon-1"
          stroke="#007FB2"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        />
        <path
          d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
          id="Polygon-2"
          stroke="#EF4A5B"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        />
        <path
          d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
          id="Polygon-3"
          stroke="#795D9C"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        />
        <path
          d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
          id="Polygon-4"
          stroke="#F2773F"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        />
        <path
          d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
          id="Polygon-5"
          stroke="#36B455"
          stroke-width="6"
          sketch:type="MSShapeGroup"
        />
      </g>
    </svg>
    <div class="message-box">
      <h1>404</h1>
      <p>暂时未能找到你查找的页面</p>
      <p>可能输入的网址错误或此页面不存在</p>
      <p>
        <span style="color:red">{{timer}}</span>
        S后自动跳转到首页
        <a @click="routeClick">立即跳转</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Index extends Vue {
  private timer: number = 5;
  private timerId: number = 0;
  mounted() {
    this.$nextTick(() => {
      this.initTimer();
    });
  }
  initTimer() {
    clearInterval(this.timerId);
    this.timerId = 0;
    this.timer = 5;
    this.timerId = setInterval(() => {
      if (this.timer === 1) {
        clearTimeout(this.timerId);
        this.$router.push({ name: "base" });
      }
      this.timer = this.timer - 1;
    }, 1000);
  }
  routeClick() {
    clearInterval(this.timerId);
    this.$router.push({ name: "base" });
  }
}
</script>

<style lang="scss" scoped>
.unfind_contaiber {
  color: #fff;
  height: calc(100vh - 8rem);
  p {
    line-height: 2rem;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -400px;
  }
  .message-box {
    height: 200px;
    width: 380px;
    position: absolute;
    top: 38%;
    left: 50%;
    color: #fff;
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
  }
  .message-box h1 {
    color: #fff;
    font-size: 60px;
    line-height: 46px;
    margin-bottom: 40px;
  }
  .buttons-con {
    margin-top: 3rem;
  }

  #Polygon-1,
  #Polygon-2,
  #Polygon-3,
  #Polygon-4,
  #Polygon-4,
  #Polygon-5 {
    -webkit-animation: float 1s infinite ease-in-out alternate;
    animation: float 1s infinite ease-in-out alternate;
  }
  #Polygon-2 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  #Polygon-3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  #Polygon-4 {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  #Polygon-5 {
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  @keyframes float {
    100% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
    }
  }
  @media (max-width: 450px) {
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -190px;
    }
    .message-box {
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -190px;
      text-align: center;
    }
  }
}
</style>