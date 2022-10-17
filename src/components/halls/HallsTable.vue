<template>
  <el-table v-loading="loading" :data="props.halls" @selection-change="handleRowSelect">
    <el-table-column type="selection" />
    <el-table-column label="ID" prop="id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.id }}
        </div>
        <el-button v-else>edit</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Title" prop="title">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.title }}
        </div>
        <el-button v-else @click="handleHallDelete(row.id)">delete</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Seats count" prop="seats_count">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.seats_count }}
        </div>
        <div />
      </template>
    </el-table-column>
    <el-table-column label="cinema_id" prop="cinema_id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.cinema_id }}
        </div>
        <div />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import hallsApi from '@/api/halls/halls.api'

interface IProps {
  halls: any
  loading: boolean
}

interface IEmits {
  (e: 'update-table'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectRows = ref<any>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleRowSelect = (rows: any): void => {
  selectRows.value = rows
}

const checkSelectedRow = (id: number): boolean => {
  const account = selectRows.value.find((row: any) => row.id === +id)

  if (account) {
    return selectRows.value.length > 1
  }

  return true
}

const handleHallDelete = async (id: number): Promise<void> => {
  const [error] = await hallsApi.deleteHall(id)

  if (!error) {
    updateTable()
  }
}
</script>
