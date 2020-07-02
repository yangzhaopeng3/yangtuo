<template>
  <div>
    <MovieList :movie-list="movieList"></MovieList>
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
  import MovieList from "../components/MovieList";
  import {getMovieList} from "../services/movieService";

  export default {
    name: "Home",
    components: {
      MovieList,
    },
    data() {
      return {
        movieList: [],
        total: 0,
        currentPage: 1,
      }
    },
    async created() {
      var movieList = await getMovieList(1, 12);
      this.movieList = movieList.list;
      this.total = movieList.total;
    },
    methods: {
      async pageChange(val) {
        this.currentPage = val;
        var movieList = await getMovieList(this.currentPage, 12);
        this.movieList = movieList.list;
      }
    }
  }
</script>

<style scoped>

</style>
