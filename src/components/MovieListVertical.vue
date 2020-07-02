<template>
  <div>
    <el-row style="margin-top: 50px" v-for="movie in charts" :key="movie.movieId" type="flex" class="row-bg">
      <el-col :span="6">
        <img
          :src="movie.poster" @click="switchTo(movie.movieId)"
          style="margin-top: 5px;width: 130px; height: 180px"></img>
      </el-col>
      <el-col :span="18">
        <div style="margin-top: 20px;margin-left: -50px;">
          <div>
            <div>
              <div @click="switchTo(movie.movieId)">{{movie.movieTitle}}/{{movie.titleOther}}</div>
              <div style="margin-top: 10px">
                {{movie.releaseDate}} / {{movie.cast}} / {{movie.genre}} / {{movie.country}}
                / {{movie.language}} / {{movie.duration}}分钟 / {{movie.tag}}...
              </div>
            </div>
          </div>
          <div>
            <el-rate :max="5" :show-score="true" disabled :value="movie.rating/2"
                     style="margin-top: 15px;margin-left: 0px" text-color="#ff9900">
            </el-rate>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MovieListVertical",
    props: {
      charts: {
        type: Array,
        default: () => []
      }
    },
    methods:{
      switchTo(movieId) {
        this.$router.push({
          params: {
            movieId: movieId
          },
          name: 'MovieDetail'
        })
      }
    }
  }
</script>

<style scoped>

</style>
