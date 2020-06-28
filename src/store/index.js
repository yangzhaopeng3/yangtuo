import vuex from "vuex";
import Vue from "vue";

//1. 安装
Vue.use(vuex);
var store = new vuex.Store({
  modules: {},
});

export default store;  // 等同于 vue实例中的 this.$store
