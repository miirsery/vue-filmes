<template>
  <el-table v-loading="loading" :data="props.users" @selection-change="handleRowSelect">
    <el-table-column type="selection" />
    <el-table-column label="ID" prop="id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.id }}
        </div>
        <el-button v-else>edit</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="name">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.name }}
        </div>
        <el-button v-else>edit</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Surname" prop="surname">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.surname }}
        </div>
        <el-button v-else @click="handleUserDelete(row.id)">delete</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Role" prop="role">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.role }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Email" prop="email">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.email }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Login" prop="login">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.login }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Birthdate" prop="birthdate">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.birthdate }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="registerDate" prop="register_date">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.register_date }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { UserType } from '@/types/users.types'
import { ElTable, ElTableColumn } from 'element-plus'
import { ref } from 'vue'
import usersApi from '@/api/users/users.api'

interface IProps {
  users: UserType[]
  loading: boolean
}

interface IEmits {
  (e: 'update-table'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectRows = ref<UserType[]>([])

const updateTable = (): void => {
  emit('update-table')
}

const handleRowSelect = (rows: UserType[]): void => {
  selectRows.value = rows
}

const checkSelectedRow = (id: number): boolean => {
  const account = selectRows.value.find((row: UserType) => row.id === +id)

  if (account) {
    return selectRows.value.length > 1
  }

  return true
}

const handleUserDelete = async (id: number): Promise<void> => {
  const [error] = await usersApi.userDelete(id)

  if (!error) {
    updateTable()
  }
}
</script>
