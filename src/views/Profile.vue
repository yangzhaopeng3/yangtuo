<template>
  <div>
    <div style="width: 450px;margin-top: 50px;">
      <el-divider content-position="left"><b style="font-size: 16px;">修改个人资料</b>
      </el-divider>
    </div>
    <div class="update_profile" style="margin-top: 40px">
      <el-form ref="ruleForm" :label-position="left" :model="profileForm"
               :rules="rules" label-width="80px"
               size="large" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item class="input_area" label="用户名" prop="username">
          <el-input v-model="profileForm.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="input_area" label="昵称" prop="nickname">
          <el-input v-model="profileForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="input_area" label="密码" prop="password">
          <el-input v-model="profileForm.password" autocomplete="off" show-password
                    type="password"></el-input>
        </el-form-item>
        <el-form-item class="input_area" label="确认密码" prop="checkPass">
          <el-input v-model="profileForm.checkPass" autocomplete="off" show-password
                    type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-edit" style="float: right;width: 100px"
                     type="primary" @click="submitForm('ruleForm')">提交
          </el-button>
          <el-alert v-if="updateMessage.visible"
                    :title="updateMessage.msg"
                    :type="updateMessage.type"
                    style="margin-left: 45px;width: 280px;height: 38px;margin-top: 13px">
          </el-alert>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {updateProfile} from "../services/userService";

export default {
  name: "Taste",
  data() {
    var validatePass = (rule, value, callback) => {
      let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error("密码为5-20位，以字母开头，可带数字、'_'、'.'、'*'"))
      } else {
        if (this.profileForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.profileForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      let pattern = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length < 4 || value.length > 15) {
        callback(new Error('用户名长度为4-15位'))
      } else if (!pattern.test(value)) {
        callback(new Error('用户名只能为数字，字母和_的组合，以字母开头'))
      } else {
        callback();
      }
    };
    var validateNickname = (rule, value, callback) => {
      let pattern = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{4,15}$/;
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else if (value.length < 4 || value.length > 10) {
        callback(new Error('昵称长度为4-10位'))
      } else if (!pattern.test(value)) {
        callback(new Error('昵称只能为数字，字母和_的组合，不得以_开头'))
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        nickname: [
          {validator: validateNickname, trigger: 'blur'}
        ],
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ]
      },
      updateMessage: {
        visible: false,
        msg: '',
        type: 'success'
      },
      profileForm: {
        password: '',
        checkPass: '',
        username: '',
        nickname: '',
      },
    }
  },
  async created() {
    this.profileForm.username = this.loginUser.username;
    this.profileForm.nickname = this.loginUser.nickname;
  },
  computed: {
    ...mapState("loginUser", {
      loginUser: "data",
    })
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let userInfo = this.profileForm;
          var resp = await updateProfile(userInfo);
          if (resp.code == 0) {
            this.updateMessage.type = 'success';
          } else {
            this.updateMessage.type = "error";
          }
          this.updateMessage.visible = true;
          this.updateMessage.msg = resp.msg;
        } else {
          this.updateMessage.visible = true;
          this.updateMessage.type = "warning";
          this.message.msg = "请检查输入信息！"
          return false;
        }
        this.updateMessage.visible = true;
      });
    },
  }
}
</script>

<style scoped>
.update_profile {
  width: 400px;
}
</style>
