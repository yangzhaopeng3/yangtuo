<template>
  <div style="margin-top: -20px">
    <MovieListVertical :charts="charts"></MovieListVertical>
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
  import MovieListVertical from "../components/MovieListVertical";

  export default {
    name: "Top",
    components: {
      MovieListVertical
    },
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
