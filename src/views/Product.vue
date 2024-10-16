<template>
  <div class="layout">
    <MenuSiderbar />
    <div class="content">
      <UserInfo />
      <h1>生产调度管理</h1>
      <div class="order-controls">
        <select v-model="newOrderModel" class="input-field">
          <option value="" disabled>选择车型</option>
          <option value="轿车">轿车</option>
          <option value="SUV">SUV</option>
          <option value="MPV">MPV</option>
        </select>
        <input
          type="number"
          v-model="newOrderPriority"
          placeholder="优先级 (0-5)"
          class="input-field"
          min="0"
          max="5"
        />
        <input
          type="number"
          v-model="newOrderQuantity"
          placeholder="数量"
          class="input-field"
          min="1"
        />
        <button class="btn" @click="addOrder">增加订单</button>
      </div>
      <div class="order-table">
        <h2>生产订单</h2>
        <table>
          <thead>
            <tr>
              <th>订单编号</th>
              <th>车型</th>
              <th>优先级</th>
              <th>数量</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders.slice().reverse()" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.model }}</td>
              <td>{{ order.priority }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.status }}</td>
              <td>
                <button class="btn cancel-btn" @click="confirmCancelOrder(order.id)">
                  取消订单
                </button>
                <button class="btn delete-btn" @click="confirmDeleteOrder(order.id)">
                  删除记录
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="schedule-info" v-if="scheduledOrders.length">
        <h2>调度状态</h2>
        <ul>
          <li v-for="scheduled in scheduledOrders" :key="scheduled.id">
            订单编号: {{ scheduled.id }} - 状态: {{ scheduled.status }}
          </li>
        </ul>
      </div>
      <div class="log">
        <h2>日志</h2>
        <ul>
          <li v-for="entry in visibleLogEntries" :key="entry.id">
            {{ entry.message }} (时间: {{ entry.timestamp }})
          </li>
        </ul>
        <button class="btn" v-if="showMore" @click="toggleLogVisibility">
          {{ isExpanded ? '收起日志' : '展开日志' }}
        </button>
        <button class="btn clear-btn" @click="clearLogs">清除日志</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MenuSiderbar from './MenuSiderbar.vue'
import UserInfo from './UserInfo.vue'
import { db } from '@/utils/db'

export interface Order {
  id: number
  model: string
  priority: number
  quantity: number
  status: string
  semaphore: number
}
export interface LogEntry {
  id: number
  message: string
  timestamp: string
}
const orders = ref<Order[]>([])
db.data
  .where('id')
  .equals(0)
  .toArray()
  .then((resolve) => {
    const ans = resolve[0]
    orders.value = JSON.parse(ans.order ?? '')
  })
const scheduledOrders = ref<Order[]>([])
const logEntries = ref<LogEntry[]>([])
db.data
  .where('id')
  .equals(0)
  .toArray()
  .then((resolve) => {
    const ans = resolve[0]
    logEntries.value = JSON.parse(ans.log ?? '')
  })
const newOrderModel = ref<string>('')
const newOrderPriority = ref<number>(0)
const newOrderQuantity = ref<number>(1)
const isExpanded = ref(false)
const logLimit = 8
const visibleLogEntries = ref<LogEntry[]>([])
const showMore = ref(true)

let now = 0
db.data
  .where('id')
  .equals(0)
  .toArray()
  .then((resolve) => {
    const ans = resolve[0]
    now = ans.now ?? 0
  })
function getRandomInt() {
  let min = 1
  let max = 1000000000
  return max + Math.floor(Math.random() * (max - min + 1)) + min
}

const addOrder = (): void => {
  if (newOrderModel.value.trim() === '') {
    alert('车型不能为空')
    return
  }
  if (newOrderPriority.value < 0 || newOrderPriority.value > 10) {
    alert('优先级必须在0到10之间')
    return
  }
  if (newOrderQuantity.value <= 0) {
    alert('数量必须大于零')
    return
  }
  const newId = getRandomInt()
  const newOrder: Order = {
    id: newId,
    model: newOrderModel.value,
    priority: newOrderPriority.value,
    quantity: newOrderQuantity.value,
    status: '待生产',
    semaphore: (now % 3) + 1
  }
  now++
  db.data.update(0, {
    now: now
  })
  orders.value.push(newOrder)
  updateDb()
  logEntries.value.push({
    id: logEntries.value.length + 1,
    message: `增加订单: ${newOrder.model}，优先级: ${newOrder.priority}，数量: ${newOrder.quantity}`,
    timestamp: new Date().toLocaleString()
  })
  if (logEntries.value.length > 100) {
    logEntries.value.shift()
  }
  logEntries.value.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  updateLogLocalStorage()
  newOrderModel.value = ''
  newOrderPriority.value = 0
  newOrderQuantity.value = 1
  updateVisibleLogEntries()
}
const confirmCancelOrder = (id: number): void => {
  if (confirm('确定要取消此订单吗？')) {
    cancelOrder(id)
  }
}
const confirmDeleteOrder = (id: number): void => {
  cancelOrder(id)
}
const cancelOrder = (id: number): void => {
  const orderIndex = orders.value.findIndex((order) => order.id === id)
  if (orderIndex !== -1) {
    const canceledOrder = orders.value[orderIndex]
    orders.value.splice(orderIndex, 1)
    updateDb()
    logEntries.value.push({
      id: logEntries.value.length + 1,
      message: `取消订单: ${canceledOrder.model}，订单编号: ${canceledOrder.id}`,
      timestamp: new Date().toLocaleString()
    })
    if (logEntries.value.length > 100) {
      logEntries.value.shift()
    }
    logEntries.value.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    updateLogLocalStorage()
    updateVisibleLogEntries()
  }
}
const updateDb = () => {
  db.data.update(0, {
    order: JSON.stringify(orders.value)
  })
}
const updateLogLocalStorage = () => {
  db.data.update(0, {
    log: JSON.stringify(logEntries.value)
  })
}
onMounted(() => {
  logEntries.value.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  updateVisibleLogEntries()
})
const updateVisibleLogEntries = () => {
  if (isExpanded.value) {
    visibleLogEntries.value = logEntries.value
  } else {
    visibleLogEntries.value = logEntries.value.slice(0, logLimit)
  }
}
const toggleLogVisibility = () => {
  isExpanded.value = !isExpanded.value
  updateVisibleLogEntries()
}
const clearLogs = () => {
  if (confirm('确定要清除所有日志吗？')) {
    logEntries.value = []
    updateLogLocalStorage()
    updateVisibleLogEntries()
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #eef2f7;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
  overflow-y: auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #2c3e50;
}

.order-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.input-field {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
  font-size: 1em;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #007bff;
}

.order-table {
  margin: 20px 0;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  color: #34495e;
  font-weight: bold;
}

td {
  color: #2c3e50;
}

.schedule-info {
  margin-top: 30px;
}

.log {
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.log ul {
  list-style-type: none;
  padding-left: 0;
}

.btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #e74c3c;
}

.delete-btn {
  margin-left: 10px;
  background-color: #e74c3c;
}

.clear-btn {
  background-color: #f39c12;
}

.cancel-btn:hover,
.delete-btn:hover,
.clear-btn:hover {
  background-color: #b03a2e;
}
</style>
