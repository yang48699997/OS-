<template>
  <div class="t_container">
    <header class="t_header">
      <span><a href="/">设备监测管理平台</a></span>
    </header>
    <main class="t_main">
      <div class="t_left_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div class="t_mbox t_rbox">
          <i></i>
          <span>本月设备故障数</span>
          <h2>18</h2>
        </div>
        <div class="t_mbox t_gbox">
          <i></i>
          <span>本月故障率</span>
          <h2>0.36%</h2>
        </div>
        <div class="t_mbox t_ybox">
          <i></i>
          <span>故障损失</span>
          <h2>1.14%</h2>
        </div>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
      <div class="t_center_box">
        <div class="t_top_box">
          <img class="t_l_line" src="/img/left_line.png" alt="" />
          <ul class="t_nav">
            <li>
              <span>设备数</span>
              <h1>50000</h1>
              <i></i>
            </li>
            <li>
              <span>上月设备增加数</span>
              <h1>30</h1>
              <i></i>
            </li>
            <li>
              <span>增值率</span>
              <h1>15%</h1>
            </li>
          </ul>
          <img class="t_r_line" src="/img/right_line.png" alt="" />
        </div>
        <div class="t_bottom_box">
          <img class="t_l_line" src="/img/left_line.png" alt="" />
          <div id="heatmap" class="echart" style="width: 100%; height: 3.6rem"></div>
          <img class="t_r_line" src="/img/right_line.png" alt="" />
        </div>
      </div>
      <div class="t_right_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div
          id="useFrequency"
          class="echart"
          style="width: 50%; height: 4.6rem; position: absolute"
        ></div>
        <header class="t_b_h">
          <span>异常终止次数</span>
          <img src="/img/end.png" />
          <h3>5<span>次</span></h3>
        </header>
        <main class="t_b_m">
          <img src="/img/map.png" alt="" />
          <div class="t_b_box">
            <span>溫度</span>
            <i></i>
            <h2>23℃</h2>
          </div>
          <div class="t_b_box1">
            <span>湿度</span>
            <i></i>
            <h2>56RH</h2>
          </div>
          <div class="t_b_box2">
            <span>信号</span>
            <i></i>
            <h2>-90dBm</h2>
          </div>
          <div class="t_b_box3">
            <span>光线</span>
            <i></i>
            <h2>250LX</h2>
          </div>
        </main>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
      <div class="b_left_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div id="detectionStatistics" class="echart" style="width: 100%; height: 3.6rem"></div>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
      <div class="b_center_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div id="deviceStatus" class="echart" style="width: 100%; height: 3.6rem"></div>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
      <div class="b_right_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <h1 class="t_title">设备维保数据查看</h1>
        <table class="t_table">
          <thead>
            <tr>
              <th>维护时间</th>
              <th>维保人</th>
              <th>维保电话</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in maintenanceRecords" :key="index">
              <td>{{ item.time }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone_number }}</td>
              <td>{{ item.record }}</td>
            </tr>
          </tbody>
        </table>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { deviceStatus } from '@/components/echarts/deviceStatus'
import { detectionStatistics } from '@/components/echarts/detectionStatistics'
import { heatmap } from '@/components/echarts/heatmap'
import { useFrequency } from '@/components/echarts/useFrequency'

const name = '羊桑'
const phone_number = 11012013011
const time = '2024-10-02'
const record = '正常'
const maintenanceRecords = [
  {
    name,
    time,
    phone_number,
    record
  }
]

const setFontSize = () => {
  const whdef = 100 / 1920
  const wW = window.innerWidth
  const rem = wW * whdef
  document.documentElement.style.fontSize = rem + 'px'
}

onMounted(() => {
  setFontSize() // 初始化字体大小
  window.addEventListener('resize', setFontSize) // 绑定窗口调整事件

  deviceStatus()
  detectionStatistics()
  heatmap()
  useFrequency()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setFontSize) // 解绑事件
})
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
html {
  font-size: 100px;
}
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  list-style: 0;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: white;
}

