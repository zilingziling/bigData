<template>
  <div class="admin-container">
    <a-layout>
      <a-layout-header class="admin-header">
        <div class="admin-header_top_logo">
          <div class="text-overflow_set">
            <img src="./../../assets/images/logo-blue.png" alt="弈简大数据管理平台" />
            <span>弈简大数据管理平台</span>
          </div>
          <div class="admin-header_top_menu">
            <a-menu mode="horizontal" @click="onClickTopNav" :selectedKeys="navcurrent">
              <!-- <template v-for="item in portalData">
              <a-menu-item :key="item.name">
                {{item.name}}
              </a-menu-item>
              </template>-->
              <a-menu-item key="admin">系统管理</a-menu-item>
            </a-menu>
          </div>
        </div>
        <div style="display:flex">
          <div
            class="text-overflow_set"
            style="margin-right:1rem;font-size:0.8rem;color:#fff;"
          >{{getUserInfo()}}</div>
          <a @click="onLogout" class="logout_hover text-overflow_set">退出登录</a>
        </div>
      </a-layout-header>
      <a-layout-content class="admin-content">
        <a-tabs type="card" class="admin-content-tab">
          <a-tab-pane tab="分组管理" key="1">
            <GroupManager />
          </a-tab-pane>
          <a-tab-pane tab="路由管理" key="2">
            <RouteManager />
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import GroupManager from "./item/groupManager.vue";
import RouteManager from "./item/routeManager.vue";

@Component({
  components: {
    GroupManager,
    RouteManager
  }
})
export default class Index extends Vue {
  private navcurrent: Array<String> = ["admin"];

  @Action("Logout") Logout: any;

  public onLogout() {
    const { Logout, $router, $ls }: any = this;
    const user = $ls.get("USER_INFO") || "";
    this.$confirm({
      title: `${user.username || ""} 是否退出登录？`,
      onOk() {
        Logout().then((res: any) => {
          $router.push({ name: "login" });
        });
      },
      onCancel() {}
    });
  }
  public onClickTopNav({ item, key, keyPath }: any) {
    this.navcurrent = [key];
  }
  public getUserInfo() {}
}
</script>

<style lang="scss" scoped>
.admin-container {
  .admin-header {
    height: 3rem;
    background-color: #12385a;
    text-align: left;
    padding-left: 3.5%;
    padding-right: 1%;
    color: #54acfe;
    height: 3rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .admin-header_top_logo {
      display: flex;
      width: 75%;
      line-height: 3rem;
      .admin-header_top_menu {
        width: 80%;
        margin-left: 3rem;
        ul {
          background: #12385a;
          height: 3.16rem;
          line-height: 3.16rem;
          display: flex;
          justify-content: flex-start;
          .ant-menu-item {
            color: #fff;
            border: none;
            font-size: 1.06rem;
            padding: 0 1.25rem;
            &:hover {
              border: none;
            }
          }
          .ant-menu-item-selected {
            color: #00d6fd;
            border: none;
          }
        }
      }
    }
    .logout_hover {
      &:hover {
        color: red;
      }
    }
    img {
      vertical-align: middle;
      margin-right: 1rem;
    }
    a {
      color: #f9f9f9;
      text-decoration-line: none;
      text-decoration-color: #fff;
      font-size: 0.8rem;
    }
  }
  .admin-content {
    height: calc(100vh - 3rem);
    background: url("./../../assets/images/bg.png");
    background-size: 100% 100%;
    padding: 1rem;
    .admin-content-tab {
      text-align: left;
    }
  }
}
</style>