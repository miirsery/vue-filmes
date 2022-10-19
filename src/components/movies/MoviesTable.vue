<template>
  <el-table v-loading="loading" class="movies-table" :data="props.movies" @selection-change="handleRowSelect">
    <el-table-column type="selection" />
    <el-table-column label="ID" prop="id">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.id }}
        </div>
        <el-button v-else @click="handleEditModalOpen(row.id)">edit</el-button>
      </template>
    </el-table-column>
    <el-table-column label="Title" prop="title">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.title }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Sales count" prop="sales_count">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.sales_count }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Studio" prop="studio">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.studio }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Genre" prop="genre">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.genre }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Release date" prop="release_date">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id)">
          {{ row.release_date }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Preview" prop="preview">
      <template #default="{ row }">
        <div v-if="checkSelectedRow(row.id) && row.preview" class="movies-table__preview">
          <img :src="row.preview" />
        </div>
        <div v-else />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import { reactive, ref } from 'vue'
interface IEmits {
  (e: 'open-edit-dialog', row: any): any
  (e: 'apply-filters', filters: any): object
}

interface IProps {
  movies: any
  loading: boolean
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectRows = ref<any>([])
const filters = reactive<any>({})

const handleEditModalOpen = (id: number): void => {
  emit('open-edit-dialog', id)
}

const applyFilters = (filters: any): void => {
  emit('apply-filters', filters)
}

const handleRowSelect = (rows: any[]): void => {
  selectRows.value = rows
}

const checkSelectedRow = (id: number): boolean => {
  const account = selectRows.value.find((row: any) => row.id === +id)

  if (account) {
    return selectRows.value.length > 1
  }

  return true
}

const handleFilterApply = (): void => {
  applyFilters(filters)
}
</script>

<style lang="scss" scoped>
.movies-table {
  &__preview {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
