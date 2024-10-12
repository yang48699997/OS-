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
          <div id="chart_3" class="echart" style="width: 100%; height: 3.6rem"></div>
          <img class="t_r_line" src="/img/right_line.png" alt="" />
        </div>
      </div>
      <div class="t_right_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div
          id="chart_4"
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
        <div id="chart_2" class="echart" style="width: 100%; height: 3.6rem"></div>
        <img class="t_r_line" src="/img/right_line.png" alt="" />
      </div>
      <div class="b_center_box">
        <img class="t_l_line" src="/img/left_line.png" alt="" />
        <div id="chart_1" class="echart" style="width: 100%; height: 3.6rem"></div>
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
            <tr>
              <td>{{ time }}</td>
              <td>{{ name }}</td>
              <td>{{ phone_number }}</td>
              <td>{{ record }}</td>
            </tr>
            <tr>
              <td>{{ time }}</td>
              <td>{{ name }}</td>
              <td>{{ phone_number }}</td>
              <td>{{ record }}</td>
            </tr>
            <tr>
              <td>{{ time }}</td>
              <td>{{ name }}</td>
              <td>{{ phone_number }}</td>
              <td>{{ record }}</td>
            </tr>
            <tr>
              <td>{{ time }}</td>
              <td>{{ name }}</td>
              <td>{{ phone_number }}</td>
              <td>{{ record }}</td>
            </tr>
            <tr>
              <td>{{ time }}</td>
              <td>{{ name }}</td>
              <td>{{ phone_number }}</td>
              <td>{{ record }}</td>
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

const name = '羊桑'
const phone_number = 11012013011
const time = '2024-10-02'
const record = '正常'

const setFontSize = () => {
  const whdef = 100 / 1920
  const wW = window.innerWidth
  const rem = wW * whdef
  document.documentElement.style.fontSize = rem + 'px'
}

