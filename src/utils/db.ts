import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { AssemblyLine } from '@/views/AssemblyLine.vue'
import type { LogEntry, Order } from '@/views/Product.vue'
import type { OrderProgress } from '@/views/Home.vue'
import type { InventoryPart } from '@/views/Warehouse.vue'
interface Data {
  id?: number
  lines?: string
  order?: string
  progressLine?: string
  orderProgress?: string
  time?: number
  now?: number
  log?: string
  inventoryParts?: string
  inventoryLog?: string
}
const db = new Dexie('data') as Dexie & {
  data: EntityTable<Data, 'id'>
}

db.version(1).stores({
  data: 'id,lines,order,progressLine,orderProgress,number,now,log,inventoryParts'
})

db.data.add(
  {
    id: 0
  },
  0
)

export type { Data }
export { db }
