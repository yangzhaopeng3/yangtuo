<template>
  <div>
    <MovieListVertical :charts="movieList">
    </MovieListVertical>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :page-size="10"
      :current-page="currentPage"
      layout="prev, pager, next"
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
        movieList: [],
        currentPage: 1,
        total: 0,
        content: '',
      }
    },
    methods: {
      async pageChange(val) {
        this.currentPage = val;
        var resp = await search(this.content, this.currentPage, 12);
        this.charts = resp.data.list;
      }
    },
    watch: {
      "$route.params": {
        immediate: true,
        async handler() {
          var content = this.$route.params.content;
          this.content = content;
          var resp = await search(content);
          if (resp.code == 0) {
            this.movieList = resp.data.list;
            this.total = resp.data.total;
          } else {
            return;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
