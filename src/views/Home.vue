<template>
  <div>
    <MovieList :movie-list="movieList"></MovieList>
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
        movieList: []
      }
    },
    async created() {
      var movieList = await getMovieList();
      this.movieList = movieList.list;
      console.log(this.movieList);
    }
  }
</script>

<style scoped>

</style>
