<template>
  <div class="container">
    <MenuSiderbar />
    <div class="main">
      <UserInfo />
      <h2>生产进度</h2>
      <div class="progress">
        <div
          v-for="(line, index) in progressLines.slice().reverse()"
          :key="index"
          class="progress-item"
        >
          {{ line }}
        </div>
      </div>
      <div class="gantt-chart">
        <span>生产线A:</span>
        <div
          v-for="(order, index) in orderProgress[0]"
          :key="index"
          class="gantt-item"
          :style="{ width: order.duration + 'px', backgroundColor: getOrderColor(order) }"
          @mouseover="showOrderDetails(order)"
          @mouseleave="hideOrderDetails"
        ></div>
      </div>
      <div class="gantt-chart">
        <span>生产线B:</span>
        <div
          v-for="(order, index) in orderProgress[1]"
          :key="index"
          class="gantt-item"
          :style="{ width: order.duration + 'px', backgroundColor: getOrderColor(order) }"
          @mouseover="showOrderDetails(order)"
          @mouseleave="hideOrderDetails"
        ></div>
      </div>
      <div class="gantt-chart">
        <span>生产线C:</span>
        <div
          v-for="(order, index) in orderProgress[2]"
          :key="index"
          class="gantt-item"
          :style="{ width: order.duration + 'px', backgroundColor: getOrderColor(order) }"
          @mouseover="showOrderDetails(order)"
          @mouseleave="hideOrderDetails"
        ></div>
      </div>
      <div class="controls">
        <!-- <button class="start-button" @click="">开始调度</button> -->
        <button class="reset-button" @click="resetProgress">清除</button>
      </div>
      <div class="info-box" v-if="hoveredOrder">
        <h3>订单详细信息</h3>
        <p>订单名称: {{ hoveredOrder.name }}</p>
        <p>持续时间: {{ hoveredOrder.duration }} 分钟</p>
        <p>开始时间: {{ hoveredOrder.start }} 分钟</p>
        <p>结束时间: {{ hoveredOrder.end }} 分钟</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MenuSiderbar from './MenuSiderbar.vue'
import UserInfo from './UserInfo.vue'
import { db } from '@/utils/db'

interface Order {
  id: number
  model: string
  priority: number
  quantity: number
  status: string
  semaphore: number
}

interface OrderImpl {
  id: number
  need: number
  turn: number
  cur: number
  tot: number
  model: string
  start: number
  priority: number
}

interface ProcessStep {
  name: string
  description: string
  materials: string[]
  product: string
  time: number
  machine: string
}

interface AssemblyLine {
  type: string
  process: ProcessStep[]
  totalTime: number
}

export interface OrderProgress {
  name: string
  duration: number
  start: number
  end: number
  id: number
}

const orders = ref<Order[]>([])
const lines = ref<AssemblyLine[]>([])

const progressLines = ref<string[]>([])
const orderProgress = ref<OrderProgress[][]>([])
const hoveredOrder = ref<{ name: string; duration: number; start: number; end: number } | null>(
  null
)
let sum = 0
db.data
  .where('id')
  .equals(0)
  .toArray()
  .then((resolve) => {
    console.log(resolve)
    const ans = resolve[0]
    console.log(ans)
    orders.value = JSON.parse(ans.order ?? '')
    lines.value = JSON.parse(ans.lines ?? '')
    progressLines.value = JSON.parse(ans.progressLine ?? '')
    orderProgress.value = JSON.parse(ans.orderProgress ?? '')
    sum = ans.time ?? 0
  })

const updateLocalStorage = () => {
  db.data.update(0, {
    order: JSON.stringify(orders.value)
  })
  db.data.update(0, {
    progressLine: JSON.stringify(progressLines.value)
  })
  db.data.update(0, {
    orderProgress: JSON.stringify(orderProgress.value)
  })
  db.data.update(0, {
    time: sum
  })
}

const resetProgress = () => {
  db.data.update(0, {
    progressLine: '',
    orderProgress: '',
    time: 0
  })
}

