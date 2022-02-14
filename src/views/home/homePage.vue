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
            <a @click="openThink" href="javascript:void(0);">工作室介绍</a>
          </li>
          <li>
            <a @click="openThink" href="javascript:void(0);">关于我们</a>
          </li>
          <li>
            <a @click="openThink" href="javascript:void(0);">购买产品</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="center">
      <div id="center-left" style="width: auto;margin-left: 15%">
        <ul>
          <li style="text-align: left;background-color: #00b8d2;"><h3>宝贝分类</h3></li>
          <div v-for="think in thinkTypeOptions">
            <li><a href="#" @click="changeModel(think.pkId)"><span>{{ think.thinkType }}</span></a></li>
          </div>
        </ul>
      </div>
      <div id="center-right">
        <div v-if="attachList.length === 0">
          <h1 style="color: #3366cc"> 很抱歉没有此类商品，请看其他宝贝分类</h1>
        </div>
        <div v-else>
          <div v-for="item in attachList">
            <image></image>
            <el-col :span="6">
              <el-image
                  style="width: 90%; height: 180px;"
                  :src="item.onlineUrl"
                  :alt="item.originName"
                  fil="contain"
                  @click="openTaBaoDetail(item.href)"
              >
              </el-image>
              <span class="img_title" style="font-size: 12px;width: 90%">
              {{ item.title }}
            </span>
            </el-col>
          </div>
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
    openThink() {
      window.open("https://shop59110010.taobao.com/category.htm?spm=a1z10.1-c.w4010-14746013404.2.64d77f43KPd1jA&search=y");
    },
    openTaBaoDetail(href) {
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

.img_title {
  display: block;
  margin: 10px 3px 15px;
  line-height: 16px;
  height: 32px;
  overflow: hidden;
  color: #36c;
}

#zikuHome {
  width: 100%;
  height: 100%;
  /*background: url(../../../screenshot/background.jpg) no-repeat center 0;*/
  /*background-color: #66b1ff;*/
  overflow: auto;
}

#top {
  width: 100%;
  /*height: 18%;*/
  background-color: white;
}

#top-first {
  width: 80%;
  /*height: 9%;*/
  margin: 0 15%;
}

#top-then {
  text-align: center;
  width: 80%;
  /*height: 5%;*/
  padding-left: 27%;
  /*margin: 0 auto; !*居中*!*/
}

#top-nav li {
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
}

#center-left li {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-top: 5px;
  list-style: none;
  font-weight: bold;
  text-decoration: none;
  color: black;
}

#center-left a {
  /*height: 30px;*/
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  color: black;
}

#top-nav a {
  height: 30px;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  padding: 30px;
}

li:hover {
  background-color: #1c6286;
}

#center {
  width: 100%;
  /*height: 62%;*/
  background-color: rgb(255, 255, 255);
  /*overflow: auto;*/
}

#center-left {
  width: 30%;
  background-color: white;
  /*margin: 0 14%; !*居中*!*/
  float: left;
  position: absolute;
}

#center-right {
  padding-top: 30px;
  width: 60%;
  background-color: white;
  margin-left: 3%;
  margin-right: 10%;
  float: right;
}

#bottom {
  width: 100%;
  height: 10%;
  /*background-color: #1b3d65;*/
}

</style>
