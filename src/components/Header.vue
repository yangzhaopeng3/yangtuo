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
          <li>
            <router-link :to="{  name: 'Home' }">首页</router-link>
          </li>
          <li v-for="item in headerList" :key="item.channelId">
            <router-link :to="{name:'Home'}">{{ item.name }}</router-link>
          </li>
        </ul>
        <div class="user">
          <!--          &lt;!&ndash; 情况1：正在远程加载中 &ndash;&gt;-->
          <!--          <span v-if="isLogining">loading...</span>-->
          <!--          &lt;!&ndash; 情况2：当前有登录用户 &ndash;&gt;-->
          <!--          <template v-else-if="loginUser">-->
          <!--            <router-link :to="{ name: 'Personal' }">{{-->
          <!--              loginUser.nickname-->
          <!--              }}-->
          <!--            </router-link>-->
          <!--            <a href="">退出登录</a>-->
          <!--          </template>-->
          <!--          <template v-else>-->
          <!--            <router-link :to="{ name: 'Home' }">登录</router-link>-->
          <!--            <router-link :to="{ name: 'Home' }">注册</router-link>-->
          <!--          </template>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headerList: [
          {
            name: '我看',
            url: '/subject',
          }
        ]
      }
    }
  };
</script>

<style scoped>
  .header {
    height: 60px;
  }



  .header-container {
    height: 60px;
    background-color: rgba(240,243,245, 0.88);
    line-height: 60px;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
  }

  .container {
    display: flex;
  }

  .logo a {
    display: flex;
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
    font-size: 14px;
  }

  .user * {
    margin-left: 10px;
  }

  .header a {
    color: #757575;
  }
  .router-link-active{
    color: #258dcd !important;
  }

  .title {
    color: #258dcd !important;
    font-size: 30px;
    font-weight: bold;
    line-height: 75px;
  }
</style>
