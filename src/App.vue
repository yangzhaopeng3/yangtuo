<template>
  <div id="app">
    <Header />
    <!-- 该组件会根据不同的访问路径，渲染不同的组件 -->
    <div class="container">
      <router-view>

      </router-view>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import MovieList from "./components/MovieList";
  import MovieDetail from "./views/MovieDetail";
  export default {
    components: {
      Header,
    }
  }
</script>

<style scoped>
  .container{
    margin: 30px auto;
  }
</style>
