<template>
  <el-input v-model="searchValue" class="the-search" placeholder="Поиск" @input="handleMovieSearch">
    <template #suffix>
      <icon-template name="search" width="15" height="15" stroke-color="#fff" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface IEmits {
  (e: 'search-value', value: string): void
}

const emit = defineEmits<IEmits>()

const searchValue = ref('')

const handleMovieSearch = async (value: string): Promise<void> => {
  console.log(value)

  emit('search-value', value)
}
</script>