const echart_1 = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('chart_1'))
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption({
    title: {
      text: '本月设备状态统计',
      top: 35,
      left: 20,
      textStyle: {
        fontSize: 18,
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      right: 20,
      top: 35,
      data: ['故障', '正常'],
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['0', '60%'],
        center: ['50%', '60%'],
        color: ['#e72325', '#98e002', '#2ca3fd'],
        label: {
          normal: {
            formatter: '{b}\n{d}%'
          }
        },
        data: [
          {
            value: 18,
            name: '故障'
          },
          {
            value: 5000,
            name: '正常',
            selected: true
          }
        ]
      }
    ]
  })
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const echart_2 = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('chart_2'))
  var data = {
    id: 'multipleBarsLines',
    title: '2024年前半年检测统计',
    legendBar: ['正面占比', '中立占比', '负面占比'],
    symbol: '', //数值是否带百分号        --默认为空 ''
    legendLine: ['同期对比'],
    xAxis: ['一月', '二月', '三月', '四月', '五月', '六月'],
    yAxis: [[8, 10, 10, 11, 4, 13]],
    lines: [[10, 10, 9, 11, 7, 4]],
    barColor: ['#3FA7DC', '#7091C4', '#5170A2'], //柱子颜色 必填参数
    barWidth: 12,
    subTitle: '',
    legendRight: '5%',
    lineColor: ['#D9523F'] // 折线颜色
  }
  /////////////end/////////

  var myData = (function test() {
    var yAxis = data.yAxis || []
    var lines = data.lines || []
    var legendBar = data.legendBar || []
    var legendLine = data.legendLine || []
    var symbol = data.symbol || ' '
    var seriesArr: {}[] = []
    var legendArr: { name: string | boolean }[] = []
    yAxis &&
      yAxis.forEach((item, index) => {
        legendArr.push({
          name: legendBar && legendBar.length > 0 && legendBar[index]
        })
        seriesArr.push({
          name: legendBar && legendBar.length > 0 && legendBar[index],
          type: 'bar',
          barGap: '0.5px',
          data: item,
          barWidth: data.barWidth || 12,
          label: {
            normal: {
              show: true,
              formatter: '{c}' + symbol,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                textAlign: 'left',
                fontSize: 11
              }
            }
          },
          itemStyle: {
            //图形样式
            normal: {
              barBorderRadius: 4,
              color: data.barColor[index]
            }
          }
        })
      })

    lines &&
      lines.forEach((item, index) => {
        legendArr.push({
          name: legendLine && legendLine.length > 0 && legendLine[index]
        })
        seriesArr.push({
          name: legendLine && legendLine.length > 0 && legendLine[index],
          type: 'line',
          data: item,
          itemStyle: {
            normal: {
              color: data.lineColor[index],
              lineStyle: {
                width: 3,
                type: 'solid'
              }
            }
          },
          label: {
            normal: {
              show: false, //折线上方label控制显示隐藏
              position: 'top'
            }
          },
          symbol: 'circle',
          symbolSize: 10
        })
      })

    return {
      seriesArr,
      legendArr
    }
  })()

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption({
    title: {
      show: true,
      top: '10%',
      left: '3%',
      text: data.title,
      textStyle: {
        fontSize: 18,
        color: '#fff'
      },
      subtext: data.subTitle,
      link: ''
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: { name: string; data: string; seriesName: string }[]) => {
        var time = ''
        var str = ''
        for (var i of params) {
          time = i.name.replace(/\n/g, '') + '<br/>'
          if (i.data == 'null' || i.data == null) {
            str += i.seriesName + '：无数据' + '<br/>'
          } else {
            str += i.seriesName + '：' + i.data + Symbol + '%<br/>'
          }
        }
        return time + str
      },
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      right: data.legendRight || '30%',
      top: '12%',
      itemGap: 16,
      itemWidth: 10,
      itemHeight: 10,
      data: myData.legendArr,
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12
      }
    },
    grid: {
      x: 30,
      y: 80,
      x2: 30,
      y2: 60
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisTick: {
        show: false
      },

      axisLine: {
        show: true,
        lineStyle: {
          color: '#1AA1FD'
        },
        symbol: ['none', 'arrow']
      },
      axisLabel: {
        show: true,
        interval: '0',
        textStyle: {
          lineHeight: 16,
          padding: [2, 2, 0, 2],
          height: 50,
          fontSize: 12
        },
        rich: {
          Sunny: {
            height: 50,
            // width: 60,
            padding: [0, 5, 0, 5],
            align: 'center'
          }
        },
        formatter: (params: any, index: number) => {
          var newParamsName = ''
          var splitNumber = 5
          var paramsNameNumber = params && params.length
          if (paramsNameNumber && paramsNameNumber <= 4) {
            splitNumber = 4
          } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
            splitNumber = 4
          } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
            splitNumber = 5
          } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
            splitNumber = 5
          } else {
            params = params && params.slice(0, 15)
          }

          var provideNumber = splitNumber //一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          params = newParamsName
          return '{Sunny|' + params + '}'
        },
        color: '#1AA1FD'
      }
    },
    yAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#1AA1FD'
        },
        symbol: ['none', 'arrow']
      },
      type: 'value',
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#1AA1FD',
          type: 'solid'
        }
      }
    },
    series: myData.seriesArr
  })
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const echart_3 = () => {
  // 基于准备好的dom，初始化echarts实例

  var app = {}

  var chartDom = document.getElementById('chart_3')
  var myChart = echarts.init(chartDom)
  var option

  let noise = getNoiseHelper()
  let xData: number[] = []
  let yData: number[] = []
  noise.seed(Math.random())
  function generateData(theta: number, min: number, max: number) {
    let data = []
    for (let i = 0; i <= 200; i++) {
      for (let j = 0; j <= 100; j++) {
        data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5])
      }
      xData.push(i)
    }
    for (let j = 0; j < 100; j++) {
      yData.push(j)
    }
    return data
  }
  let data = generateData(2, -5, 5)
  option = {
    tooltip: {},
    grid: {
      right: 140,
      left: 40
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'category',
      data: yData
    },
    visualMap: {
      type: 'piecewise',
      min: 0,
      max: 1,
      left: 'right',
      top: 'center',
      calculable: true,
      realtime: false,
      splitNumber: 8,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    series: [
      {
        name: '热力',
        type: 'heatmap',
        data: data,
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 1
          }
        },
        progressive: 1000,
        animation: false
      }
    ]
  }
  function getNoiseHelper() {
    class Grad {
      x: number
      y: number
      z: number
      constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
      }
      dot2(x: number, y: number) {
        return this.x * x + this.y * y
      }
      dot3(x: number, y: number, z: number) {
        return this.x * x + this.y * y + this.z * z
      }
    }
    const grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1)
    ]
    const p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
      142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
      203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
      74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
      220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209,
      76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198,
      173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
      207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
      154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79,
      113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
      191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29,
      24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ]
    let perm = new Array(512)
    let gradP = new Array(512)
    function seed(seed: number) {
      if (seed > 0 && seed < 1) {
        seed *= 65536
      }
      seed = Math.floor(seed)
      if (seed < 256) {
        seed |= seed << 8
      }
      for (let i = 0; i < 256; i++) {
        let v
        if (i & 1) {
          v = p[i] ^ (seed & 255)
        } else {
          v = p[i] ^ ((seed >> 8) & 255)
        }
        perm[i] = perm[i + 256] = v
        gradP[i] = gradP[i + 256] = grad3[v % 12]
      }
    }
    seed(0)
    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }
    function lerp(a: number, b: number, t: number) {
      return (1 - t) * a + t * b
    }
    function perlin2(x: number, y: number) {
      let X = Math.floor(x),
        Y = Math.floor(y)
      x = x - X
      y = y - Y
      X = X & 255
      Y = Y & 255
      let n00 = gradP[X + perm[Y]].dot2(x, y)
      let n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1)
      let n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y)
      let n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1)
      let u = fade(x)
      return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y))
    }
    return {
      seed,
      perlin2
    }
  }

  option && myChart.setOption(option)

  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const echart_4 = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('chart_4'))
  var data = [70, 34, 60, 78, 69]
  var titlename = ['1号机', '2号机', '3号机', '4号机', '5号机']
  var valdata = [702, 406, 664, 793, 505]
  var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption({
    title: {
      text: '设备使用频率',
      x: 'center',
      textStyle: {
        color: '#FFF'
      },
      left: '6%',
      top: '10%'
    },
    //图标位置
    grid: {
      top: '20%',
      left: '32%'
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          formatter: (value: number, index: number) => {
            return [`{lg|${index + 1}}  ` + '{title|' + value + '} '].join('\n')
          },
          rich: {
            lg: {
              backgroundColor: '#339911',
              color: '#fff',
              borderRadius: 15,
              // padding: 5,
              align: 'center',
              width: 15,
              height: 15
            }
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: data,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function (params: { dataIndex: number }) {
              var num = myColor.length
              return myColor[params.dataIndex % num]
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{c}%'
          }
        }
      },
      {
        name: '框',
        type: 'bar',
        yAxisIndex: 1,
        barGap: '-100%',
        data: [100, 100, 100, 100, 100],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: 'none',
            borderColor: '#00c1de',
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  })
  // window.addEventListener("resize", function () {
  //     myChart.resize();
  // });
}

onMounted(() => {
  setFontSize() // 初始化字体大小
  window.addEventListener('resize', setFontSize) // 绑定窗口调整事件

  echart_1()
  echart_2()
  echart_3()
  echart_4()
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
