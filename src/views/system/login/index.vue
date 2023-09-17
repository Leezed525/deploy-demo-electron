<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-col :span="8" :offset="8">
        xxxxx系统
      </el-col>
    </el-row>
    <el-form ref="loginForm" label-width="80px">
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                      @keyup.enter.native="login"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align: right" :span="8" :offset="8">
          <el-button type="text" @click="forget">忘记密码？</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-button type="primary" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'login-view',
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      }
    }
  },
  created() {
    if (this.$store.getters.isLogin) {
      this.$modal.msgWarning("您已经登陆过了");
      this.$router.push({path: "/index"});
    }
  },
  methods: {
    login() {
      let data = this.loginForm;
      this.$store.dispatch("login", data).then(() => {
        //登陆成功跳转到首页
        this.$router.push({path: "/index"});
      }).catch((err) => {
        this.$modal.msgError(err);
      });
    },
    forget() {
      this.$modal.msgError("请联系管理员重置或使用root账号重置");
    },
  },

}


</script>


<style scoped>

</style>