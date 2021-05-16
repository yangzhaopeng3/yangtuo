<template>
  <div>
    <h1>{{ loginUser.nickname }}的电影</h1>
    <div class="wrapper" style="margin-top: 20px">
      <div class="watched">
        <h2>看过&nbsp;·&nbsp;·&nbsp;·
          <span class="pl">&nbsp;(<span>{{ watch.total }}部</span>)</span>
        </h2>
        <div v-if="watch.total==0">
          你还没有看过任何电影，快去
          <router-link :to="{name:'Tag'}">标记</router-link>
          吧！
        </div>
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
          <span class="pl">&nbsp;(<span>{{ wish.total }}部</span>)</span>
        </h2>
        <!--        <el-pagination-->
        <!--          :hide-on-single-page="true"-->
        <!--          small-->
        <!--          layout="prev,next"-->
        <!--          :total="wish.total">-->
        <!--        </el-pagination>-->
        <div v-if="wish.total==0">
          你还没有标记任何电影，快去
          <router-link :to="{name:'Tag'}">标记</router-link>
          吧！
        </div>
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
          <span class="pl">&nbsp;(<span>{{ recTotal }}部</span>)</span>
        </h2>
        <div v-if="recTotal==0&&loading==false">
          你标记的电影数量太少，我们还猜不透你呢！<br>快去
          <router-link :to="{name:'Chart'}">标记更多的电影</router-link>
          /
          <router-link :to="{name:'Taste'}">设置你的偏好</router-link>
          ，让我们知道你的口味吧！
        </div>
        <MovieList v-loading="loading" :is-small="true" :movie-list="recommendList"
                   element-loading-spinner="el-icon-loading"></MovieList>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from "vuex"
import MovieList from "../components/MovieList";
import {getRecommends, getWatchedList, getWishList} from "../services/movieService";

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
      loading: true,
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
      recTotal: 0,
      recommendList: [],
    }
  },
  async created() {
    console.log(this.loginUser)
    var resp1 = await getWatchedList(this.loginUser.userId);
    if (resp1.code == 0) {
      this.watch.watchedList = resp1.data.list;
      this.watch.total = resp1.data.total;
    }
    var resp2 = await getWishList(this.loginUser.userId);
    if (resp2.code == 0) {
      this.wish.wishList = resp2.data.list;
      this.wish.total = resp2.data.total;
    }
    this.loading = true;
    var resp3 = await getRecommends(this.loginUser.userId);
    if (resp3.code == 0) {
      this.recTotal = resp3.data.length;
      this.recommendList = resp3.data;
    }
    this.loading = false;
  },
  methods: {
    async pageChange_watch(val) {
      this.watch.currentPage = val;
      var resp1 = await getWatchedList(this.loginUser.userId, val, 12);
      this.watch.watchedList = resp1.data.list;

    },
    async pageChange_wish(val) {
      this.wish.currentPage = val;
      var resp1 = await getWatchedList(this.loginUser.userId, val, 12);
      this.wish.wishList = resp1.data.list;
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
