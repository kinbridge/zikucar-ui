<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :v-if="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose">
    <div>
      <el-form ref="thinkBaseInfoForm" :model="thinkBaseInfoForm" :rules="rules" label-width="80px">
        <el-form-item label="产品类型" >
          <el-select v-model="thinkBaseInfoForm.thinkTypeId" placeholder="请选择产品类型" style="width: 100%">
            <el-option v-for="item in thinkTypeOptions"
                       :key="item.thinkType" :label="item.thinkType" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="thinkBaseInfoName">
          <el-input v-model="thinkBaseInfoForm.thinkName" placeholder="请输入产品名称"
                    prefix-icon="fa fa-thinkBaseInfo"></el-input>
        </el-form-item>
        <el-form-item label="产品标题" prop="thinkBaseInfoCode">
          <el-input v-model="thinkBaseInfoForm.title" placeholder="请输入产品标题"
                    prefix-icon="fa fa-thinkBaseInfo"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="href">
          <el-input type="textarea" v-model="thinkBaseInfoForm.href" placeholder="请输入产品链接地址"
                    prefix-icon="fa fa-thinkBaseInfo"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input type="textarea" v-model="thinkBaseInfoForm.description" placeholder="请输入产品描述"
                    prefix-icon="fa fa-thinkBaseInfo"></el-input>
        </el-form-item>
        <el-form-item label="" style="text-align: right;">
          <el-button @click="handleClose">取 消</el-button>
          <el-button @click="submitForm('thinkBaseInfoForm')" type="primary">确定
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
      thinkBaseInfoForm: {
        pkId: '',
        thinkTypeId: '',
        thinkName: '',
        title: '',
        href: "",
        description: '',
        remark: ''
      },
      title: "部门" + this.params.operation,
      thinkTypeOptions: [],
      rules: {
        thinkTypeId: [
          {required: true, message: '请选择产品类型', trigger: 'blur'}
        ],
        thinkName: [
          {required: true, message: '请输入产品名称', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入产品标题', trigger: 'blur'}
        ],
        href: [
          {required: true, message: '请输入产品链接地址', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入产品描述', trigger: 'blur'}
        ],

      }
    }
  },
  mounted() {
    if (this.params.pkId) {
      this.initThinkBaseInfo();
      console.log("thinkBaseInfo edit init");
    }
    this.initThinkTypeList();

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
    handleClose() {
      this.$emit("thinkBaseInfo-edit-close");
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
    initThinkBaseInfo() {
      this.http.get(this.api.thinkBaseInfo.getById + "/" + this.params.pkId, res => {
        this.thinkBaseInfoForm = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    edit() {
      let url = this.api.thinkBaseInfo.add;
      let msg = "添加";
      if (this.params.pkId) {
        url = this.api.thinkBaseInfo.update;
        msg = "修改";
      }
      this.http.post(url, this.thinkBaseInfoForm, res => {
        if (res.code == 200) {
          this.$message({message: msg + '成功！', type: 'success'});
          this.$emit("thinkBaseInfo-edit-close");
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
