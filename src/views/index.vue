<style scoped>
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 20px 0 200px;
}

.g-statues-bar {
  position: fixed;
  z-index: 90;
  top: 55px;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-left: 210px;
  background: #fff;
}

.g-statues-bar .bread {
  line-height: 40px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  padding-top: 55px;
  border-right: 1px solid #dedede;
  overflow-y: auto; 
 
}

.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: #409EFF;
}

.logo {
  float: left;
  text-align: center;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color:#fff;
}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color:#fff;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color:inherit;
}
#main {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}
body{
   background-image:none!important;
}
</style>
<template>
  <div class="g-body">
    <el-row type="flex" class="g-head">
      <a href="#" target="_blank" title="Vue权限控制" class="logo" >Vue Smart</a>
      <div class="nav">
        <div class="usermenu" v-if="user.id">
          欢迎您：{{user.name}}
          <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
          <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
        </div>
      </div>
    </el-row>

    <el-menu :default-active="activeMenu" class="g-side" router >
      <template v-for="(route, index) in menus">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">            
            <template slot="title" >
              <i class="el-icon-tickets"></i>
              {{route.meta.name || route.name}}</template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute"
            v-if="!cRoute.isHide||cRoute.Hide==true"> 
              <i class="el-icon-edit"></i>
            {{ cRoute.name||cRoute.meta.name }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name" :key="'nav'+index">{{route.name||route.meta.name }}</el-menu-item>
        </template>
      </template>
    </el-menu>

    <div class="g-statues-bar p-lr">
      <el-breadcrumb separator="/" class="bread" id="mybread">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
          {{ item.meta.name || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <template v-if="$route.path=='/'">
      <!-- <dashboard /> -->
      <h1>首页</h1>
    </template>
    <template v-else>
    <router-view id="main"></router-view>
    </template>
    
  </div>
</template>
<script>
import instance from "../api";
import { changePw } from "../api/account";
export default {
    data() {
    return {
      user: this.$root.userData,
      menus: this.$root.menuData
    };
  },
   computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  },
   methods: {
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    }
  },
  created: function() {    
     
    if (!this.user) {
      this.$router.push({ path: "/login" });
    }
  }    
}
</script>

