<!-- components/UserInfoHeader.vue -->
<template>
  <div class="header">
    <div class="user-info">
      <span>User: Admin</span>
    </div>
    <div class="system-info">
      <span>System Time: <span id="clock"></span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const updateClock = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const formattedTime =
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const clockElement = document.getElementById('clock') as HTMLElement | null
  if (clockElement) {
    clockElement.innerText = formattedTime
  }
}
onMounted(() => {
  setInterval(updateClock, 1000)
  updateClock()
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info span {
  margin-left: 10px;
}
</style>
