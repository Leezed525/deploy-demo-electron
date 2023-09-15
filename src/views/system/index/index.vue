<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="预测">
        <predict-frame/>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <div></div>
  </div>
</template>
<script>
import predictFrame from "./component/predictFrame.vue";

export default {
  name: 'index',
  components: {
    predictFrame
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