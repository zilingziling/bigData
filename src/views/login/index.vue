<template>
  <div class="login">
    <div class="login-title">{{system_title}}</div>
    <div class="login-center">
      <span class="login-center-span">用户登录</span>
      <div class="login-center-input">
        <a-input class="inputs" placeholder="请输入账号" v-model="user"></a-input>
        <a-input type="password" class="inputss" placeholder="请输入密码" v-model="password"></a-input>
        <div class="rows">
          <a-input
            class="validation"
            @keyup.enter="Thelogin"
            v-model="validation"
            placeholder="请输入验证码"
          ></a-input>
          <img @click="validations" :src="url" class="rows-img" />
        </div>
        <a-checkbox class="login-check" @change="checkchange" :checked="adminCs">管理端</a-checkbox>
        <a-button @click="Thelogin" type="primary" class="logins">登录</a-button>
        <br />
        <span :style="{color: 'red', marginTop:'10px', fontSize: '14px'}">{{text}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { Route } from "vue-router";
import SparkMd5 from "spark-md5";
import Config from "@/config/config";

Component.registerHooks(["beforeRouteEnter"]);

@Component({})
export default class Index extends Vue {
  private user: String = "";
  private password: String = "";
  private validation: String = "";
  private url: String = "";
  private text: String = "";
  private system_title: String = "弈简大数据平台";
  private adminCs: boolean = false;
  @Action("Login") Login: any;

  private beforeRouteEnter(to: Route, from: Route, next: any) {
    next((vm: any) => {
      vm.validations();
    });
  }
  private checkchange() {
    this.adminCs = !this.adminCs;
  }
  private validations() {
    const numbers: number = Math.floor(Math.random() * 10000);
    let code = Config.axiosConfig.baseURL + "/identifyingCode?" + numbers;
    this.url = code;
  }
  private Thelogin() {
    const { Login, loginSuccess, requestFailed } = this;
    if (this.user !== "" && this.password !== "") {
      if (this.validation !== "") {
        this.text = "";
        let data = {
          account: this.user,
          password: SparkMd5.hash(this.password),
          code: this.validation,
          type:this.adminCs ? "admin" : "bigdata"
        };
        Login(data)
          .then((res: any) => {
            if (res.code == 0) loginSuccess(res);
          })
          .catch((err: any) => requestFailed(err))
          .finally(() => {
            console.log("登陆操作完成。。。");
          });
      } else {
        this.text = "请填写验证码";
      }
    } else {
      this.text = "请输入账号和密码";
    }
  }
  private loginSuccess(res: any) {
    let name = this.adminCs ? "admin" : "resource";
    this.$router.push({ name });
    // 显示欢迎信息
    setTimeout(() => {
      this.$notification.success({
        message: "登陆成功",
        description: `欢迎你！${this.$ls.get("USER_INFO").username || ""}`
      });
    }, 300);
  }
  private requestFailed(err: any) {
    this.$notification["error"]({
      message: "错误",
      description:
        ((err.response || {}).data || {}).message || "请求出现错误，请稍后再试",
      duration: 4
    });
  }
}
</script>


<style lang="scss" scoped>
.login {
  background: url("../../assets/images/login.png");
  background-repeat: no-repeat;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-size: 100% 100%;
  position: relative;
}

.login-title {
  font-size: 2.25rem;
  color: #6cacfc;
  position: absolute;
  top: 10%;
  left: 0px;
  width: 100%;
  text-align: left;
  padding-left: 12%;
}

.login-center {
  background: url("../../assets/images/login-border.png");
  background-repeat: no-repeat;
  width: 27rem;
  height: 26.75rem;
  background-size: 100% 100%;
}

.login-center-span {
  color: rgba(123, 182, 255, 1);
  font-size: 1.38rem;
  margin-left: -5rem;
}

.login-center-input {
  width: 22.5rem;
  height: 22.5rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 1px;
  margin: 0.6rem 0 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputs {
  margin-top: 3rem !important;
  width: 18.75rem !important;
  height: 2.5rem !important;
  border: none !important;
  color: #fff;
}

.inputss {
  margin-top: 1.6rem !important;
  width: 18.75rem !important;
  height: 2.5rem !important;
  border: none !important;
  color: #fff;
}

.validation {
  border: none !important;
  color: #fff;
  width: 12.4rem !important;
  height: 2.5rem !important;
}

.rows {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
}

.logins {
  margin-top: 2rem !important;
  width: 18.75rem;
  height: 2.5rem;
  background: rgba(42, 137, 255, 1) !important;
  border: none !important;
}

.rows-img {
  height: 2.5rem;
  width: 6.25rem;
}

.el-input__inner {
  color: #c9e0fd !important;
}
.login-check {
  height: 1rem;
  line-height: 1rem;
  display: block;
  margin-top: 1rem;
  margin-bottom: -1rem;
  color: #f4f4f4;
  width: inherit;
  text-align: left;
  padding-left: 10%;
}
</style>
