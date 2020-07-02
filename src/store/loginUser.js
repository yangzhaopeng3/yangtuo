// 登录用户 的仓库数据
import {login, loginOut, whoAmI} from "../services/userService";

export default {
  namespaced: true, // 开启命名空间
  state: {
    data: null, // 当前登录的用户
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async login(context, payload) {
      var resp = await login(payload); // {code:0, msg:"", data:xxx}
      if (resp.code === 0) {
        // 登录成功
        context.commit("setData", resp.data);
      }
      console.log(resp)
      return resp;
    },
    async whoAmI(context) {
      var resp = await whoAmI();
      context.commit("setData", resp);
    },
    loginOut(context) {
      loginOut();
      context.commit("setData", null);
    },
  },
};
