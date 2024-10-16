<template>
  <div class="container">
    <MenuSiderbar />
    <div class="main">
      <UserInfo />
      <h1>流水线管理</h1>
      <div class="line-management">
        <div
          v-for="(line, index) in assemblyLines"
          :key="index"
          class="assembly-line"
          @click="openEditModal(line, index)"
        >
          <div class="line-header">
            <h3>流水线 {{ index + 1 }}: {{ line.type }}</h3>
            <button class="toggle-btn" @click.stop="toggleDetails(index)">
              {{ expanded[index] ? '折叠' : '展开' }}
            </button>
          </div>
          <p>生产工序:</p>
          <ul v-if="expanded[index]" class="process-list">
            <li v-for="(process, i) in line.process" :key="i" class="process-item">
              <div class="process-name">
                <strong>{{ process.name }}</strong>
              </div>
              <div class="process-detail">
                <p>描述: {{ process.description }}</p>
                <p>原料: {{ process.materials }}</p>
                <p>产物: {{ process.product }}</p>
                <p>耗时: {{ process.time }} 分钟</p>
                <p>机器: {{ process.machine }}</p>
              </div>
            </li>
          </ul>
          <p>总耗时: {{ line.totalTime }} 分钟</p>
        </div>
      </div>

      <Modal
        :title="'编辑流水线 ' + (currentLineIndex + 1)"
        :visible="isModalOpen"
        @confirm="saveLine"
        @cancel="isModalOpen = false"
      >
        <template #default>
          <div class="modal-body">
            <div class="scroll-container">
              <div class="section-header">生产工序:</div>
              <div class="process-list">
                <div
                  v-for="(process, index) in currentLine.process"
                  :key="index"
                  class="process-item"
                >
                  <label :for="'process-' + index" class="process-label">{{ process.name }}:</label>
                  <span>原料：</span>
                  <input
                    :id="'process-' + index"
                    v-model="process.materials"
                    placeholder="请输入原料"
                    class="input"
                  />
                  <span>产物：</span>
                  <input
                    :id="'process-' + index"
                    v-model="process.product"
                    placeholder="请输入产物"
                    class="input"
                  />
                  <span>工作机器：</span>
                  <input
                    :id="'process-' + index"
                    v-model="process.product"
                    placeholder="请输入机器"
                    class="input"
                  />
                  <span>描述：</span>
                  <input
                    :id="'process-' + index"
                    v-model="process.description"
                    placeholder="请输入描述"
                    class="input"
                  />
                  <span>耗时（分钟）：</span>
                  <input
                    :id="'process-' + index"
                    v-model="process.time"
                    placeholder="请输入产物"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <hr class="divider" />
            <div class="total-time">
              <label for="totalTime">总耗时 (分钟):</label>
              {{ currentLine.totalTime }}
            </div>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuSiderbar from '@/views/MenuSiderbar.vue'
import UserInfo from '@/views/UserInfo.vue'
import Modal from '@/views/Modal.vue'
import { db } from '@/utils/db'

interface ProcessStep {
  name: string
  description: string
  materials: string[]
  product: string
  time: number
  machine: string
}

export interface AssemblyLine {
  type: string
  process: ProcessStep[]
  totalTime: number
}

