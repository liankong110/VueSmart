<template>
  <div style="g-center login-page bg">
    <el-card class="loginForm">
      <div>
        <el-form
          :model="user"
          ref="user"
          label-width="100px"
        >
          <h1>Vue Smart</h1>
          <el-form-item label="用户名:">
            <el-input
              v-model="user.name"
              placeholder="请输入用户名"
              auto-complete="false"
              :autofocus="true"
            >
              <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="user.password"
            >
              <template slot="prepend"><i class="el-icon-info"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="login"
              style="width:50%; float:right;"
              icon="el-icon-success"
              :loading="user.isload"
            >登录</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>

  </div>
</template>
<style>
.g-center {
  display: table-cell;
  vertical-align: middle;
}
.login-page {
  background: yellow;
}
.loginForm {
  width: 500px;
  margin: 13% auto 0;
}
/* body {
  background-image: url("../assets/background.gif");
} */
</style>


<script>
import httputils from "@/js/httputils.js";
import md5 from "js-md5";
import * as util from "../js/util.js";

export default {
  data() {
    var user = {
      name: "",
      password: "",
      isload: false
    };

    return { user };
  },
  methods: {
    getmd5(para) {
      var md5 = crypto.createHash("md5");
      md5.update(para);
      var a = md5.digest("hex");
      console.log(a);
      //47bce5c74f589f4867dbd57e9ca9f808
    },
    login() {
      let name = this.user.name;
      let pwd = this.user.password;
      if (name == "") {
        this.$message.error("请输入用户名");
        return;
      }
      if (pwd == "") {
        this.$message.error("请输入密码");
        return;
      }
      var vm = this;
      this.user.isload = true;
      new Promise((A, B) => {        
        var url = "/api/account/login?name=" + name + "&pwd=" + md5(pwd);
        httputils
          .post(url)
          .then(res => {
            if (res && res.Code == 0) {            
              util.session("token", res);                        
              this.$message("登录成功");
              // this.$router.push({ path: "/index" });
              // alert(vm.$router.currentRoute.query.from);
                vm.$emit('login', vm.$router.currentRoute.query.from);
            } else {
           
              this.$message.error(res.Message);
              this.user.isload = false; 
            }
          })
          .catch(util.catchError);
      });
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>

