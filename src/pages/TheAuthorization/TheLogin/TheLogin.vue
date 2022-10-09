<template>
  <div class="the-login">
    <div class="d-flex ai-center fd-column">
      <h1 class="the-registration__title">Зарегистироваться</h1>
      <el-form :model="loginForm">
        <el-form-item prop="email">
          <input-common v-model="loginForm.email" class="mb-16" placeholder="Email" />
        </el-form-item>
        <el-form-item prop="email">
          <input-common v-model="loginForm.password" class="mb-16" placeholder="Пароль" />
        </el-form-item>
        <el-button class="the-login__button" type="primary" @click="handleTokenGet"> Войти </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import authorizationApi from '@/api/authorization/authorization.api'
import { useRouter } from 'vue-router'
import { LoginFormType } from '@/pages/TheAuthorization/TheLogin/theLogin.types'

const router = useRouter()

const loginForm = ref<LoginFormType>({
  email: '',
  password: '',
})

const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

const loginUser = async (): Promise<void> => {
  const [error, data] = await authorizationApi.loginUser({ ...loginForm.value })

  if (!error && data) {
    await router.push({ name: 'Home' })
  }
}

const handleTokenGet = async (): Promise<void> => {
  const [error, data] = await authorizationApi.getToken({ ...loginForm.value })

  if (!error && data) {
    await setToken(data.token)

    await loginUser()
  }
}
</script>
