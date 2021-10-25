<template>
  <el-dialog title="附件上传"
             :visible.sync="fileUploadVisible"
             :v-if="fileUploadVisible"
             width="30%"
             :append-to-body="true"
             @close="cancel">
    <div class="upload-file">
      <div>
        <el-form ref="uploadForm" :model="uploadForm">
          <el-select v-model="uploadForm.formType" placeholder="请选择类型" style="width: 100%">
            <el-option v-for="item in thinkTypeOptions"
                       :key="item.thinkType" :label="item.thinkType" :value="item.pkId">
            </el-option>
          </el-select>
          <el-select v-model="uploadForm.billId" placeholder="请选择产品" style="width: 100%">
            <el-option v-for="item in thinkBaseInfoOptions"
                       :key="item.thinkName" :label="item.thinkName" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form>
      </div>
      <br/>
      <el-upload
          :action="action"
          :before-upload="handleBeforeUpload"
          :file-list="fileList"
          :limit="30"
          multiple
          :accept="accept"
          :on-error="handleUploadError"
          :on-exceed="handleExceed"
          :on-success="handleUploadSuccess"
          :on-change="handChange"
          :http-request="httpRequest"
          :show-file-list="true"
          :auto-upload="false"
          class="upload-file-uploader"
          ref="upload"
      >
        <!-- 上传按钮 -->
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" :disabled="fileList.length < 1" size="small" type="success"
                   @click="submitUpload">上传到服务器
        </el-button>
        <!-- 上传提示 -->
        <div class="el-upload__tip" slot="tip">
          请上传
          <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b></template>
          <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b></template>
          的文件
        </div>
      </el-upload>

      <!-- 文件列表 -->
      <!--      <transition-group class="upload-file-list el-upload-list el-upload-list&#45;&#45;text" name="el-fade-in-linear" tag="ul">-->
      <!--        <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in list">-->
      <!--          <el-link :href="file.url" :underline="false" target="_blank">-->
      <!--            <span class="el-icon-document"> {{ getFileName(file.name) }} </span>-->
      <!--          </el-link>-->
      <!--          <div class="ele-upload-list__item-content-action">-->
      <!--            <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>-->
      <!--          </div>-->
      <!--        </li>-->
      <!--      </transition-group>-->
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "fileUpload",
  props: {fileUploadVisible: Boolean, params: Object},
  data() {
    return {
      fileSize: 500,
      // 文件类型, 例如['png', 'jpg', 'jpeg']
      fileType: [".jpg", ".jpeg", ".png", ".doc", ".xls", ".xlsx", ".ppt", ".txt", ".pdf"],
      // 已选择文件列表
      fileList: [],
      // 可上传的文件类型
      accept: '',
      action: 'action',
      uploadForm: {
        billId: "",
        formType: ""
      },
      thinkTypeOptions: [],
      thinkBaseInfoOptions: []
    };
  },
  created() {
    this.initThinkTypeList();
    this.initThinkBaseInfoList();
  },
  methods: {
    // 初始化类型列表
    initThinkTypeList() {
      this.http.get(this.api.thinkType.list, res => {
        this.thinkTypeOptions = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    // 初始化业务列表
    initThinkBaseInfoList() {
      this.http.get(this.api.thinkBaseInfo.list, res => {
        this.thinkBaseInfoOptions = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf("."));
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`只允许上传30个文件`);
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.$message.success("上传成功");
      this.cancel()
    },
    /** 文件状态改变时调用 */
    handChange(file, fileList) {
      this.fileList = fileList
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
    },
    /** 手动提交上传 */
    submitUpload() {
      if (this.fileList.length <= 0) {
        return false
      }
      this.$refs.upload.submit()
    },
    /** 关闭上传弹框 */
    cancel() {
      this.fileList = []
      this.$emit("file-upload-close");
    },
    /** 调用接口上传 */
    httpRequest(param) {
      const formData = new FormData()
      formData.append("billId", this.uploadForm.billId)
      formData.append("formType", this.uploadForm.formType)
      formData.append('file', param.file)

      this.http.post(this.api.attach.upload, formData, res => {
        if (res.code == 200) {
          setTimeout(() => {
            this.$message({message: '文件上传成功！', type: 'success'});
            this.$emit("file-upload-close");
          }, 1000);
        }
        this.loading = false;
      }, (error) => {
        this.$message({message: '文件上传失败！' + error, type: 'error'});
        console.log("文件上传失败-》" + error.msg);
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>