/*正文*/
.t_container {
  width: 100%;
  height: 100%;
  min-width: 1360px;
  background: url(/img/true.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-height: 756px;
}
.t_header {
  width: 100%;
  height: 80px;
  background: url(/img/linx.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.t_header span {
  color: #fff;
  font-size: 0.36rem;
  position: absolute;
  top: 50%;
  margin-top: -0.24rem;
  left: 9%;
}
.t_main {
  width: 98%;
  height: 8.74rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  margin-bottom: 0;
}
.t_left_box {
  position: relative;
  width: 3.36rem;
  height: 4.6rem;
  display: inline-block;
  text-align: center;
}
.t_l_line {
  position: absolute;
  top: 0;
  left: 0;
}
.t_r_line {
  position: absolute;
  bottom: 0;
  right: 0;
}
.t_center_box {
  width: 6.82rem;
  display: inline-block;
  min-width: 490px;
}
.t_top_box {
  width: 100%;
  height: 1.13rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.2rem;
}
.t_bottom_box {
  width: 100%;
  height: 3.17rem;
  overflow: hidden;
  position: relative;
}
.t_right_box {
  display: inline-block;
  width: 7.8rem;
  height: 4.6rem;
  position: relative;
  min-width: 560px;
}
.b_left_box {
  display: inline-block;
  width: 5.9rem;
  height: 3.6rem;
  position: relative;
  min-width: 425px;
}
.b_center_box {
  display: inline-block;
  width: 6rem;
  height: 3.6rem;
  position: relative;
  min-width: 432px;
}
.b_right_box {
  display: inline-block;
  width: 6rem;
  height: 3.6rem;
  position: relative;
  min-width: 432px;
}
.t_mbox {
  width: 3rem;
  height: 1.28rem;
  position: relative;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.t_rbox {
  background: #d9523f;
}
.t_gbox {
  background: #13d0b2;
}
.t_ybox {
  background: #f6a645;
}
.t_mbox i {
  display: inline-block;
  width: 0.46rem;
  height: 0.48rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20%;
  margin: auto;
}
.t_mbox h2 {
  font-size: 0.28rem;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
}
.t_mbox span {
  font-size: 0.2rem;
  color: #fff;
  position: absolute;
  top: 24%;
  left: 48%;
}
.t_rbox i {
  background: url(/img/indent.png) no-repeat;
  background-size: 100% 100%;
}
.t_gbox i {
  background: url(/img/vip.png) no-repeat;
  background-size: 100% 100%;
}
.t_ybox i {
  background: url(/img/consumption.png) no-repeat;
  background-size: 100% 100%;
}
.t_nav {
  width: 100%;
  height: 100%;
}
.t_nav li {
  display: inline-block;
  width: 30%;
  height: 100%;
  text-align: center;
  position: relative;
}
.t_nav li span {
  font-size: 0.16rem;
  color: #1aa1fd;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 25%;
}
.t_nav li h1 {
  font-size: 0.3rem;
  color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
}
.t_nav li i {
  width: 1px;
  height: 100%;
  position: absolute;
  right: -0.2rem;
  background: url('/img/sper.png') no-repeat;
  background-size: 100% 100%;
}
.t_table {
  font-size: 0.16rem;
  color: #fff;
  width: 94%;
  margin: 0 auto;
  border-spacing: 0;
  text-align: center;
  box-sizing: border-box;
  margin-top: 12%;
}
.t_table tr {
  margin: 0;
  padding: 0;
  height: 0.42rem;
}
.t_table thead tr {
  background: #053a98;
}
.t_table tbody tr td:first-child {
  border-left: 1px solid #053a98;
}
.t_table td {
  border-bottom: 1px solid #053a98;
  border-right: 1px solid #053a98;
}
.t_title {
  position: absolute;
  font-size: 0.18rem;
  color: #fff;
  left: 5%;
  top: 10%;
}
.t_b_h,
t_b_m {
  position: absolute;
  font-size: 0.16rem;
  left: 54%;
  width: 50%;
  height: 4.6rem;
}
.t_b_h span {
  position: absolute;
  color: #fff;
  top: 10%;
}
.t_b_h img {
  position: absolute;
  width: 0.53rem;
  height: 0.53rem;
  top: 6%;
  left: 24%;
}
.t_b_h h3 {
  font-size: 0.36rem;
  color: #f0ff00;
  position: absolute;
  left: 55%;
  top: 8%;
  width: 1rem;
}
.t_b_h h3 span {
  font-size: 0.2rem;
  position: absolute;
  left: 50%;
  top: 28%;
  color: #0072ff;
}
.t_b_m img {
  position: absolute;
  left: 52%;
  top: 22%;
  border-top: 1px dotted #f0ff00;
  padding: 0 0.18rem;
  padding-top: 20px;
  width: 3.19rem;
  height: 1.67rem;
}
.t_b_box,
.t_b_box1,
.t_b_box2,
.t_b_box3 {
  width: 1.3rem;
  height: 0.56rem;
  border: 1px dotted #f0ff00;
  border-radius: 5px;
  position: absolute;
}
.t_b_box {
  top: 68%;
  left: 56%;
}
.t_b_box span,
.t_b_box1 span,
.t_b_box2 span,
.t_b_box3 span {
  font-size: 0.14rem;
  color: #fff;
  position: absolute;
  left: 10%;
}
.t_b_box i,
.t_b_box1 i,
.t_b_box2 i,
.t_b_box3 i {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 15%;
}
.t_b_box i {
  background: url('/img/t.png') no-repeat;
  background-size: 100% 100%;
}
.t_b_box1 i {
  background: url('/img/s.png') no-repeat;
  background-size: 100% 100%;
}
.t_b_box2 i {
  background: url('/img/j.png') no-repeat;
  background-size: 100% 100%;
}
.t_b_box3 i {
  background: url('/img/g.png') no-repeat;
  background-size: 100% 100%;
}
.t_b_box h2,
.t_b_box1 h2,
.t_b_box2 h2,
.t_b_box3 h2 {
  font-size: 0.18rem;
  color: #fff;
  position: absolute;
  top: 30%;
  left: 40%;
}
.t_b_box1 {
  top: 68%;
  left: 78%;
}
.t_b_box2 {
  top: 84%;
  left: 56%;
}
.t_b_box3 {
  top: 84%;
  left: 78%;
}
</style>
