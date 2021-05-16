<template>
  <div>
    <el-radio-group @change="change" v-model="type">
      <span v-for="(item,index) in types" :key="index">
        <div v-if="index==13" style="margin-top: 20px">
        </div>
        <el-radio-button style="margin-right: 10px" :label="item">
          {{ item }}
        </el-radio-button>
      </span>
    </el-radio-group>
    <br> <br>
    <el-radio-group @change="change" v-model="region">
      <el-radio-button v-for="(item,index) in regions" :key="index" :label="item" style="margin-right: 10px">{{ item }}
      </el-radio-button>
    </el-radio-group>
    <br> <br>
    <el-radio-group @change="change" v-model="year">
      <el-radio-button v-for="(item,index) in years" :key="index" :label="item" style="margin-right: 10px">{{ item }}
      </el-radio-button>
    </el-radio-group>
    <br> <br>
    <el-radio-group @change="change" v-model="special">
      <el-radio-button v-for="(item,index) in specials" :key="index" :label="item" style="margin-right: 10px">{{ item }}
      </el-radio-button>
    </el-radio-group>
    <div style="margin-top: 20px">
      <MovieListVertical
        v-loading="loading"
        :charts="movieList"
        element-loading-spinner="el-icon-loading"
        element-loading-text="🏅🚶🚶‍♂️🚶‍♀">
      </MovieListVertical>
    </div>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :hide-on-single-page="true"
      :page-size="12"
      :current-page="currentPage"
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import MovieListVertical from "../components/MovieListVertical";
import {getByTag} from "../services/movieService";

export default {
  name: "Tag",
  components: {
    MovieListVertical
  },
  data() {
    return {
      laading: false,
      currentPage: 1,
      total: 0,
      movieList: [],
      type: '全部类型',
      region: '全部地区',
      year: '全部年份',
      special: '全部特色',
      types: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画',
        '悬疑', '惊悚', '恐怖', '犯罪', '音乐', '歌舞',
        '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难'],
      regions: ['全部地区', '中国大陆', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '西班牙', '印度'],
      years: ['全部年份', '2016', '2015', '2014', '2013'],
      specials: ['全部特色', '经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人']
    }
  },
  async created() {
    this.loading = true;
    this.currentPage = 1;
    var movieList = await getByTag(null, 1, 12);
    this.loading = false;
    this.movieList = movieList.data.list;
    this.total = movieList.data.total;
  },
  methods: {
    async change(val) {
      var tag = {
        type: this.type == '全部类型' ? '' : this.type,
        region: this.region == '全部地区' ? '' : this.region,
        year: this.year == '全部年份' ? '' : this.year,
        special: this.special == '全部特色' ? '' : this.special,
      }
      this.loading = true;
      var movieOfTag = await getByTag(tag, 1, 12);
      this.loading = false;
      this.currentPage = 1;
      if (movieOfTag.code == 0) {
        this.movieList = movieOfTag.data.list;
        this.total = movieOfTag.data.total;
      } else {
        this.total = 0;
        this.movieList = null;
        this.currentPage = 1;
      }
      this.loading = false;
    },
    async pageChange(val) {
      this.currentPage = val;
      this.loading = true;
      scrollTo(0, 0);
      var movieList = await getByTag(this.tagParam, val, 12);
      this.loading = false;
      if (movieList.code == 0) {
        this.movieList = movieList.data.list;
        this.total = movieList.data.total;
      }
    },
  }
}
</script>

<style scoped>

</style>
