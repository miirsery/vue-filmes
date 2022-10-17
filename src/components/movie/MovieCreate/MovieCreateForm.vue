<template>
  <el-form :model="form" class="movie-create-form">
    <el-form-item prop="title">
      <input-common v-model="form.title" placeholder="Enter a title" />
    </el-form-item>
    <el-form-item prop="studio">
      <input-common v-model="form.studio" placeholder="Enter a studio" />
    </el-form-item>
    <el-form-item prop="genre">
      <input-common v-model="form.genre" placeholder="Enter a genre" />
    </el-form-item>
    <el-form-item prop="description">
      <input-common v-model="form.description" placeholder="Enter a description" />
    </el-form-item>
    <el-form-item prop="preview">
      <el-upload v-model="form.preview" action="#" :auto-upload="false" :on-change="handlePreviewSet">
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item prop="release_date">
      <el-date-picker v-model="form.release_date" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog">close</el-button>
      <el-button @click="handleCreateMovie">Create</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { MovieCreateType } from '@/components/movie/MovieCreate/movie-create.types'
import { FileType } from '@/types/common.types'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const emit = defineEmits<IEmits>()

const form = reactive<MovieCreateType>({
  title: '',
  studio: '',
  genre: '',
  description: '',
  preview: null,
  release_date: '',
})

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const handlePreviewSet = (image: FileType): void => {
  if (image) {
    form.preview = image
  }
}

const handleCreateMovie = async (): Promise<void> => {
  const formData = new FormData()

  formData.append('title', form.title)

  formData.append('studio', form.studio)

  formData.append('genre', form.genre)

  formData.append('description', form.description)

  formData.append('release_date', form.release_date)

  if (form.preview && form.preview.raw) {
    formData.append('preview', form.preview.raw)
  }

  const [error] = await moviesApi.createMovie(formData)

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}
</script>
