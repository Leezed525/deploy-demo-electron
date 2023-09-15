<template>
  <div>
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
                  <i class="el-icon-picture-outline">上传图片后预览</i>
                </div>
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" @click="submitSingleImage" :disabled="predictForm.filename == null">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {predictSingleImage} from '@/api/demo/predict';

export default {
  name: 'index',
  data() {
    return {
      predictForm: {
        file: null,
        filename: null,
        fileUrl: null,
      }
    }
  },
  methods: {
    //打开文件选择框
    openFile() {
      document.getElementById("open").click();
    },
    //选择文件后，将文件信息存入predictForm
    changeFile() {
      const fu = document.getElementById("open");
      if (fu == null) return;
      //如果文件类型不是图片，则返回
      if (!/image\/\w+/.test(fu.files[0].type)) {
        this.$modal.msgWarning("请确保文件为图像类型");
        return false;
      }
      this.predictForm.file = fu.files[0];
      this.predictForm.filename = fu.files[0].name;
      this.predictForm.fileUrl = window.URL.createObjectURL(this.predictForm.file);
    },
    //提交单张图片
    submitSingleImage() {
      let sendData = new FormData();
      sendData.append("image", this.predictForm.file);
      predictSingleImage(sendData).then(res => {
        let response = res.data.result[0];
        //找到response中的最大值即其索引
        let max = response[0];
        let maxIndex = 0;
        for (let i = 1; i < response.length; i++) {
          if (response[i] > max) {
            maxIndex = i;
            max = response[i];
          }
        }
        this.$modal.msgSuccess("预测成功,预测结果为：" + maxIndex);
      }).catch(err => {
        this.$modal.msgError("预测失败" + err);
      })

    },
  }
};
</script>


<style scoped>

</style>