<template>
  <el-table :data="users">
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
import { UserType } from '@/types/users.types'
import { ElTable, ElTableColumn } from 'element-plus'

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

const users = ref<UserType[]>([
  {
    name: 'Имя',
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
</script>
