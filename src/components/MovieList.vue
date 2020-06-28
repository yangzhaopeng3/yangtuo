<template>
  <div>
    <el-row :gutter="20">
      <el-col style="margin-top: 20px" :span="isSmall?4:6" v-for="item in movieList" :key="item.movieId">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <meta name="referrer" content="no-referrer"/>
          <img style="cursor:pointer" @click="switchTo(item.movieId)" :class="isSmall==true?'image_small':'image'"
               :src="item.poster">
          <div style="text-align: center;height: 60px">
            <span style="cursor:pointer" @click="switchTo(item.movieId)" :class="isSmall?'title_small':'title'">{{item.movieTitle}}</span>
            <el-rate style="margin-top: 10px;margin-left: 10px" :disabled="true" :max="5" :value="item.rating/2"
                     :show-score="true" text-color="#ff9900">
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
