<template>
  <div style="margin-top: -20px">
    <el-row style="margin-top: 50px" v-for="movie in charts" type="flex" class="row-bg">
      <el-col :span="6">
        <img
          :src="movie.poster"
          style="margin-top: 5px;width: 130px; height: 180px"></img>
      </el-col>
      <el-col :span="18">
        <div style="margin-top: 20px;margin-left: -50px;">
          <div>
            <div>
              <div>{{movie.movieTitle}}/{{movie.titleOther}}</div>
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
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :page-size="10"
      :current-page="currentPage"
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {getChart} from "../services/movieService";

  export default {
    name: "Top",
    data() {
      return {
        charts: [],
        currentPage: 1,
        total: 0
      }
    },
    async created() {
      var resp = await getChart(1, 12);
      this.charts = resp.list;
      this.total = 250;
      console.log(this.charts);
    },
    methods: {
      async pageChange(val) {
        this.currentPage = val;
        var charts = await getChart(this.currentPage, 12);
        this.charts = charts.list;
      }
    }
  }
</script>

<style scoped>

</style>
