<template>
  <div>
    <el-card style="margin-bottom: 5px">
      <el-header>
        <el-row>
          <el-col :span="8" :offset="16">
            <div>您好，尊贵的{{ nickname }},您的权限为{{ roleName }}</div>
            现在是{{ new Date().toLocaleString() }}
          </el-col>
        </el-row>
      </el-header>
    </el-card>

    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="预测">
          <predict-frame/>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>

    <div></div>
  </div>
</template>predictSingle
<script>
import predictFrame from "./component/predictFrame.vue";

export default {
  name: 'index',
  components: {
    predictFrame
  },
  computed: {
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