<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <!-- 声明式导航 -->
          <router-link :to="{ name: 'Home' }">
            <a class="title">羊驼电影</a>
          </router-link>
        </div>
        <ul class="nav">
          <li v-if="loginUser">
            <router-link :to="{  name: 'Mine' }">我看</router-link>
          </li>
          <li>
            <router-link exact :to="{  name: 'Home' }">正在热映</router-link>
          </li>
          <li :key="item.channelId" v-for="item in headerList">
            <router-link :to="{name:item.url}">{{ item.name }}</router-link>
          </li>
        </ul>
        <div class="user">
          <!-- 情况2：当前有登录用户 -->
          <template v-if="loginUser">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{loginUser.nickname}}的账号<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name:'Mine'}">个人主页</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="" @click.prevent="handleLoginOut">退出</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link :to="{ name: 'Passport' }">登录 / 注册</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        headerList: [
          {
            name: '分类',
            url: 'Tag'
          },
          {
            name: '排行榜',
            url: 'Chart'
          },
        ]
      }
    },
    computed: {
      ...mapState("loginUser", {
        loginUser: "data",
      }),
    },
    methods: {
      handleLoginOut() {
        this.$store.dispatch("loginUser/loginOut");
        this.$router.push({name: "Passport"});
      },
    },
  };
</script>

<style scoped>
  .header {
    height: 60px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .header-container {
    height: 60px;
    background-color: rgba(240, 243, 245, 0.88);
    line-height: 60px;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
  }

  .container {
    width: 100%;
    display: flex;
  }

  .logo a {
    display: flex;
    margin-left: 110px;
    align-items: center;
    height: 100%;
  }

  .nav {
    margin: 0 60px;
    display: flex;
    flex-grow: 1;
  }

  .nav a {
    display: block;
    padding: 0 30px;
  }

  .nav .router-link-exact-active {
    color: #fcb85f;
  }

  .user {
    float:right;
    font-size: 14px;
    margin-right: 30px;
  }

  .user * {
    margin-left: 10px;
  }

  .header a {
    color: #757575;
  }

  .router-link-active {
    color: #258dcd !important;
  }

  .title {
    color: #258dcd !important;
    font-size: 30px;
    font-weight: bold;
    line-height: 75px;
  }
</style>
