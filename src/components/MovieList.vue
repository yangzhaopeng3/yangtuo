<template>
  <div>
    <el-row :gutter="20">
      <el-col :key="item.movieId" :span="isSmall?4:6" style="margin-top: 20px" v-for="item in movieList">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <meta content="no-referrer" name="referrer"/>
          <img :class="isSmall==true?'image_small':'image'" :src="item.poster" @click="switchTo(item.movieId)"
               style="cursor:pointer">
          <div style="text-align: center;height: 60px">
            <span :class="isSmall?'title_small':'title'" @click="switchTo(item.movieId)" style="cursor:pointer">{{item.movieTitle}}</span>
            <el-rate :disabled="true" :max="5" :show-score="true" :value="item.rating/2"
                     style="margin-top: 10px;margin-left: 10px" text-color="#ff9900">
            </el-rate>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MovieList",
    props: {
      isSmall: {
        type: Boolean,
        default: false
      },
      movieList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
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
  .title_small {
    color: #37a;
    font-size: 13px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .title {
    color: #37a;
    font-size: 15px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .image {
    width: 270px;
    height: 378px;
    display: block;
  }

  .image_small {
    width: 100%;
    height: 200px;
    display: block;
  }

</style>
