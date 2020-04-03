<template>
  <div class="global-header">
    <div class="global-header_text" ref="headerText">
      <svg class="svgBox">
        <defs>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="10"
            x2="0"
            y2="50"
          >
            <stop offset="0" style="stop-color:rgba(138, 245, 255, 1)" />

            <stop offset="0.6" style="stop-color:rgba(138, 245, 255, 1)" />

            <stop offset="1" style="stop-color:rgba(82, 157, 252, 1)" />
          </linearGradient>
        </defs>
        <text
          text-anchor="start"
          :style="{fontSize:titleSize+'rem'}"
          x="0"
          y="95%"
        >{{system_title}}</text>
      </svg>
    </div>
    <div class="global-header_nav">
      <template v-for="item in navData">
        <router-link
          :key="item.id"
          :to="'/'+item.route"
          class="global-header_nav_item"
        >{{item.navname}}</router-link>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { routeData } from "@/request/user";
interface navObj {
  route: String;
  title: String;
  navname: String;
  id: number;
  [propName: string]: any;
}
@Component
export default class GlobalHeader extends Vue {
  private titleSize: number = 2.63;
  private navData: Array<navObj> = [];

  mounted() {
    this.$nextTick(() => {
      this.initNav();
    });
  }
  initNav() {
    routeData().then(res => {
      if (res.code == 0) {
        const routeinfo = res.data;
        if (!routeinfo.length) {
          this.$notification.error({
            message: "错误",
            description: `用户路由信息为空，即将返回登录页`
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 1500);
        } else {
          this.navData = this.formatNav(routeinfo);
        }
      }
    });
  }
  formatNav(data: Array<any>): Array<navObj> {
    let arr: Array<navObj> = [];
    data.forEach((item,index:number) => {
      item.routeList.forEach((v: any) => {
        arr.push({
          route: v.route,
          title: item.name,
          navname: v.name,
          id: v.route
        });
      });
    });
    return arr;
  }

  get system_title(): String {
    const obj: any = this.navData.find(
      (item: navObj) => item.route === this.$route.name
    );
    let title: String = "弈简大数据云平台";
    if (obj) title = obj.title;
    let length = title.length;
    let size = 21.5 / length;
    this.titleSize = size;
    return title;
  }

  click(): void {
    this.$router.push({ name: "index" });
  }
}
</script>

<style lang="scss" scoped>
.global-header {
  background: url("./../../assets/images/homeheader.png");
  background-size: 100% 100%;
  height: 6rem;
  position: relative;
  .global-header_text {
    width: 22rem;
    height: 3.63rem;
    margin: auto;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 4.62rem;

    // background: linear-gradient(
    //   0deg,
    //   rgba(138, 245, 255, 1) 5.82421875%,
    //   rgba(82, 157, 252, 1) 100%
    // );
    // background-clip: text;
    // color: #fff;
    // -webkit-text-fill-color: transparent;

    fill: url(#SVGID_1_);
    .svgBox {
      width: 100%;
      overflow: visible;
      height: inherit;
    }
  }

  .global-header_nav {
    display: flex;
    position: absolute;
    left: 1%;
    bottom: -17%;
    font-weight: 400;
    line-height: 2.62rem;
    .global-header_nav_item {
      display: inline-block;
      background: url("./../../assets/images/nav.png");
      background-size: 100% 100%;
      width: 6.55rem;
      height: 2.44rem;
      font-size: 1rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(2, 240, 255, 1);
      text-decoration-skip-ink: none;
      & + .global-header_nav_item {
        margin-left: -0.7rem;
      }
    }
    .router-link-active {
      background: url("./../../assets/images/nav-selected.png");
      background-size: 100% 100%;
      text-decoration: none;
    }
  }
}
</style>
