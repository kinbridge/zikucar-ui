<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="24" style="padding: 15px; ">
              <el-row :gutter="20" style="background: #f4f4f5;padding:10px;">
                <el-col :span="5">
                  <el-input placeholder="文件名称" v-model="pageQuery.attachment.originName" size="small"
                            clearable></el-input>
                </el-col>
                <el-col :span="2" style="text-align: center;">
                  <el-button type="success" @click="getData" icon="el-icon-search" size="small" circle></el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-button @click="uploadAttach" type="primary">附件上传</el-button>
      <el-button @click="getData" type="primary" icon="el-icon-refresh">刷新</el-button>
    </el-row>
    <el-table :data="tableData" ref="table" style="width: 100%">
      <el-table-column width="100" label="操作" fixed="left">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="thinkTypeId" label="产品类型"
                       :formatter="thinkTypeFormatter">
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="thinkBaseInfoId" label="产品名称"
                       :formatter="thinkBaseInfoFormatter">
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="originName" label="文件名称">
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="fileType" label="文件类型">
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="size" label="文件大小">
      </el-table-column>
      <el-table-column class="text-overflow"
                       :show-overflow-tooltip="true" prop="onlineUrl" label="图片">
        <template scope="scope">
          <el-popover placement="right" title="" trigger="hover">
            <img :src="scope.row.onlineUrl" style="height: 400px;width: 500px">
            <img slot="reference" :src="scope.row.onlineUrl" :alt="scope.row.onlineUrl" style="max-height: 50px;max-width: 130px">
          </el-popover>
        </template>
      </el-table-column>
<!--      <el-table-column class="text-overflow"-->
<!--                       :show-overflow-tooltip="true" prop="url" label="文件路径">-->
<!--      </el-table-column>-->
    </el-table>
    <!--    分页组件-->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   layout="total, sizes, prev, pager, next, jumper"
                   :page-sizes="[10,20,100, 200, 300, 400]"
                   :page-size="pageQuery.size"
                   :current-page="pageQuery.page"
                   :total="total"></el-pagination>

    <!--    编辑框-->
    <attach-edit :dialogVisible="dialogVisible" v-if="dialogVisible" :params="params"
                 @attach-edit-close="attachEditClose"></attach-edit>

    <!--    附件上传-->
    <attach-upload :fileUploadVisible="fileUploadVisible" v-if="fileUploadVisible" :params="params"
                   @file-upload-close="uploadAttachClose"></attach-upload>
  </div>

</template>
<script>
export default {
  data() {
    return {
      searArgs: {
        attachName: ''
      },
      params: {
        pkId: "",
        operation: ""
      },
      tableData: [],
      dialogVisible: false,//显示编辑框
      fileUploadVisible: false,//显示编辑框,
      thinkTypeOptions: [],
      thinkBaseInfoOptions: [],
      pageQuery: {
        page: 1,
        size: 10,
        attachment: {
          originName: ""
        }

      },
      total: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageQuery.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageQuery.page = val;
      this.getData();
    },
    //  格式化类型
    thinkTypeFormatter(row) {
      for (let index in this.thinkTypeOptions) {
        if (this.thinkTypeOptions[index].pkId === row.thinkTypeId) {
          return this.thinkTypeOptions[index].thinkType;
        }
      }
      return "";
    },
    // 格式化产品信息
    thinkBaseInfoFormatter(row) {
      for (let index in this.thinkBaseInfoOptions) {
        if (this.thinkBaseInfoOptions[index].pkId === row.thinkBaseInfoId) {
          return this.thinkBaseInfoOptions[index].thinkName;
        }
      }
      return "";
    },
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
    attachEditClose() {
      this.dialogVisible = false;
      this.getData();
    },
    uploadAttachClose() {
      this.fileUploadVisible = false;
      this.getData();
    },
    handleEdit(index, row) {
      this.params.pkId = row.pkId;
      this.params.operation = "修改";
      this.dialogVisible = true;
    },
    uploadAttach() {
      this.fileUploadVisible = true;
    },
    editAttach() {
      this.params.pkId = "";
      this.params.operation = "新增";
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('确认删除部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.get(this.api.attach.deleteById + "/" + row.pkId, res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功!'});
            this.getData();
          }
        }, (error) => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
    },
    getData() {
      this.http.post(this.api.attach.pageList, this.pageQuery, res => {
        this.tableData = res.data;
        this.total = res.total;
      }, (error) => {
        console.log(error)
      })
      this.initThinkBaseInfoList();
      this.initThinkTypeList();
    },
  },
  components: {
    "attach-edit": attachEdit,
    "attach-upload": fileUpload
  }
}
import attachEdit from "./attachEdit.vue";
import fileUpload from './fileUpload.vue'
</script>
<style>

.grid-content img {
  height: 65px;
}

.grid-content p {
  font-size: 16px;
  margin: 0;
  padding: 0;
  color: #00b8d2;
  font-weight: 600;
}

.check-info {
  float: right;
  text-align: right;
  color: #00b8d2;
}

.check-info span:nth-child(1) {
  font-size: 35px;
  font-weight: 700;
  display: block;
}

.el-table td, .el-table th {
  padding: 5px 0 !important;
}

.el-table .cell {
  cursor: pointer !important;
}
</style>