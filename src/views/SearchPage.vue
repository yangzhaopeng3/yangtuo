<template>
  <div>
    <MovieListVertical :charts="movieList" v-loading="loading">
    </MovieListVertical>
    <div v-if="total==0">
      ops :)
      <br>
      没有找到您想要的结果呢。换个关键词试试？
    </div>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :page-size="10"
      :current-page="currentPage"
      layout="prev, pager, next"
      :hide-on-single-page="true"
      @current-change="pageChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import MovieListVertical from "../components/MovieListVertical";
  import {search} from "../services/movieService";

  export default {
    name: "SearchPage",
    components: {MovieListVertical},
    data() {
      return {
        loading: false,
        movieList: [],
        currentPage: 1,
        total: 0,
        content: '',
      }
    },
    methods: {
      async pageChange(val) {
        this.loading = true;
        this.currentPage = val;
        var resp = await search(this.content, this.currentPage, 12);
        this.loading = false;
        scrollTo(0, 0);
        if (resp.code == 0) {
          this.movieList = resp.data.list;
        }
      }
    },
    watch: {
      "$route.params": {
        immediate: true,
        async handler() {
          this.loading = true;
          var content = this.$route.params.content;
          this.content = content;
          var resp = await search(content);
          this.loading = false;
          if (resp.code == 0) {
            this.movieList = resp.data.list;
            this.total = resp.data.total;
          } else {
            this.total = 0;

          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
