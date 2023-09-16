<template>
  <div>
    <el-card style="margin-bottom: 5px">
      <el-header>
        <el-row>
          <el-col :span="8" :offset="16">
            <div>您好，尊贵的{{ nickname }},您的权限为{{ roleName }}</div>
            <!--            <div>现在是{{ currentTime }}</div>-->
            <div style="float: right">
              <el-button type="text" @click="handleChangePassword">修改密码</el-button>
            </div>

          </el-col>
        </el-row>
      </el-header>
    </el-card>

    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="预测">
          <el-tabs>
            <el-tab-pane label="单张图片预测">
              <predict-single/>
            </el-tab-pane>
            <el-tab-pane label="多张图片预测">
              <predict-multi/>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!--        <el-tab-pane label="配置管理">配置管理</el-tab-pane>-->
        <el-tab-pane label="角色管理">
          <userInfo></userInfo>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog ref="changePasswordDialog" :visible.sync="changePasswordOpen">
      <el-form ref="changePasswordForm" :model="changePasswordForm" :rules="changePasswordRules">
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="changePasswordForm.newPassword" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="changePasswordForm.confirmPassword" placeholder="请再次输入新密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePasswordSubmit">提交</el-button>
          <el-button type="info" @click="changePasswordOpen=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div></div>
  </div>
</template>predictSingle
<script>
import predictSingle from "./component/predictSingle.vue";
import predictMulti from "./component/predictMulti.vue";

import userInfo from "./component/userInfo.vue";
import {checkUser, changeUserPassword} from "@/db/system/userDB";
import {isNotEmptyObject} from "@/utils/ObjectUtils";


export default {
  name: 'index',
  components: {
    predictSingle,
    predictMulti,
    userInfo
  },
  computed: {
    currentTime() {
      return new Date().toLocaleString();
    },
    username() {
      return this.$store.getters.userInfo.username;
    },
    nickname() {
      return this.$store.getters.userInfo.nickname;
    },
    userId() {
      return this.$store.getters.userInfo.id;
    },

    roleName() {
      let role = this.$store.getters.userInfo.role
      if (role === 0) {
        return "超级管理员";
      }
      if (role === 1) {
        return "管理员";
      }
      if (role === 2) {
        return "用户";
      }
      return null;
    }
  },
  data() {
    return {
      changePasswordOpen: false,
      changePasswordForm: {
        newPassword: undefined,
        confirmPassword: undefined
      },
      changePasswordRules: {
        newPassword: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {min: 6, max: 20, message: "新密码长度在6-20之间", trigger: "blur"},
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (value !== this.changePasswordForm.newPassword) {
                callback(new Error("两次密码不一致"))
              } else {
                callback()
              }
            }, trigger: "blur"
          }
        ],
      },
    }
  },
  mounted() {
    this.changePasswordOpen = true;
    this.$refs.changePasswordDialog.rendered = true;
    this.changePasswordOpen = false;
  },

  created() {
    console.log("index loading")
    if (this.$store.getters.isLogin === false) {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    //清空密码表单
    clearChangePasswordForm() {
      this.changePasswordForm.newPassword = undefined;
      this.changePasswordForm.confirmPassword = undefined;
      this.$refs.changePasswordForm.clearValidate();
    },
    //处理修改密码
    handleChangePassword() {
      this.$prompt('请输入原密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
      }).then(({value}) => {
        let userData = {
          username: this.username,
          password: value
        }
        checkUser(userData).then(res => {
          if (isNotEmptyObject(res)) {
            this.clearChangePasswordForm();
            this.changePasswordOpen = true;
          } else {
            this.$message({
              type: 'error',
              message: '原密码错误'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    changePasswordSubmit() {
      this.$refs.changePasswordForm.validate(valid => {
        if (!valid) {
          return;
        }
        let userData = {
          id: this.userId,
          password: this.changePasswordForm.newPassword
        };
        console.log(userData);
        changeUserPassword(userData).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.changePasswordOpen = false;
        });
      });
    },
  }
};

</script>


<style scoped>

</style>