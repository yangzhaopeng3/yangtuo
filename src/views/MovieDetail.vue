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
          :src="movie.poster"
          style="margin-top: 5px;width: 180px; height: 260px"></img>
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
          <span class="p1">上映日期：</span>
          {{movie.releaseDate}}
          <br>
          <span class="p1">片长：</span>{{movie.duration+"分钟"}}
          <br>
          <span class="p1">又名：</span>
          {{movie.titleOther}}
          <br>
          <span class="p1">豆瓣链接：</span>
          <a :href="movie.doubanUrl" class="detail_text" target="_blank">{{movie.movieId}}</a>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="margin-left: 25px;padding-left:15px;border-left: 1px solid #eaeaea;color: #9b9b9b;">
          <span class="p1">羊驼评分</span>
          <el-row style="margin-top:15px;">
            <el-col :span="6">
              <strong class="rating_num">
                {{movie.rating}}
              </strong>
            </el-col>
            <el-col :span="18">
              <el-rate :disabled="true" :max="5" :show-score="false" :value="movie.rating/2"
                       style="margin-top: 10px;margin-left: 10px" text-color="#ff9900">
              </el-rate>
            </el-col>
          </el-row>
          <br>
          <br>
          <br><br><br><br>

        </div>
      </el-col>
    </el-row>
    <div class="make_comment">
      <template v-if="myRate.cid==null">
        <el-button v-if="wish.wid == null" @click="makeWish" style="text-align:center;width: 80px;font-size: 14px"
                   size="small" type="warning"
                   plain>想看
        </el-button>
        <el-button v-else style="width: 80px;font-size: 14px;text-align: center" @click="cancelWish"
                   size="small" type="warning"
                   plain>不想看
        </el-button>
      </template>
      <el-button v-if="myRate.cid==null" style="width: 80px;font-size: 14px" @click="makeRate"
                 size="small"
                 type="warning" plain>看过
      </el-button>
      <el-button v-else style="width: 80px;font-size: 14px" @click="makeRate" size="small"
                 type="warning" plain>修改
      </el-button>

      <span style="font-size: 14px;margin-left: 5px">评价：</span>
      <el-rate style="display: inline"
               v-model="myRate.rating"
               @change="makeRate"
               show-text>
      </el-rate>

      <el-dialog title="添加收藏：我看过这部电影" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="评分" :label-width="formLabelWidth">
            <el-rate v-model="myRate.rating" style="display: inline" show-text></el-rate>
          </el-form-item>
          <el-form-item label="简短评论" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="myRate.comment">
            </el-input>
          </el-form-item>
        </el-form>
        <div v-if="myRate.cid == null" slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitRate">确 定</el-button>
        </div>
        <div v-else slot="footer" class="dialog-footer">
          <el-button type="danger" v-el @click="deleteRating">删 除</el-button>
          <el-button type="primary" @click="commitUpdate">更 新</el-button>
        </div>
      </el-dialog>
      <div v-if="this.myRate.cid!=null">
        <h2 style="margin-top: 18px">
          <i>我的评价</i>
          · · · · · ·
        </h2>
        <div style="margin-top: 10px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{this.myRate.comment}}</div>
      </div>
    </div>
    <div class="related-info" style="margin-top: 40px;margin-bottom:-10px;">
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
      <Comment :comments="comments"></Comment>
      <div>
        <el-pagination :currentPage="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="pageChange"
                       layout="prev, pager, next,total"
                       style="margin-top: 30px;text-align: center">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {getMovie} from "../services/movieService";
  import {deleteRate, getComments, getUserAComment, makeRate, updateRate} from "../services/rateService";
  import MovieList from "../components/MovieList";
  import Comment from "../components/Comment";
  import {mapState} from "vuex"
  import {Loading} from 'element-ui';
  import {getDate} from "../util/DateUtil";
  import {cancelWish, getUsersWishOfAMovie, makeWish} from "../services/wishService";

  export default {
    name: "MovieDetail",
    components: {
      MovieList,
      Comment
    },
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        comments: [],
        pageSize: 10,
        total: 0,
        currentPage: 1,
        myRate: {
          cid: null,
          movieId: null,
          user: {
            userId: null,
          },
          comment: null,
          rating: null,
          rateTime: null
        },
        movie: null,
        movieId: 0,
        wish: {
          wid: null,
          movieId: null,
          userId: null,
        }
      }
    },
    computed: {
      ...mapState("loginUser", {
        loginUser: "data",
      })
    },
    watch: {
      "$route.params.movieId": {
        immediate: true,
        async handler() {
          // this.myRate = null;
          // this.wish = null;

          this.movieId = this.$route.params.movieId;
          this.movie = await getMovie(this.$route.params.movieId);

          var resp_comment = await getComments(this.movieId, 1, 10);
          this.comments = resp_comment.list;
          this.total = resp_comment.total;

          if (this.loginUser) {
            this.wish.userId = this.loginUser.userId;
            this.wish.movieId = this.movie.movieId;

            var userARate = await getUserAComment(this.movieId, this.loginUser.userId);
            //console.log(userARate);
            if (userARate.code == 0) {
              this.myRate = userARate.data;
              console.log(this.myRate);
            }
            var userAWish = await getUsersWishOfAMovie(this.wish);
            console.log("wishiaaaa")
            console.log(userAWish);
            if (userAWish.code == 0) {
              this.wish = userAWish.data;
            }
          }
        }
      }
    },
    methods: {
      async deleteRating() {
        //提交delete
        var resp = await deleteRate(this.myRate.cid);
        console.log(resp);
        if (resp.code == 0) {
          this.myRate.cid = null;
          this.myRate.rating = 0;
          this.dialogFormVisible = false;
          this.$message({
            message: '删除成功~',
            type: 'success'
          });
        } else {
          this.$message.error(resp.msg);
        }
        console.log("whathappend")
      },
      async commitUpdate() {
        this.myRate.rateTime = getDate();
        this.myRate.movieId = this.movieId;
        this.myRate.user.userId = this.loginUser.userId;
        console.log(this.myRate);
        //提交评分表单
        var resp = await updateRate(this.myRate);
        if (resp.code == 0) {
          this.$message({
            message: '更新成功~',
            type: 'success'
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error(resp.msg);
        }
      },
      checkLogin() {
        if (!this.loginUser) {
          let loadingInstance = Loading.service({
            text: "您似乎没登陆呢！"
          });
          setTimeout(() => {
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              this.$router.push({name: "Passport"})
              loadingInstance.close();
            });
          }, 2000);
          return true;
        }
        return false;
      },
      async commitRate() {
        if (this.checkLogin()) {
          return;
        }
        this.myRate.rateTime = getDate();
        this.myRate.movieId = this.movieId;
        this.myRate.user.userId = this.loginUser.userId;
        console.log(this.myRate);
        //提交评分表单
        var resp = await makeRate(this.myRate);
        if (resp.code == 0) {
          this.myRate.cid = resp.data;
          this.$message({
            message: '标记成功~',
            type: 'success'
          });
          var res = await cancelWish(this.wish.wid);
          if (res.code == 0) {
            this.wish.wid = null;
          }
          this.dialogFormVisible = false;
        } else {
          this.$message.error(resp.msg);
        }
      },
      async makeWish() {
        if (this.checkLogin()) {
          return;
        }
        //标记想看
        var resp = await makeWish(this.wish);
        if (resp.code == 0) {
          this.wish.wid = resp.data;
          this.$message({
            message: '标记成功~',
            type: 'success'
          });
        } else {
          this.$message.error("标记失败！");
        }
      },
      async cancelWish() {
        if (this.checkLogin()) {
          return;
        }
        var resp = await cancelWish(this.wish.wid);
        if (resp.code == 0) {
          this.wish.wid = null;
          this.$message({
            message: '取消想看成功',
            type: 'success'
          });
        } else {
          this.$message.error("取消想看失败！");
        }
      },
      makeRate() {
        if (this.checkLogin()) {
          return;
        }
        //评分
        this.dialogFormVisible = true;
      },
      async pageChange(val) {
        this.currentPage = val;
        var resp = await getComments(this.movieId, this.currentPage);
        this.comments = resp.list;
      },
    }
  }
</script>

<style scoped>
  .recommendations {
    margin-top: 30px;
  }

  .make_comment {
    margin-top: 20px;
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
