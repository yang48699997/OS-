<template>
  <div class="container">
    <div class="sidebar">
      <h2>菜单</h2>
      <ul>
        <li><Router-link to="#">生产调度</Router-link></li>
        <li><Router-link to="/Equipment">设备管理</Router-link></li>
        <li><Router-link to="#">库存管理</Router-link></li>
        <li><Router-link to="#">数据分析</Router-link></li>
      </ul>
    </div>
    <div class="main">
      <div class="header">
        <div class="user-info">
          <span>User: Admin</span>
        </div>
        <div class="system-info">
          <span>System Time: 12:45 PM</span>
        </div>
      </div>
      <div class="dashboard">
        <div class="dashboard-section task-progress">
          <h3>Current Task Progress</h3>
          <p>Task 1: 80% complete</p>
          <p>Task 2: 40% complete</p>
          <button>Update Task Status</button>
        </div>
        <div class="dashboard-section equipment-status">
          <h3>Equipment Status</h3>
          <p>Status: Running</p>
          <button>Stop Equipment</button>
        </div>
        <div class="dashboard-section quality-monitoring">
          <h3>Quality Monitoring</h3>
          <p>Quality metrics are within the accepted range.</p>
          <button>Trigger Alarm</button>
        </div>
        <div class="dashboard-section inventory-management">
          <h3>Inventory Management</h3>
          <p>Raw Material A: 120 units</p>
          <button>Update Inventory</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {})
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f7fc;
}
.container {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #1f2b49;
  padding: 20px;
  color: white;
}
.sidebar h2 {
  color: #a8b9d6;
}
.sidebar ul {
  list-style-type: none;
  padding: 0;
}
.sidebar ul li {
  margin: 20px 0;
  font-size: 18px;
}
.sidebar ul li a {
  color: #fff;
  text-decoration: none;
}
.main {
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f7fc;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.header .user-info {
  display: flex;
  align-items: center;
}
.header .user-info span {
  margin-left: 10px;
}
.dashboard {
  margin-top: 20px;
}
.dashboard-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.dashboard-section h3 {
  margin-bottom: 10px;
  font-size: 20px;
}
.task-progress,
.equipment-status,
.quality-monitoring,
.inventory-management {
  display: flex;
  flex-direction: column;
}
button {
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #1f77d0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
</style>
