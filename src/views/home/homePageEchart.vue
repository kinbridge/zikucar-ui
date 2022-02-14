<template>
  <idv>
    <el-row :gutter="24">
      <el-col :span="8">
        <div id="pv">
          <h3 style="color: #3366cc;text-align: center">今日访问量（pv）</h3>
          <div style="text-align: center">{{pv}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="ip">
          <h3 style="color: #3366cc;text-align: center">今日独立IP</h3>
          <div style="text-align: center">{{ip}}</div>
        </div>
      </el-col>
      <el-col :span="8" >
        <div id="uv">
          <h3 style="color: #3366cc;text-align: center">今日用户量（uv）</h3>
          <div style="text-align: center">{{uv}}</div>
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
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);

      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      let option2 = {
        title: {
          text: 'Referer of a Website',
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
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'Email'},
              {value: 484, name: 'Union Ads'},
              {value: 300, name: 'Video Ads'}
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
    }
  }
}
</script>

<style scoped>

</style>
