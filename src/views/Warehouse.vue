<template>
  <div class="container">
    <MenuSiderbar />
    <div class="main-content">
      <UserInfo />

      <h1>汽车零件库存</h1>
      <div class="grid">
        <div class="inventory-item" v-for="part in inventory" :key="part.name">
          <h3>{{ part.name }}</h3>
          <p class="position">坐标：({{ part.position.x }}, {{ part.position.y }})</p>
          <span class="stock-count">{{ part.stock }} 件在库存</span>
          <div class="controls">
            <input
              class="input-field"
              type="number"
              v-model="part.inputAmount"
              min="1"
              placeholder="数量"
            />
            <button class="btn" @click="addStock(part)">入库</button>
            <button class="btn btn-remove" @click="removeStock(part)">出库</button>
          </div>
        </div>
      </div>

      <div class="logs">
        <h2>库存操作日志</h2>
        <ul>
          <li v-for="(log, index) in displayedLogs" :key="index">{{ log }}</li>
        </ul>
        <button class="btn" @click="toggleExpand">{{ isExpanded ? '收起' : '展开' }} 日志</button>
        <button class="btn clear-btn" @click="clearLogs">清除日志</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MenuSiderbar from '@/views/MenuSiderbar.vue'
import UserInfo from '@/views/UserInfo.vue'
import { db } from '@/utils/db'

export interface InventoryPart {
  name: string
  stock: number
  position: { x: number; y: number }
  inputAmount: number
}

const defaultInventory: InventoryPart[] = [
  { name: '底盘', stock: 10, position: { x: 0, y: 0 }, inputAmount: 0 },
  { name: '悬挂系统', stock: 10, position: { x: 0, y: 1 }, inputAmount: 0 },
  { name: '四轮驱动系统', stock: 10, position: { x: 0, y: 2 }, inputAmount: 0 },
  { name: '发动机', stock: 20, position: { x: 0, y: 3 }, inputAmount: 0 },
  { name: '变速器', stock: 15, position: { x: 1, y: 0 }, inputAmount: 0 },
  { name: '排气系统', stock: 15, position: { x: 1, y: 1 }, inputAmount: 0 },
  { name: '车门', stock: 12, position: { x: 1, y: 2 }, inputAmount: 0 },
  { name: '车顶', stock: 25, position: { x: 1, y: 3 }, inputAmount: 0 },
  { name: '高强度车身框架', stock: 25, position: { x: 2, y: 0 }, inputAmount: 0 },
  { name: '轻量化车身材料', stock: 25, position: { x: 2, y: 1 }, inputAmount: 0 },
  { name: '前后保险杠', stock: 25, position: { x: 2, y: 2 }, inputAmount: 0 },
  { name: '座椅', stock: 25, position: { x: 2, y: 3 }, inputAmount: 0 },
  { name: '仪表盘', stock: 25, position: { x: 3, y: 0 }, inputAmount: 0 },
  { name: '中控台', stock: 25, position: { x: 3, y: 1 }, inputAmount: 0 },
  { name: '越野防控装置', stock: 25, position: { x: 3, y: 2 }, inputAmount: 0 },
  { name: '减震系统', stock: 25, position: { x: 3, y: 3 }, inputAmount: 0 },
  { name: '电动机', stock: 25, position: { x: 4, y: 0 }, inputAmount: 0 },
  { name: '电池组', stock: 25, position: { x: 4, y: 1 }, inputAmount: 0 },
  { name: '充电系统', stock: 25, position: { x: 4, y: 2 }, inputAmount: 0 },
  { name: '自动驾驶系统', stock: 25, position: { x: 4, y: 3 }, inputAmount: 0 }
]

const inventory = ref<InventoryPart[]>([])
const logs = ref<string[]>([])
const isExpanded = ref(false)
const maxDisplayedLogs = 5

const loadInventory = () => {
  db.data
    .where('id')
    .equals(0)
    .toArray()
    .then((resolve) => {
      const ans = resolve[0]
      const storedInventory = ans.inventoryParts
      if (storedInventory) {
        inventory.value = JSON.parse(storedInventory)
      } else {
        inventory.value = defaultInventory
      }
    })
}

const loadLogs = () => {
  db.data
    .where('id')
    .equals(0)
    .toArray()
    .then((resolve) => {
      const ans = resolve[0]
      const storedLogs = ans.inventoryLog
      if (storedLogs) {
        logs.value = JSON.parse(storedLogs)
      }
    })
}

const saveInventory = () => {
  db.data.update(0, {
    inventoryParts: JSON.stringify(inventory.value)
  })
}

const saveLogs = () => {
  db.data.update(0, {
    inventoryLog: JSON.stringify(logs.value)
  })
}

onMounted(() => {
  loadInventory()
  loadLogs()
})

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleString()
}

const addStock = (part: InventoryPart) => {
  if (part.inputAmount > 0) {
    part.stock += parseInt(part.inputAmount.toString())
    const logMessage = `(${getCurrentTime()}) 添加 ${part.inputAmount} ${part.name} 到库存 (坐标：(${part.position.x}, ${part.position.y}))`
    logs.value.push(logMessage)
    saveLogs()
    saveInventory()
    part.inputAmount = 0
  }
}

const removeStock = (part: InventoryPart) => {
  if (part.inputAmount > 0 && part.stock >= part.inputAmount) {
    part.stock -= parseInt(part.inputAmount.toString())
    const logMessage = `(${getCurrentTime()}) 移除 ${part.inputAmount} ${part.name} 从库存 (坐标：(${part.position.x}, ${part.position.y}))`
    logs.value.push(logMessage)
    saveLogs()
    saveInventory()
    part.inputAmount = 0
  } else {
    alert('库存不足或无效数量')
  }
}

const displayedLogs = computed(() => {
  if (isExpanded.value) {
    return logs.value
  } else {
    return logs.value.slice(-maxDisplayedLogs)
  }
})

const clearLogs = () => {
  logs.value = []
  saveLogs()
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  max-width: 1420px;
  width: 100%;
  background-color: white;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f7fc;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.inventory-item {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.inventory-item:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.inventory-item h3 {
  margin: 10px 0;
  font-size: 1.25rem;
}

.position {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-remove {
  background-color: #dc3545;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-remove:hover {
  background-color: #c82333;
}

.stock-count {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.input-field {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.logs {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.logs ul {
  list-style-type: none;
  padding: 0;
}

.logs ul li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.clear-btn {
  background-color: #dc3545;
  margin-top: 10px;
}

.clear-btn:hover {
  background-color: #c82333;
}
</style>
