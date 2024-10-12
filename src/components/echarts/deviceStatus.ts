import { init } from 'echarts'
const deviceStatus = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = init(document.getElementById('deviceStatus'))
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

export { deviceStatus }
