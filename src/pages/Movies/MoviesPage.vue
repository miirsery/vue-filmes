<template>
  <div class="movies-page w-100">
    <h1>Movies</h1>
    <movies-table @open-edit-dialog="handleEditModalOpen" />
    <movie-edit-dialog :visible="isEditDialogVisible" @close-dialog="handleEditModalOpen" />
  </div>
</template>

<script lang="ts" setup>
import MoviesTable from '@/components/movies/MoviesTable.vue'
import MovieEditDialog from '@/components/movies/MoviesDialogs/MovieEditDialog.vue'
import { ref } from 'vue'

const isEditDialogVisible = ref(false)

const handleEditModalOpen = (row?: any): void => {
  isEditDialogVisible.value = !isEditDialogVisible.value
}
</script>
