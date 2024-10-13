import { init } from 'echarts'
const detectionStatistics = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = init(document.getElementById('detectionStatistics'))
  const data = {
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

  const myData = (() => {
    const yAxis = data.yAxis ?? []
    const lines = data.lines ?? []
    const legendBar = data.legendBar ?? []
    const legendLine = data.legendLine ?? []
    const symbol = data.symbol ?? ' '
    const seriesArr: {}[] = []
    const legendArr: { name: string | boolean }[] = []
    yAxis &&
      yAxis.forEach((item, index) => {
        legendArr.push({
          name: legendBar?.[index] ?? ''
        })
        seriesArr.push({
          name: legendBar?.[index] ?? '',
          type: 'bar',
          barGap: '0.5px',
          data: item,
          barWidth: data.barWidth ?? 12,
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
          name: legendLine?.[index] ?? ''
        })
        seriesArr.push({
          name: legendLine?.[index] ?? '',
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
            str += i.seriesName + '：' + i.data + '%<br/>'
          }
        }
        return time + str
      },
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      right: data.legendRight ?? '30%',
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
          const paramsNameNumber = params?.length
          if (paramsNameNumber) {
            if (paramsNameNumber <= 7) {
              splitNumber = 4
            } else if (paramsNameNumber > 14) {
              params = params.slice(0, 15)
            }
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

export { detectionStatistics }
