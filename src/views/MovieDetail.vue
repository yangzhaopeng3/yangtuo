<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <h1 class="title">{{movie.movieTitle}}</h1>
      </el-col>
    </el-row>
    <el-row class="info_container">
      <el-col :span="6">
        <img
          style="margin-top: 5px;width: 180px; height: 260px"
          :src="movie.poster"></img>
      </el-col>
      <el-col :span="12">
        <div class="detail">
          <span class="p1">导演：</span>
          {{movie.director}}
          <br>
          <div style="width: 500px">
            <span class="p1">主演：</span>
            {{movie.cast}}
          </div>
          <span class="p1">类型：</span>
          {{movie.genre}}
          <br>
          <span class="p1">制片国家/地区：</span>
          {{movie.country}}<br>
          <span class="p1">语言：</span>
          {{movie.language}}
          <br>
          <span class="p1">制片国家/地区：</span>
          {{movie.releaseDate}}
          <br>
          <span class="p1">片长：</span>{{movie.duration+"分钟"}}
          <br>
          <span class="p1">又名：</span>
          {{movie.titleOther}}
          <br>
          <span class="p1">豆瓣链接：</span>
          <a class="detail_text" target="_blank" :href="movie.doubanUrl">{{movie.movieId}}</a>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="margin-left: 25px;padding-left:15px;border-left: 1px solid #eaeaea;color: #9b9b9b;">
          <span class="p1">羊驼评分</span>
          <el-row style="margin-top:15px;">
            <el-col :span="6">
              <strong class="rating_num">
                9.0
              </strong>
            </el-col>
            <el-col :span="18">
              <el-rate style="margin-top: 10px;margin-left: 10px" :disabled="true" :max="5" :value="movie.rating/2"
                       :show-score="false" text-color="#ff9900">
              </el-rate>
            </el-col>
          </el-row>
          <br>
          <br>
          <br><br><br><br>

        </div>
      </el-col>
    </el-row>
    <div class="related-info" style="margin-top: 20px;margin-bottom:-10px;">
      <a name="intro"></a>
      <h2>
        <i>{{movie.movieTitle}}的剧情简介</i>
        · · · · · ·
      </h2>
      <div style="margin-top: 10px">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{movie.description}}
        </span>
      </div>
    </div>
    <!--    推荐zone-->
    <div class="recommendations">
      <h2>
        <i class="">喜欢这部电影的人也喜欢</i>
        · · · · · ·
      </h2>
      <MovieList :isSmall="true" style="margin-top: 15px"></MovieList>
    </div>
    <!--    评论zone-->
    <div class="comments">
      <h2>
        <i class="">{{movie.movieTitle}}的短评</i>
        · · · · · ·
      </h2>
      <Comment :movie-id="movieId"></Comment>
    </div>
  </div>
</template>
<script>
  import {getMovie} from "../services/movieService";
  import MovieList from "../components/MovieList";
  import Comment from "../components/Comment";

  export default {
    name: "MovieDetail",
    components: {
      MovieList,
      Comment
    },
    data() {
      return {
        movie: null,
        movieId: 0
      }
    },
    watch: {
      "$route.params.movieId": {
        immediate: true,
        async handler() {
          this.movieId = this.$route.params.movieId;
          var resp = await getMovie(this.$route.params.movieId);
          this.movie = resp;
        }
      }
    },
  }
</script>

<style scoped>
  .recommendations {
    margin-top: 30px;
  }

  .comments {
    margin-top: 30px;
  }

  h2 i {
    font: 15px Arial, Helvetica, sans-serif;
    color: #072;
    margin: 0 0 12px 0;
    line-height: 150%;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .rating_num {
    color: #494949;
    padding: 0;
    min-width: 30%;
    font-size: 28px;
  }

  .p1 {
    font: 16px Arial, Helvetica, sans-serif;
    line-height: 150%;
    color: #666666;
  }

  .detail {
    margin-left: -20px;
  }

  .container {
    margin-top: 30px;
  }

  .info_container {
    margin-top: 23px;
  }

  .title {
    font-size: 26px;
    line-height: 1.1;
    font-weight: bold;
    color: #494949;
  }
</style>
