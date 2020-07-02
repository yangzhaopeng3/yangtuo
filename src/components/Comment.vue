<template>
  <div>
    <div :key="item.cid" class="comment_item" v-for="item in comments">
      <div class="info">
        <span style="color: #409eff">{{item.user.nickname}}</span> 看过
        <el-rate :disabled="true" :max="5" :show-score="false"
                 :value="item.rating"
                 style="display:inline;margin-top: 10px;margin-left: 10px" text-color="#ff9900">
        </el-rate>
        <span style="color: #9b9b9b">{{item.rateTime}}</span>
      </div>
      <div class="comment">
        {{item.comment}}
      </div>
    </div>
    <!--    <div>-->
    <!--      <el-pagination :currentPage="currentPage"-->
    <!--                     :page-size="pageSize"-->
    <!--                     :total="total"-->
    <!--                     @current-change="pageChange"-->
    <!--                     layout="prev, pager, next,total"-->
    <!--                     style="margin-top: 30px;text-align: center">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import {getComments} from "../services/movieService";

  export default {
    props: {
      movieId: {
        type: Number,
        default: 0
      },
      comments: {
        type: Array,
        default: []
      }
    },
    name: "Comment",
    data() {
      return {
        // comments: [],
        // pageSize: 10,
        // total: 0,
        // currentPage: 1
      }
    },
    methods: {
      // async pageChange(val) {
      //   this.currentPage = val;
      //   var resp = await getComments(this.movieId, this.currentPage);
      //   this.comments = resp.list;
      // },
    },
    async created() {
      // var resp = await getComments(this.movieId, 1, 10);
      // this.comments = resp.list;
      // this.total = resp.total;
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
