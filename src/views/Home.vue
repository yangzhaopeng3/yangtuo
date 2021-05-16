<template>
  <div id="app">
    <MovieList v-loading="loading"
               :movie-list="movieList"
               element-loading-background="rgba(0, 0, 0, 0.8)"
               element-loading-spinner="el-icon-loading"
               element-loading-text="📽️🏃🏃‍♂️🏃‍♀️"></MovieList>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :page-size="10"
      :hide-on-single-page="true"
      :current-page="currentPage"
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import MovieList from "../components/MovieList";
import {getMovieList} from "../services/movieService";

export default {
  name: "Home",
  components: {
    MovieList,
  },
  data() {
    return {
      loading: true,
      movieList: [],
      total: 0,
      currentPage: 1,
    }
  },
  async created() {
    var movieList = await getMovieList(1, 12);
    //await sleep(300);
    this.loading = false;
    this.movieList = movieList.list;
    this.total = movieList.total;
  },
  methods: {
      async pageChange(val) {
        scrollTo(0, 0);
        this.loading = true;
        this.currentPage = val;
        var movieList = await getMovieList(this.currentPage, 12);
        //await sleep(300);
        this.movieList = movieList.list;
        this.loading = false;
      }
    }
  }
</script>

<style scoped>

</style>
