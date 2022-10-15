<template>
  <el-table :data="movies" @row-click="handleEditModalOpen">
    <el-table-column
      v-for="title in headerTableTitles"
      :key="title.value"
      :column-key="title.value"
      :label="title.label"
      :prop="title.value"
    >
      <template #defalut="{ row }">
        {{ row }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
interface IEmits {
  (e: 'open-edit-dialog', row: any): any
}

const emit = defineEmits<IEmits>()

const headerTableTitles = [
  {
    label: 'Имя',
    value: 'name',
  },
  {
    label: 'Фамилия',
    value: 'surname',
  },
]

const movies = ref<any[]>([
  {
    name: 'Фильм',
    surname: 'Фамилия',
  },
  {
    name: 'Имя1',
    surname: 'Фамилия1',
  },
  {
    name: '12123',
    surname: 'qwdqw',
  },
  {
    name: 'Имя2',
    surname: 'Фамилия2',
  },
])

const handleEditModalOpen = (row: any): void => {
  emit('open-edit-dialog', row)
}
</script>
