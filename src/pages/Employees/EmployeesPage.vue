<template>
  <div class="employees-page w-100">
    <div class="halls-page__header d-flex ai-center jc-between">
      <h1>Employees</h1>
      <div class="d-flex ai-center">
        <el-tooltip effect="dark" placement="left">
          <template #content>
            <input-common v-model="price" placeholder="enter a amount" />
          </template>
          <el-button type="primary" @click="getEmployees">Get best</el-button>
        </el-tooltip>
        <!--        <el-button type="success" @click="handleDeleteModalVisibleChange">Delete employee</el-button>-->
      </div>
    </div>
    <employees-table :employees="employees" :loading="tableLoading" @update-table="getEmployees" />
  </div>
</template>

<script lang="ts" setup>
import employeesApi from '@/api/employees/employees.api'
import { onMounted, ref } from 'vue'
import EmployeesTable from '@/components/employees/EmployeesTable.vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'

const price = ref(0)
const employees = ref<any>([])
const tableLoading = ref(false)

const getEmployees = async (): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await employeesApi.getEmployees(price.value || undefined)

  if (!error && data) {
    employees.value = data
  }

  tableLoading.value = false
}

onMounted(async () => {
  await getEmployees()
})
</script>
