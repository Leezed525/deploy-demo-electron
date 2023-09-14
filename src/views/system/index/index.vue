<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="用户管理">
        <el-card>
          <el-form :ref="predictForm" :model="predictForm">
            <el-form-item>
              <el-row>
                <el-col :span="8" :offset="8">
                  <el-input placeholder="请选择文件" v-model="predictForm.filename" disabled>
                    <template slot="append">
                      <el-button icon="el-icon-folder-opened" @click="openFile">点此上传文件</el-button>
                    </template>
                  </el-input>
                  <input type="file" name="filename" id="open" style="display: none" accept="image/*"
                         @change="changeFile"/>
                  <!--          选择文件夹方案-->
                  <!--          <input type="file" name="filename" id="open" style="display: none" @change="changeFile"-->
                  <!--                 webkitdirectory-->
                  <!--          />-->
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="8" :offset="8">
                  <el-image fit="scale-down" :src="predictForm.file == null?'':predictForm.fileUrl">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <div></div>
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
        fileUrl: null,
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
      //如果文件类型不是图片，则返回
      if (!/image\/\w+/.test(fu.files[0].type)) {
        this.$modal.msgWarning("请确保文件为图像类型");
        return false;
      }
      this.predictForm.file = fu.files[0];
      console.log(this.predictForm.file)
      this.predictForm.filename = fu.files[0].name;
      this.predictForm.fileUrl = window.URL.createObjectURL(this.predictForm.file);
      console.log(this.predictForm.fileUrl);
    },
  }
}

</script>


<style scoped>

</style>