import vuex from "vuex";
import Vue from "vue";
import loginUser from "./loginUser";
//1. 安装
Vue.use(vuex);
var store = new vuex.Store({
  modules: {
    loginUser
  },
});

export default store;  // 等同于 vue实例中的 this.$store
