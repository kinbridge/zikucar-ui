<template>
  <idv>
    <el-row :gutter="24">
      <el-col :span="8">
        <div id="pv">
          <h3 style="color: #3366cc;text-align: center">今日访问量（pv）</h3>
          <div style="text-align: center">{{websiteNow.pv}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="ip">
          <h3 style="color: #3366cc;text-align: center">今日独立IP</h3>
          <div style="text-align: center">{{websiteNow.ip}}</div>
        </div>
      </el-col>
      <el-col :span="8" >
        <div id="uv">
          <h3 style="color: #3366cc;text-align: center">今日用户量（uv）</h3>
          <div style="text-align: center">{{websiteNow.uv}}</div>
        </div>
      </el-col>
    </el-row>
    <br/><br/><br/><br/>
    <el-row :gutter="20">
      <el-col :span="10">
        <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
      </el-col>
      <el-col :span="10" :offset="4">
        <div id="myChart2" :style="{width: '500px', height: '300px',}"></div>
      </el-col>
    </el-row>
  </idv>

</template>

<script>
export default {
  name: "homePageEchart",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      pv:3,
      ip:5,
      uv:4,
      dateStr: "2022-02-15",
      websiteList:[],
      websiteNow:Object
    }
  },
  mounted() {

    this.initData();
    // this.drawLine();
  },
  methods: {
    initData(){
      this.http.get(this.api.website.queryWebsiteNum,res=>{
        let  that = this;
        that.websiteList = res.data;
        that.websiteNow = res.data[0];
        let dateArr = [];
        let uvArr = [];
        let pvArr = [];
        let ipArr = [];
        for(let index in that.websiteList ){
          dateArr.push(that.websiteList[res.data.length-index-1].dateStr);
          uvArr.push(that.websiteList[res.data.length-index-1].uv);
          pvArr.push(that.websiteList[res.data.length-index-1].pv);
          ipArr.push(that.websiteList[res.data.length-index-1].ip);
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = that.$echarts.init(document.getElementById('myChart'))
        let option = {
          title: {
            text: '每周统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['访问量', '独立IP', '用户量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateArr
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '访问量',
              type: 'line',
              stack: 'Total',
              data: pvArr
            },
            {
              name: '独立IP',
              type: 'line',
              stack: 'Total',
              data: ipArr
            },
            {
              name: '用户量',
              type: 'line',
              stack: 'Total',
              data: uvArr
            },
          ]
        };
        // 绘制图表
        myChart.setOption(option);

        let myChart2 = that.$echarts.init(document.getElementById('myChart2'))
        let option2 = {
          title: {
            text: '访问总量',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '访问量',
              type: 'pie',
              radius: '50%',
              data: [
                {value: that.websiteList[0].pv, name: '访问量'},
                {value: that.websiteList[0].ip, name: '独立IP'},
                {value: that.websiteList[0].uv, name: '用户量'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart2.setOption(option2);

      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        title: {
          text: '每周统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访问量', '独立IP', '用户量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022/01/01', '2022/01/02', '2022/01/03', '2022/01/04', '2022/01/05', '2022/01/06', '2022/01/07']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '独立IP',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '用户量',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
        ]
      };
      // 绘制图表
      myChart.setOption(option);

      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      let option2 = {
        title: {
          text: '访问总量',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问量',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 580, name: '访问量'},
              {value: 484, name: '独立IP'},
              {value: 300, name: '用户量'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart2.setOption(option2);
    },
    queryWebsiteNum(){
      this.http.get(this.api.dept.list,res=>{
        this.websiteList = res.data;
      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    }
  }
}
</script>

<style scoped>

</style>
