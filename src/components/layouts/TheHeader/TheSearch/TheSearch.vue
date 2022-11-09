<template>
  <el-input v-model="searchValue" class="the-search" placeholder="Поиск">
    <template #suffix>
      <icon-template name="search" width="15" height="15" stroke-color="#fff" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')
</script>
