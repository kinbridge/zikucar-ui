<template>
  <div id="zikuHome">
    <div id="top">
      <div id="top-first">
        <img src="../../../screenshot/logo.jpg"/>
      </div>
    </div>
    <div id="top-then">
      <div id="top-nav">
        <ul class="firstNav" style="target: back">
          <li>
            <a href="https://shop59110010.taobao.com/category.htm?spm=a1z10.1-c.w4010-14746013404.2.64d77f43KPd1jA&search=y">工作室介绍</a>
          </li>
          <li>
            <a href="https://shop59110010.taobao.com/category.htm?spm=a1z10.1-c.w4010-14746013404.2.64d77f43KPd1jA&search=y">关于我们</a>
          </li>
          <li>
            <a href="https://shop59110010.taobao.com/category.htm?spm=a1z10.1-c.w4010-14746013404.2.64d77f43KPd1jA&search=y">购买产品</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="center">
      <div id="center-left">
        <ul>
          <li style="text-align: left;"><h3>宝贝分类</h3></li>
          <div v-for="think in thinkTypeOptions">
            <li><a href="#" @click="changeModel(think.pkId)"><span>{{ think.thinkType }}</span></a></li>
          </div>
        </ul>
      </div>
      <div id="center-right">
        <div  v-for="item in attachList">
          <el-col :span="8">
<!--            <span style="width: 30%;text-align: center">{{ item.originName }}</span>-->
            <el-image
                :src="item.onlineUrl"
                :alt="item.originName"
                fil="fill"
                @click="openTaBaoDetail(item.href)"
            >
            </el-image>

          </el-col>
        </div>
      </div>
    </div>
    <div id="bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false,
      fit: 'fill',
      thinkTypeOptions: [],
      attachList: [],
      pageQuery: {
        page: 1,
        size: 100,
        attachment: {
          thinkTypeId: 1
        }
      }
    }
  },
  mounted() {
    this.getData();
    this.initThinkTypeList();
  },
  methods: {
    openThink(){
      window.open("https://shop59110010.taobao.com/category.htm?spm=a1z10.1-c.w4010-14746013404.2.64d77f43KPd1jA&search=y");
    },
    openTaBaoDetail(href){
      window.open(href);
    },
    changeModel(id) {
      this.pageQuery.attachment.thinkTypeId = id;
      this.getData();
    },
    getData() {
      this.http.post(this.api.attach.pageList, this.pageQuery, res => {
        this.attachList = res.data;
      }, (error) => {
        console.log(error)
      })
    },
    // 初始化类型列表
    initThinkTypeList() {
      this.http.get(this.api.thinkType.list, res => {
        this.thinkTypeOptions = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    login() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push({path: "/home"});
        this.loading = false;
      }, 1000);

    },
    register() {
      this.$router.push({path: "/register"});
    }
  }
}
</script>


<style>

#zikuHome {
  width: 100%;
  height: 100%;
  /*background: url(../../../screenshot/background.jpg) no-repeat center 0*/
  background-color: cornflowerblue;
}

#top {
  width: 100%;
  height: 18%;
  background-color: white;
}

#top-first {
  width: 80%;
  height: 10%;
  margin: 0 15%;
}

#top-then {
  text-align: center;
  width: 100%;
  height: 6%;
  padding-left: 27%;
  margin: 0 auto; /*居中*/
}

#top-nav li {
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
}

#center-left li {
  height: 26px;
  line-height: 26px;
  font-size: 16px;
  margin-top: 10px;
  list-style: none;
  font-weight: bold;
  text-decoration: none
}

#center-left a {
  height: 30px;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
}

#top-nav a {
  height: 30px;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  padding: 30px;
}

li:hover {
  background-color: #0c1365;
}

#center {
  width: 100%;
  height: 62%;
  background-color: cornflowerblue;
  opacity: 80%; /*透明度*/
  overflow: auto;
}

#center-left {
  width: 14%;
  background-color: white;
  margin: 0 14%; /*居中*/
  float: left;
  position: absolute;
}

#center-right {
  width: 55%;
  background-color: white;
  margin-left: 30%;
  position: relative;
}

#bottom {
  width: 100%;
  height: 15%;
  background-color: #1b3d65;
}

</style>