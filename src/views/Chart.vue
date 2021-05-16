<template>
  <div v-loading="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-text="排行榜正在拼命加载中..."
       style="margin-top: 20px"
  >
    <MovieListVertical :charts="charts"></MovieListVertical>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :page-size="10"
      :hide-on-single-page="true"
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
      loading: false,
      charts: [],
      currentPage: 1,
      total: 0
    }
  },
  async created() {
    this.loading = true;
    var resp = await getChart(1, 12);
    this.loading = false;
    if (resp.code == 0) {
      this.charts = resp.data.list;
      this.total = 250;
    }
  },
  methods: {
    async pageChange(val) {
      this.loading = true;
      this.currentPage = val;
      scrollTo(0, 0);
      var charts = await getChart(this.currentPage, 12);
      this.loading = false;
      if (charts.code == 0) {
        this.charts = charts.data.list;
      }
    }
  }
}
</script>

<style scoped>

</style>
