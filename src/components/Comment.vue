<template>
  <div>
    <div class="comment_item" v-for="item in comments" :key="item.cid">
      <div class="info">
        <span style="color: #409eff">{{item.user.nickname}}</span> 看过
        <el-rate style="display:inline;margin-top: 10px;margin-left: 10px" :disabled="true" :max="5"
                 :value="item.rating"
                 :show-score="false" text-color="#ff9900">
        </el-rate>
        <span style="color: #9b9b9b">{{item.rateTime}}</span>
      </div>
      <div class="comment">
        {{item.comment}}
      </div>
    </div>
    <div>
      <el-pagination style="margin-top: 30px;text-align: center"
                     :page-size="pageSize"
                     layout="prev, pager, next,total"
                     :total="total"
                     :currentPage="currentPage"
                     @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getComments} from "../services/movieService";

  export default {
    props: {
      movieId: {
        type: Number,
        default: 0
      }
    },
    name: "Comment",
    data() {
      return {
        comments: [],
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    },
    methods: {
      async pageChange(val) {
        this.currentPage = val;
        var resp = await getComments(this.movieId, this.currentPage);
        this.comments = resp.list;
      },
    },
    async created() {
      console.log(this.movieId + "inital");
      var resp = await getComments(this.movieId, 1, 10);
      this.comments = resp.list;
      this.total = resp.total;
    }
  }
</script>

<style scoped>
  .comment_item {
    margin-top: 15px;
    border-top: 1px solid #eaeaea;
    width: 90%;
  }

  .info {
    margin-top: 15px;
  }

  .comment {
    margin-top: 10px;
  }
</style>
