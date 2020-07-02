<template>
  <div id="app">
    <!-- 该组件会根据不同的访问路径，渲染不同的组件 -->
    <div v-if="$route.meta.keepAlive!=false">
      <Header></Header>
    </div>
    <div :class="{'container':$route.meta.keepAlive!=false}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Login from "./views/Passport";

  export default {
    components: {
      Header,
      Login
    }
  }
</script>

<style scoped>
  .container {
    margin: 30px auto;
  }
</style>
