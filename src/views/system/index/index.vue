<template>
  <div>
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="用户管理">
        <el-form :ref="predictForm" :model="predictForm">
          <el-input placeholder="请选择文件" v-model="predictForm.filename">
            <template slot="append">
              <el-button icon="el-icon-folder-opened" @click="openFile"/>
            </template>
          </el-input>
          <input type="file" name="filename" id="open" style="display: none" @change="changeFile"/>
          <!--          选择文件夹方案-->
          <!--          <input type="file" name="filename" id="open" style="display: none" @change="changeFile"-->
          <!--                 webkitdirectory-->
          <!--          />-->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

export default {
  name: 'index',
  data() {
    return {
      //预测表单
      predictForm: {
        filename: null,
        file: null,
      },

    }
  },
  created() {
    console.log("index loading")
    if (this.$store.getters.isLogin === false) {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    openFile() {
      document.getElementById("open").click();
    },
    changeFile() {
      const fu = document.getElementById("open");
      if (fu == null) return;
      this.predictForm.filename = fu.files[0].name;
      this.predictForm.file = fu.files[0];
      console.log(this.predictForm.file);
    },
  }
}

</script>


<style scoped>

</style>