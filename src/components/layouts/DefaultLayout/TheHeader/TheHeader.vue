<template>
  <header class="the-header">
    <el-row>
      <nav class="d-flex ai-center w-100 jc-between">
        <el-col :span="12">
          <ul class="d-flex ai-center">
            <li v-for="item in headerItems" :key="item.title" class="mr-50">
              {{ item.title }}
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <div class="logo">logo</div>
        </el-col>
        <el-col :span="5">
          <the-search />
        </el-col>
        <el-col v-if="isAuth" :span="2">
          <icon-template class="mr-8" name="favorite" width="32" height="32" />
          <icon-template name="user" width="32" height="32" @click="handleClickLogout" />
        </el-col>
        <el-col v-else :span="2">
          <router-link class="the-header__login" to="/authorization/login"> Вход </router-link>
        </el-col>
      </nav>
    </el-row>
  </header>
</template>

<script lang="ts" setup>
import { headerItems } from '@/constants/header'
import { ref } from 'vue'
import { MovieType } from '@/types/movies.types'

const movies = ref<MovieType[]>([
  {
    id: 0,
    title: '',
    description: '',
    release_date: '',
    preview: '',
  },
])

const isToken = localStorage.getItem('token')
const isAuth = ref<boolean>(isToken ? true : false)

const handleClickLogout = (): void => {
  localStorage.clear()

  location.reload()
}
</script>

<style lang="scss" scoped>
.the-header {
  padding-top: $size--16;

  &__login {
    width: 100%;
    display: block;
    border-radius: 8px;
    text-align: center;
    color: $color--white;
    background-color: $color--accent;
    padding: 10px 0;
  }
}
</style>
