<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-content">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
      <slot></slot>
      <div class="modal-actions">
        <button class="btn" @click="confirm">确定</button>
        <button class="btn" @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  title: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 550px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
.modal-content > * {
  margin-bottom: 15px;
}
input[type='text'],
input[type='number'] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
