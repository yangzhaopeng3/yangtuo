<template>
  <div>
    <el-radio-group @change="change" v-model="type">
      <span v-for="(item,index) in types">
        <div v-if="index==13" style="margin-top: 20px">
        </div>
        <el-radio-button  style="margin-right: 10px" :label="item">
          {{item}}
        </el-radio-button>
      </span>
    </el-radio-group>

    <br> <br>
    <el-radio-group @change="change" v-model="region">
      <el-radio-button style="margin-right: 10px" v-for="item in regions" :label="item">{{item}}</el-radio-button>
    </el-radio-group>
    <br> <br>
    <el-radio-group @change="change" v-model="year">
      <el-radio-button style="margin-right: 10px" v-for="item in years" :label="item">{{item}}</el-radio-button>
    </el-radio-group>
    <br> <br>
    <el-radio-group  @change="change" v-model="special">
      <el-radio-button style="margin-right: 10px" v-for="item in specials" :label="item">{{item}}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "Tag",
    data() {
      return {
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
    methods: {
      change(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped>

</style>
