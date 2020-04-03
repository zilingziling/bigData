<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <div class="compatibility-item" v-if="tipTextShow">
        <div class="compatibility-info">
          <img src="./../assets/images/warning.png" alt="警告" />
          <span>当前分辨率可能存在兼容性问题，推荐使用1920*1080分辨率访问。</span>
        </div>
        <div class="compatibility-handle">
          <a class="close" href="javascript:void(0)" @click="click(2)">X</a>
        </div>
      </div>
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { mapActions, mapGetters } from "vuex";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
@Component({})
export default class Main extends Vue {
  locale: any = zhCN;
  compatibility: boolean = false;
  tipTextShow: boolean = window.innerWidth < 1800;
  browserDebounceFn: any = this.$utils.debounce(this.updateBrowser, 500);
  @Action("Updated_Browser") Updated_Browser: Function;
  @Getter("BrowserUpdate") BrowserUpdate: number;

  mounted() {
    this.registerBrowserResize();
    this.tipTextShow = window.innerWidth < 1800;
  }
  click(num: number): void {
    if (num == 1) {
      this.compatibility = false;
    } else {
      this.tipTextShow = false;
    }
  }
  registerBrowserResize(): void {
    window.addEventListener("resize", this.browserDebounceFn);
  }
  updateBrowser(e: any): void {
    this.tipTextShow = window.innerWidth < 1800;
    this.Updated_Browser(e.timeStamp);
  }
}
</script>
<style lang="scss">
#app {
  font-family: "微软雅黑", simsun, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f4f4f4;
  .compatibility-item {
    background: #3ba5fe;
    color: #fff;
    height: 3rem;
    font-size: 1.13rem;
    width: 100%;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #fff;
    .compatibility-info {
      display: inline-flex;
      align-items: center;
      img {
        margin-right: 0.8rem;
      }
    }
    .compatibility-handle {
      display: inline-flex;
      align-items: center;
      img {
        height: 2rem;
        width: 2rem;
      }
      a {
        color: #fff;
        margin-left: 0.5rem;
      }
      .close {
        margin-left: 3rem;
      }
    }
  }
}
</style>
