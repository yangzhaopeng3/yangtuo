<template>
  <div>

    <el-divider content-position="left" style="margin-left: 10px;"><b style="font-size: 16px;">个人偏好</b>
    </el-divider>
    <div>
      <el-checkbox-group v-model="checkedItems">
        <el-checkbox v-for="taste in tasteList" :key="taste.tid" :label="taste.tid" border
                     style="margin-left:5px;margin-top: 20px">
          {{ taste.tagName }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px;float: right">
      <el-button icon="el-icon-check" style="width: 100px;margin-right: 40px;" type="primary" @click="update()">更新
      </el-button>
    </div>
  </div>
</template>

<script>
import {getAllTastes, getMyTaste, updateTaste} from "../services/tasteService";
import {mapState} from "vuex";

export default {
  name: "Taste",
  data() {
    return {
      tasteList: [],
      checkedItems: [],
      userTaste: {
        'userId': 0,
        tasteList: []
      }
    }
  },
  async created() {
    var resp = await getAllTastes();
    if (resp.code == 0) {
      this.tasteList = resp.data;
    }
    var resp1 = await getMyTaste(this.loginUser.userId);
    if (resp1.code == 0) {
      this.checkedItems = resp1.data.map(obj => {
        return obj.tid;
      })
    }
  },
  computed: {
    ...mapState("loginUser", {
      loginUser: "data",
    })
  },
  methods: {
    update() {
      this.userTaste.userId = this.loginUser.userId;
      this.userTaste.tasteList = this.checkedItems;
      var data = updateTaste(this.userTaste);
      this.$message({
        showClose: true,
        message: '更新成功',
        type: 'success',
        center: true
      });
    }
  }
}
</script>

<style scoped>
</style>