const startProgress = (machine: string, p: number) => {
  db.data
    .where('id')
    .equals(0)
    .toArray()
    .then((resolve) => {
      const ans = resolve[0]
      progressLines.value = JSON.parse(ans.progressLine ?? '')
      orderProgress.value = JSON.parse(ans.orderProgress ?? '')
    })
  const queues: OrderImpl[][] = [[], [], [], [], [], [], [], [], [], []]
  const queue: OrderImpl[] = []

  orders.value.forEach((order) => {
    if (order.status != '已完成' && order.semaphore === p) {
      const assemblyLine = lines.value.find((line) => line.type === order.model)
      const priorityIndex = Math.min(order.priority, 5)
      if (assemblyLine) {
        const orderImpl = ref<OrderImpl>({
          id: order.id,
          need: assemblyLine.totalTime,
          turn: 0,
          cur: 0,
          tot: assemblyLine.process.length,
          model: assemblyLine.type,
          start: sum,
          priority: order.priority
        })
        queues[priorityIndex].push(orderImpl.value)
      } else {
        console.error(`找不到与模型 ${order.model} 匹配的生产线`)
      }
    }
  })

  const timeSlice = 20
  let currentQueueIndex = 0

  const processNextOrder = () => {
    while (currentQueueIndex < queues.length && queues[currentQueueIndex].length === 0) {
      currentQueueIndex++
    }

    if (currentQueueIndex >= queues.length) {
      progressLines.value.push(`${machine} 所有订单已完成！`)
      return
    }

    let currentQueue = queues[currentQueueIndex]
    let order = currentQueue.shift()
    let ok = 1
    for (let i = queues.length - 1; i > currentQueueIndex && ok; i--) {
      for (let j = 0; j < queues[i].length && ok; j++) {
        if (queues[i][j].start <= sum - queues[i][j].priority) {
          if (order) queues[currentQueueIndex].push(order)
          order = queues[i][j]
          ok = 0
          let l = j
          while (l--) {
            const tmp = queues[i].shift()
            if (tmp) queues[i].push(tmp)
          }
          order = queues[i].shift()
        }
      }
    }
    if (queue.length > 0 && queue[0].start <= sum - queue[0].priority * 100) {
      if (order) queues[currentQueueIndex].push(order)
      order = queue[0]
    }

    if (order) {
      const assemblyLine = lines.value.find((line) => line.type === order.model)
      let left = timeSlice * (currentQueueIndex + 1)
      if (currentQueueIndex === 0) left = 1000000
      console.log(left)
      if (assemblyLine) {
        const processStep = () => {
          if (order.cur < order.tot && left > 0) {
            const currentProcess = assemblyLine.process[order.cur]
            if (left >= currentProcess.time) {
              if (p === 1)
                orderProgress.value[0].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              if (p === 2)
                orderProgress.value[1].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              if (p === 3)
                orderProgress.value[2].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              left -= currentProcess.time
              sum += currentProcess.time
              progressLines.value.push(
                `${machine} 正在处理订单 ${order.id} 的工序 "${currentProcess.name}"...`
              )
              setTimeout(() => {
                progressLines.value.push(
                  `${machine} 耗时 ${currentProcess.time} 分钟, 已完成, 产出 "${currentProcess.product}" X 1`
                )
                order.cur++
                processStep()
              }, currentProcess.time * 50)
            } else {
              if (p === 1)
                orderProgress.value[0].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              if (p === 2)
                orderProgress.value[1].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              if (p === 3)
                orderProgress.value[2].push({
                  name: `订单 ${order.id}`,
                  duration: currentProcess.time,
                  start: sum,
                  end: sum + currentProcess.time,
                  id: order.id
                })
              sum += left
              progressLines.value.push(
                `${machine} 正在处理订单 ${order.id} 的工序 "${currentProcess.name}"...`
              )
              setTimeout(() => {
                progressLines.value.push(`${machine} 耗时 ${left} 分钟, 部分完成, 已加入到下级队列`)
                left = 0
                if (currentQueueIndex === 0) queues[0].push(order)
                else {
                  queues[Math.min(queues.length - 1, currentQueueIndex + 1)].push(order)
                }
                processNextOrder()
              }, left * 50)
            }
          } else if (order.cur === order.tot) {
            order.turn = sum
            processNextOrder()
            orders.value.forEach((order) => {
              if (order.id === order.id) {
                order.status = '已完成'
                updateLocalStorage()
              }
            })
          } else {
            if (currentQueueIndex === 0) queues[0].push(order)
            else {
              queues[Math.min(queues.length - 1, currentQueueIndex + 1)].push(order)
            }
            processNextOrder()
          }
        }
        updateLocalStorage()
        processStep()
      }
    }
  }
  processNextOrder()
}

const getOrderColor = (order: {
  name: string
  duration: number
  start: number
  end: number
  id: number
}) => {
  const colors = [
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#FF5722',
    '#9C27B0',
    '#E91E63',
    '#3F51B5',
    '#FF9800',
    '#9E9E9E',
    '#607D8B',
    '#FFEB3B',
    '#8BC34A',
    '#FF5722',
    '#673AB7',
    '#CDDC39',
    '#FF4081',
    '#00BCD4',
    '#009688',
    '#795548',
    '#F44336',
    '#2196F3',
    '#3F51B5',
    '#8BC34A',
    '#FF9800',
    '#FFEB3B',
    '#FF5722',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#FFC107',
    '#CDDC39'
  ]
  return colors[order.id % colors.length]
}

const showOrderDetails = (order: {
  name: string
  duration: number
  start: number
  end: number
}) => {
  hoveredOrder.value = order
}

const hideOrderDetails = () => {
  hoveredOrder.value = null
}

onMounted(() => {
  startProgress('生产线A', 1)
  startProgress('生产线B', 2)
  startProgress('生产线C', 3)
})
</script>

<style scoped>
.container {
  display: flex;
  height: 120vh;
  background-color: #f7f7f7;
}

.main {
  flex-grow: 1;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-left: 20px;
  max-width: 1000px;
  margin: 20px auto;
}

.progress {
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
}

.progress-item {
  background-color: #e7f3fe;
  border-left: 5px solid #2196f3;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  animation: fadeIn 0.5s;
}

.gantt-chart {
  display: flex;
  margin-top: 20px;
}

.gantt-item {
  height: 30px;
  margin-right: 1px;
  border-radius: 4px;
  color: white;
  text-align: center;
  line-height: 30px;
}

.controls {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.start-button,
.reset-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.start-button {
  background-color: #4caf50;
  color: white;
}

.reset-button {
  background-color: #f44336;
  color: white;
}

.info-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.info-box h3 {
  margin-top: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
