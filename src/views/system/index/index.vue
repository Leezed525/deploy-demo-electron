<template>
  <div>
    <el-card style="margin-bottom: 5px">
      <el-header>
        <el-row>
          <el-col :span="8" :offset="16">
            <div>您好，尊贵的{{ nickname }},您的权限为{{ roleName }}</div>

            <!--            <div>现在是{{ currentTime }}</div>-->
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

    <div></div>
  </div>
</template>predictSingle
<script>
import predictSingle from "./component/predictSingle.vue";
import predictMulti from "./component/predictMulti.vue";

import userInfo from "./component/userInfo.vue";


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
    nickname() {
      return this.$store.getters.userInfo.nickname
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
    return {}
  },
  created() {
    console.log("index loading")
    if (this.$store.getters.isLogin === false) {
      this.$router.push({path: '/login'})
    }
  },
  methods: {}
}

</script>


<style scoped>

</style>