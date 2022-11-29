<template>
  <el-input v-model="searchValue" class="the-search" placeholder="Поиск" @input="handleMovieSearch">
    <template #suffix>
      <icon-template name="search" width="15" height="15" stroke-color="#fff" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface IProps {
  searchedValue: string
}

interface IEmits {
  (e: 'search-value', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
  searchedValue: '',
})

const emit = defineEmits<IEmits>()

watch(
  () => props.searchedValue,
  (value: string) => {
    if (value === '') {
      searchValue.value = ''
    }
  }
)

const searchValue = ref('')

const handleMovieSearch = async (value: string): Promise<void> => {
  emit('search-value', value)
}
</script>