const assemblyLines = ref<AssemblyLine[]>([
  {
    type: '轿车',
    process: [
      {
        name: '底盘组装',
        description: '将各个底盘部件组装成完整底盘。',
        materials: ['底盘组件', '螺丝'],
        product: '完整底盘',
        time: 30,
        machine: '组装机'
      },
      {
        name: '车架焊接',
        description: '将底盘与车架焊接。',
        materials: ['完整底盘', '车架'],
        product: '焊接好的车架',
        time: 20,
        machine: '焊接机'
      },
      {
        name: '悬挂系统安装',
        description: '安装悬挂系统以支持车辆。',
        materials: ['悬挂组件', '焊接好的车架'],
        product: '已安装悬挂系统的车架',
        time: 25,
        machine: '安装机'
      },
      {
        name: '车身焊接',
        description: '将车身与底盘焊接。',
        materials: ['焊接好的车架', '车身'],
        product: '整车',
        time: 30,
        machine: '焊接机'
      },
      {
        name: '车门安装',
        description: '安装车门。',
        materials: ['车门', '整车'],
        product: '已安装车门的车',
        time: 15,
        machine: '安装机'
      },
      {
        name: '玻璃安装',
        description: '安装车窗和挡风玻璃。',
        materials: ['车窗玻璃', '已安装车门的车'],
        product: '已安装玻璃的车',
        time: 20,
        machine: '玻璃安装机'
      },
      {
        name: '内饰安装',
        description: '安装内饰和其他配件。',
        materials: ['内饰件', '已安装玻璃的车'],
        product: '已安装内饰的车',
        time: 35,
        machine: '内饰安装机'
      },
      {
        name: '座椅安装',
        description: '安装座椅。',
        materials: ['座椅', '已安装内饰的车'],
        product: '已安装座椅的车身',
        time: 20,
        machine: '座椅安装机'
      },
      {
        name: '涂装',
        description: '进行车身涂装。',
        materials: ['涂料', '已安装座椅的车身'],
        product: '已涂装的车身',
        time: 40,
        machine: '涂装机'
      },
      {
        name: '喷漆',
        description: '喷漆处理。',
        materials: ['漆料', '已涂装的车身'],
        product: '成品车',
        time: 30,
        machine: '喷漆机'
      },
      {
        name: '质量检测',
        description: '检测产品质量。',
        materials: ['检测设备', '成品车'],
        product: '合格产品',
        time: 15,
        machine: '检测设备'
      },
      {
        name: '功能测试',
        description: '测试功能是否正常。',
        materials: ['成品车'],
        product: '产品车',
        time: 20,
        machine: '测试设备'
      }
    ],
    totalTime: 300
  },
  {
    type: 'SUV',
    process: [
      {
        name: '底盘组装',
        description: '将各个底盘部件组装成完整底盘。',
        materials: ['底盘组件', '螺丝'],
        product: '完整底盘',
        time: 30,
        machine: '组装机'
      },
      {
        name: '车架焊接',
        description: '将底盘与车架焊接。',
        materials: ['底盘', '车架'],
        product: '焊接好的车架',
        time: 20,
        machine: '焊接机'
      },
      {
        name: '四轮驱动系统安装',
        description: '安装四轮驱动系统。',
        materials: ['四轮驱动组件', '焊接好的车架'],
        product: '已安装四轮驱动的车架',
        time: 40,
        machine: '安装机'
      },
      {
        name: '车身焊接',
        description: '将车身与底盘焊接。',
        materials: ['底盘', '车身'],
        product: '整车',
        time: 30,
        machine: '焊接机'
      },
      {
        name: '加固车身',
        description: '加固车身以适应越野条件。',
        materials: ['加固材料', '整车'],
        product: '已加固车身',
        time: 30,
        machine: '加固机'
      },
      {
        name: '车门安装',
        description: '安装车门。',
        materials: ['车门', '已加固车身'],
        product: '已安装车门的车',
        time: 15,
        machine: '安装机'
      },
      {
        name: '大轮胎安装',
        description: '安装越野轮胎。',
        materials: ['轮胎', '已安装车门的车'],
        product: '已安装轮胎的车身',
        time: 20,
        machine: '轮胎安装机F'
      },
      {
        name: '防撞护板安装',
        description: '安装防撞护板。',
        materials: ['护板', '已安装轮胎的车身'],
        product: '已安装护板的车身',
        time: 15,
        machine: '护板安装机'
      },
      {
        name: '玻璃安装',
        description: '安装车窗和挡风玻璃。',
        materials: ['车窗玻璃', '已安装护板的车身'],
        product: '已安装玻璃的车',
        time: 20,
        machine: '玻璃安装机'
      },
      {
        name: '内饰安装',
        description: '安装内饰和其他配件。',
        materials: ['内饰件', '已安装玻璃的车'],
        product: '已安装内饰的车',
        time: 35,
        machine: '内饰安装机'
      },
      {
        name: '座椅安装',
        description: '安装座椅。',
        materials: ['座椅', '已安装内饰的车'],
        product: '已安装座椅的车身',
        time: 20,
        machine: '座椅安装机'
      },
      {
        name: '涂装',
        description: '进行车身涂装。',
        materials: ['涂料', '已安装座椅的车身'],
        product: '已涂装的车身',
        time: 40,
        machine: '涂装机'
      },
      {
        name: '喷漆',
        description: '喷漆处理。',
        materials: ['漆料', '已涂装的车身'],
        product: '成品车',
        time: 30,
        machine: '喷漆机'
      },
      {
        name: '质量检测',
        description: '检测产品质量。',
        materials: ['检测设备', '成品车'],
        product: '合格产品',
        time: 15,
        machine: '检测设备'
      },
      {
        name: '功能测试',
        description: '测试功能是否正常。',
        materials: ['成品车'],
        product: '产品车',
        time: 20,
        machine: '测试设备'
      }
    ],
    totalTime: 380
  },
  {
    type: 'MPV',
    process: [
      {
        name: '底盘组装',
        description: '将各个底盘部件组装成完整底盘。',
        materials: ['底盘组件', '螺丝'],
        product: '完整底盘',
        time: 30,
        machine: '组装机'
      },
      {
        name: '车架焊接',
        description: '将底盘与车架焊接。',
        materials: ['底盘', '车架'],
        product: '焊接好的车架',
        time: 20,
        machine: '焊接机'
      },
      {
        name: '悬挂系统安装',
        description: '安装悬挂系统以支持车辆。',
        materials: ['悬挂组件', '焊接好的车架'],
        product: '已安装悬挂系统的车架',
        time: 25,
        machine: '安装机'
      },
      {
        name: '电池组装',
        description: '组装电池模块。',
        materials: ['电池单元', '连接器'],
        product: '电池模块',
        time: 40,
        machine: '电池组装机'
      },
      {
        name: '车身焊接',
        description: '将车身与底盘焊接。',
        materials: ['底盘', '车身'],
        product: '整车',
        time: 30,
        machine: '焊接机'
      },
      {
        name: '电池模块组装',
        description: '将电池模块安装到车身上。',
        materials: ['电池模块', '整车'],
        product: '已安装电池模块的车身',
        time: 35,
        machine: '电池安装机E'
      },
      {
        name: '车门安装',
        description: '安装车门。',
        materials: ['车门', '整车'],
        product: '已安装车门的车',
        time: 15,
        machine: '安装机'
      },
      {
        name: '玻璃安装',
        description: '安装车窗和挡风玻璃。',
        materials: ['车窗玻璃', '已安装车门的车'],
        product: '已安装玻璃的车',
        time: 20,
        machine: '玻璃安装机'
      },
      {
        name: '内饰安装',
        description: '安装内饰和其他配件。',
        materials: ['内饰件', '已安装玻璃的车'],
        product: '已安装内饰的车',
        time: 35,
        machine: '内饰安装机'
      },
      {
        name: '座椅安装',
        description: '安装座椅。',
        materials: ['座椅', '已安装内饰的车'],
        product: '已安装座椅的车身',
        time: 20,
        machine: '座椅安装机'
      },
      {
        name: '电池管理系统安装',
        description: '安装电池管理系统。',
        materials: ['电池管理单元', '已安装座椅的车身'],
        product: '已安装电池管理系统的车身',
        time: 20,
        machine: '管理系统安装机'
      },
      {
        name: '电气系统',
        description: '安装电气系统。',
        materials: ['电气组件', '已安装电池管理系统的车身'],
        product: '已安装电气系统的车身',
        time: 30,
        machine: '电气安装机'
      },
      {
        name: '电机安装',
        description: '安装电动机。',
        materials: ['电动机', '已安装电气系统的车身'],
        product: '已安装电动机的车身',
        time: 30,
        machine: '电机安装机'
      },
      {
        name: '充电接口安装',
        description: '安装充电接口。',
        materials: ['充电接口', '已安装电动机的车身'],
        product: '成品车',
        time: 15,
        machine: '接口安装机'
      },
      {
        name: '质量检测',
        description: '检测产品质量。',
        materials: ['检测设备', '成品车'],
        product: '合格产品',
        time: 15,
        machine: '检测设备'
      },
      {
        name: '功能测试',
        description: '测试功能是否正常。',
        materials: ['成品车'],
        product: '产品车',
        time: 20,
        machine: '测试设备'
      }
    ],
    totalTime: 400
  }
])

