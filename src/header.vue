<template>
  <div class="douban-header">
    <div class="douban-header-container">
      <div class="douban-search">
        <a class="title">羊驼网</a>
        <div class="search-container">
          <el-input placeholder="电影、影人、电视剧" v-model="content">
            <el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
          </el-input>
        </div>
        <a>111/a>
      </div>
    </div>
    <div class="douban-bar">
      <ul>
        <li v-for="bar in barList">
          <el-link :underline="false" :href="bar.url" class='bg-hover'>{{bar.title}}</el-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        barList: [{
          title: '我看',
          url: '/'
        }, {
          title: '正在热映',
          url: '/'
        }, {
          title: '即将上映',
          url: '/'
        }, {
          title: 'Top250',
          url: '/'
        }]
      }
    },
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../style/color";

  .user {
  margin-right: 10px;
  }

  .douban-header {
    background: @mainColor;
    width: 100%;
    height: 114px;

    .douban-bar {
      width: 950px;
      margin: 0 auto;

      ul {
        li {
          list-style: none;
          display: inline-block;
          cursor: pointer;
          padding: 6px;

          a {
            display: inline-block;
            font-size: 12px;
            padding: 2px 4px;
          }
        }
      }
    }

    .douban-header-container {
      width: 100%;
      margin: 0 auto;
      border-bottom: 1px solid @line;

      .douban-search {
        width: 950px;
        margin: 0 auto;
        height: 75px;
        position: relative;

        .title {
          color: @doubanColor;
          font-size: 30px;
          font-weight: bold;
          line-height: 75px;
        }

        .search-container {
          display: inline-block;
          line-height: 75px;
          vertical-align: top;
          width: 500px;
          margin-left: 50px;

          input {
            height: 34px;
            line-height: 34px;
          }
        }

        .douban-title-img {
          width: 175px;
          height: 90px;
          position: absolute;
          right: 0;
          top: 10px;
        }
      }
    }
  }
</style>
