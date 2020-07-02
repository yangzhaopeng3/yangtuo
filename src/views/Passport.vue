<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <!--内容-->
        <Header></Header>
        <div class="passport">
          <el-tabs value="first" :stretch="true" style="height: 100%" type="border-card">
            <el-tab-pane label="登录" name="first">
              <div style="margin-top: 50px;" class="login_zone">
                <el-form :model="loginForm" :rules="rule_login" ref="loginForm" size="large" status-icon>
                  <el-form-item class="input_area" prop="username">
                    <el-input autocomplete="off" placeholder="用户名" v-model="loginForm.username"></el-input>
                  </el-form-item>
                  <el-form-item class="input_area" prop="password">
                    <el-input style="margin-top: 20px;" autocomplete="off" placeholder="密码" show-password
                              type="password"
                              v-model="loginForm.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="submitFormLogin('loginForm')"
                               style="margin-left: 45px;width: 280px;margin-top: 20px"
                               type="primary">提交
                    </el-button>
                    <el-alert :title="loginMessage.msg"
                              :type="loginMessage.type"
                              style="margin-left: 45px;width: 280px;height: 49px;margin-top: 20px"
                              v-if="loginMessage.visible">
                    </el-alert>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <div class="register_zone" style="margin-top: 10px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="large" status-icon>
                  <el-form-item class="input_area" prop="username">
                    <el-input autocomplete="off" placeholder="用户名" v-model="ruleForm.username"></el-input>
                  </el-form-item>
                  <el-form-item class="input_area" prop="password">
                    <el-input autocomplete="off" placeholder="密码" show-password type="password"
                              v-model="ruleForm.password"></el-input>
                  </el-form-item>
                  <el-form-item class="input_area" prop="checkPass">
                    <el-input autocomplete="off" placeholder="确认密码" show-password type="password"
                              v-model="ruleForm.checkPass"></el-input>
                  </el-form-item>
                  <el-form-item class="input_area" prop="nickname">
                    <el-input autocomplete="off" placeholder="昵称" v-model="ruleForm.nickname"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="submitForm('ruleForm')" style="margin-left: 45px;width: 280px;margin-top: -8px"
                               type="primary">提交
                    </el-button>
                    <el-alert :title="regMessage.msg"
                              :type="regMessage.type"
                              style="margin-left: 45px;width: 280px;height: 38px;margin-top: 13px"
                              v-if="regMessage.visible">
                    </el-alert>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <video :style="fixStyle" autoplay class="fillWidth" loop muted>
        <source src="../assets/rs_web_open2019.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import {reg} from "../services/userService";

  export default {
    name: "Login",
    components: {
      Header
    },
    data() {
      var validateLoginPass = (rule, value, callback) => {
        let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error("密码由5-20个以字母开头，可带数字、“_”、“.”的符号组成"))
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error("密码由5-20个以字母开头，可带数字、“_”、“.”的符号组成"))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
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
        fixStyle: '',
        regMessage: {
          visible: false,
          msg: '',
          type: 'success'
        },
        loginMessage: {
          visible: false,
          msg: '',
          type: 'success'
        },
        loginForm: {
          username: '',
          password: '',
        },
        ruleForm: {
          password: '',
          checkPass: '',
          username: '',
          nickname: '',
        },
        rule_login: {
          username: [
            {validator: validateUsername, trigger: 'blur'}
          ],
          password: [
            {validator: validateLoginPass, trigger: 'blur'}
          ],
        },
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
        }
      };
    },
    mounted: function () { //屏幕自适应
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let userInfo = this.ruleForm;
            var resp = await reg(userInfo);
            if (resp.code == 0) {
              this.regMessage.type = 'success';
            } else {
              this.regMessage.type = "error";
            }
            this.regMessage.msg = resp.msg;
          } else {
            this.regMessage.type = "warning";
            this.message.msg = "请检查输入信息！"
            return false;
          }
          this.regMessage.visible = true;
        });
      },
      async submitFormLogin(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            var result = await this.$store.dispatch(
              "loginUser/login",
              this.loginForm
            );
            if (result.code == 0) {
              this.loginMessage.type = 'success';
              this.loginMessage.msg = result.msg;
              setTimeout(() => {
                this.$router.push({name: "Home"})
              }, 3000);
            } else {
              this.loginMessage.type = "error";
              this.loginMessage.msg = result.msg;
            }
          } else {
            this.loginMessage.type = "warning";
            this.loginMessage.msg = "请检查输入信息！"
            return false;
          }
          this.loginMessage.visible = true;
        });
      },
    },
  }
</script>
<style scoped>
  .input_area {
    margin-left: 45px;
    width: 280px;
    margin-top: 0px;
  }

  .register_zone {
    width: 300px;
    height: 430px;
  }

  .passport {
    width: 400px;
    height: 430px;
    background: rgba(220, 223, 226, 0.1);
    top: 50%;
    right: 10%;
    position: fixed;
    transform: translateY(-50%)
  }

  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .fillWidth {
    width: 100%;
  }
</style>