const isModalOpen = ref(false)
const currentLine = ref<AssemblyLine>({
  type: '',
  process: [],
  totalTime: 0
})
const currentLineIndex = ref<number>(-1)

const expanded = ref<boolean[]>(assemblyLines.value.map(() => false))

const toggleDetails = (index: number) => {
  expanded.value[index] = !expanded.value[index]
}

const openEditModal = (line: AssemblyLine, index: number) => {
  currentLine.value = JSON.parse(JSON.stringify(line))
  currentLineIndex.value = index
  isModalOpen.value = true
}

const saveLine = () => {
  assemblyLines.value[currentLineIndex.value] = currentLine.value
  isModalOpen.value = false
  assemblyLines.value.forEach((line) => {
    line.totalTime = line.process.reduce((acc, step) => {
      return acc + (step.time || 0)
    }, 0)
  })
  db.data.update(0, {
    lines: JSON.stringify(assemblyLines.value)
  })
}
</script>

<style scoped>
.container {
  display: flex;
}

.main {
  flex: 1;
  padding: 20px;
}

.assembly-line {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  position: relative;
}

.line-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

.process-list {
  padding-left: 20px;
}

.process-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.process-name {
  font-size: 16px;
  font-weight: bold;
}

.process-detail p {
  margin: 5px 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.scroll-container {
  max-height: 300px; /* 限制工序部分的最大高度 */
  overflow-y: auto; /* 如果内容超出高度，则显示滚动条 */
  padding-right: 10px; /* 滚动时保持右边距 */
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.section-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.process-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.process-item {
  display: flex;
  flex-direction: column;
}

.process-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.total-time {
  margin-top: 20px;
}

.divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
}
</style>
