import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
interface Data {
  id: number
}
const db = new Dexie('data') as Dexie & {
  data: EntityTable<Data, 'id'>
}

db.version(1).stores({
  data: '++id'
})

export type { Data }
export { db }
