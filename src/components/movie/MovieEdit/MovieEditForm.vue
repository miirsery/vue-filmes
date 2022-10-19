<template>
  <el-form ref="movieEditForm" :molel="form" class="movie-edit-form">
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
      <el-upload
        v-model:file-list="form.preview"
        list-type="picture"
        action="#"
        :auto-upload="false"
        :on-change="handlePreviewSet"
        :before-remove="handlePreviewRemove"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item prop="release_date">
      <el-date-picker v-model="form.release_date" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
    </el-form-item>
    <div class="d-flex ai-center jc-between">
      <el-button @click="handleCloseDialog(movieEditForm)">close</el-button>
      <el-button @click="handleUpdateMovie">Update</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { FileType } from '@/types/common.types'
import { ElForm, FormInstance } from 'element-plus'

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

interface IProps {
  movie: any
}

const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()

const form = reactive<any>({
  title: '',
  studio: '',
  genre: '',
  description: '',
  preview: [],
  release_date: '',
})

const movieEditForm = ref<FormInstance>()

const updateTable = (): void => {
  emit('update-table')
}

const getNameFromUrl = (url: string): string => {
  return url.split('.').slice(0, -1).join('.')
}

const clearFrom = (formEl?: FormInstance) => {
  if (!formEl) return

  formEl.resetFields()
}

const handlePreviewRemove = (): void => {
  form.preview = []
}

const handleCloseDialog = (formEl?: FormInstance): void => {
  clearFrom(formEl)

  emit('close-dialog')
}

const handlePreviewSet = (image: FileType): void => {
  if (image) {
    form.preview = [image]
  }
}

const handleUpdateMovie = async (): Promise<void> => {
  const formData = new FormData()

  formData.append('id', form.id)

  formData.append('title', form.title)

  formData.append('studio', form.studio)

  formData.append('genre', form.genre)

  formData.append('description', form.description)

  formData.append('release_date', form.release_date)

  if (form.preview && form.preview[0] && form.preview[0].raw) {
    formData.append('preview', form.preview[0].raw)
  }

  const [error] = await moviesApi.updateMovie(formData)

  if (!error) {
    handleCloseDialog()

    updateTable()
  }
}

watch(
  () => props.movie.value,
  (currentMovie) => {
    form.title = currentMovie.title

    form.description = currentMovie.title

    form.id = currentMovie.id

    form.genre = currentMovie.genre

    // TODO: Смена картинки у фильма. Сделать удаление картинки у фильма
    // if (currentMovie.preview) {
    //   const blob = new Blob([JSON.stringify(form.preview[0], null, 2)], {
    //     type: 'image/jpeg',
    //   })
    //
    //   const file: File = new File([blob], `${getNameFromUrl(currentMovie.preview)}.jpg`, { type: 'image/jpeg' })
    //
    //   form.preview = [
    //     {
    //       url: currentMovie.preview,
    //       name: currentMovie.title,
    //       raw: file,
    //     },
    //   ]
    // }

    if (currentMovie.preview) {
      form.preview = [
        {
          url: currentMovie.preview,
        },
      ]
    }

    form.release_date = currentMovie.release_date

    form.studio = currentMovie.studio
  }
)
</script>
