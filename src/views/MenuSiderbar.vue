<template>
  <div class="sidebar">
    <h2>菜单</h2>
    <ul>
      <li><Router-link to="/">主页</Router-link></li>
      <li><Router-link to="/Product">订单管理</Router-link></li>
      <li><Router-link to="/Warehouse">库存管理</Router-link></li>
      <li><Router-link to="/AssemblyLine">流水线管理</Router-link></li>
      <li><Router-link to="/Equipment">设备管理</Router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped>
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
</style>
