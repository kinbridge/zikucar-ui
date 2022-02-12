<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :v-if="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose">
    <div>
      <el-form ref="thinkTypeForm" :model="thinkTypeForm" :rules="rules" label-width="80px">
        <el-form-item label="产品编码" prop="thinkTypeName">
          <el-input v-model="thinkTypeForm.thinkCode" placeholder="请输入产品编码-中文字母大写"
                    prefix-icon="fa fa-thinkType"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="thinkTypeCode">
          <el-input v-model="thinkTypeForm.thinkType" placeholder="请输入产品类型"
                    prefix-icon="fa fa-thinkType"></el-input>
        </el-form-item>
        <el-form-item label="" style="text-align: right;">
          <el-button @click="handleClose">取 消</el-button>
          <el-button @click="submitForm('thinkTypeForm')" type="primary">确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {dialogVisible: Boolean, params: Object},
  data() {
    return {
      thinkTypeForm: {
        pkId: '',
        thinkCode: '',
        thinkType: ''
      },
      title: "产品类型" + this.params.operation,
      thinkTypeOptions: [],
      rules: {
        thinkCode: [
          {required: true, message: '请输入产品编码', trigger: 'blur'}
        ],
        thinkType: [
          {required: true, message: '请输入产品类型', trigger: 'blur'}
        ]

      }
    }
  },
  mounted() {
    if(this.params.pkId){
      this. initThinkType();
    }

  },
  methods: {
    // 初始化类型列表
    handleClose() {
      this.$emit("thinkType-edit-close");
    },
    initThinkType() {
      this.http.get(this.api.thinkType.getById + "/" + this.params.pkId, res => {
        this.thinkTypeForm = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.edit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    edit() {
      let url = this.api.thinkType.add;
      let msg = "添加";
      if (this.params.pkId) {
        url = this.api.thinkType.update;
        msg = "修改";
      }
      this.http.post(url, this.thinkTypeForm, res => {
        if (res.code == 200) {
          this.$message({message: msg + '成功！', type: 'success'});
          this.$emit("thinkType-edit-close");
          return;
        }
        this.$message({message: msg + '失败！', type: 'error'});
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    }
  }
}
</script>
<style>
</style>
