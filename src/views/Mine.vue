<template>
  <div>
    <h1>{{loginUser.nickname}}的电影</h1>
    <div class="wrapper" style="margin-top: 20px">
      <div class="watched">
        <h2>看过&nbsp;·&nbsp;·&nbsp;·
          <span class="pl">&nbsp;(<span>{{watch.total}}部</span>)</span>
        </h2>
        <MovieList :is-small="true" :movie-list="watch.watchedList">
        </MovieList>
        <el-pagination style="text-align: center;margin-top: 15px"
                       :current-page="watch.currentPage"
                       @current-change="pageChange_watch"
                       :hide-on-single-page="true"
                       layout="prev,pager,next"
                       :total="watch.total">
        </el-pagination>
      </div>

      <div style="margin-top: 30px">
        <h2>想看&nbsp;·&nbsp;·&nbsp;·
          <span class="pl">&nbsp;(<span>{{wish.total}}部</span>)</span>
        </h2>
        <el-pagination
          :hide-on-single-page="true"
          small
          layout="prev,next"
          :total="wish.total">
        </el-pagination>
        <MovieList :is-small="true" :movie-list="wish.wishList"></MovieList>
        <el-pagination style="text-align: center;margin-top: 15px"
                       :current-page="wish.currentPage"
                       @current-change="pageChange_wish"
                       :hide-on-single-page="true"
                       layout="prev,pager,next"
                       :total="wish.total">
        </el-pagination>
      </div>

      <div style="margin-top: 30px">
        <h2>为你推荐&nbsp;·&nbsp;·&nbsp;·
          <span class="pl">&nbsp;(<span>384部</span>)</span>
        </h2>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapState} from "vuex"
  import MovieList from "../components/MovieList";
  import {getWatchedList, getWishList} from "../services/movieService";

  export default {
    name: "Mine",
    components: {MovieList},
    computed: {
      ...mapState("loginUser", {
        loginUser: "data",
      })
    },
    data() {
      return {
        watch: {
          total: 0,
          currentPage: 1,
          watchedList: [],
        },
        wish: {
          total: 0,
          currentPage: 1,
          wishList: [],
        },
        recommendList: [],
      }
    },
    async created() {
      var resp1 = await getWatchedList(this.loginUser.userId);
      console.log(resp1);
      this.watch.watchedList = resp1.list;
      this.watch.total = resp1.total;

      var resp2 = await getWishList(this.loginUser.userId);
      this.wish.wishList = resp2.list;
      this.wish.total = resp2.total;
    },
    methods: {
      async pageChange_watch(val) {
        this.watch.currentPage = val;
        var resp1 = await getWatchedList(this.loginUser.userId, val, 12);
        this.watch.watchedList = resp1.list;
      },
      async pageChange_wish(val) {
        this.wish.currentPage = val;
        var resp1 = await getWatchedList(this.loginUser.userId, val, 12);
        this.wish.wishList = resp1.list;
      },
    }
  }
</script>

<style scoped>


  h1 {
    word-wrap: break-word;
    display: block;
    font-size: 25px;
    font-weight: bold;
    color: #494949;
    margin: 0;
    padding: 0 0 15px 0;
    line-height: 1.1;
  }

  h2 {
    font: 15px Arial, Helvetica, sans-serif;
    color: #072;
    margin: 0 0 12px 0;
    line-height: 150%;
  }
</style>
