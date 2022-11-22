<template>
  <div class="the-login">
    <div class="d-flex ai-center fd-column">
      <h1 class="the-registration__title mb-16">Login</h1>
      <el-form :model="loginForm">
        <el-form-item prop="email">
          <input-common v-model="loginForm.email" class="mb-16" placeholder="Email" />
        </el-form-item>
        <el-form-item prop="password">
          <input-common v-model="loginForm.password" type="password" class="mb-16" placeholder="Пароль" />
        </el-form-item>
        <el-form-item prop="remember" class="the-login__remember">
          <el-checkbox v-model="rememberMe" label="Remember me" />
        </el-form-item>
        <div class="d-flex ai-center jc-between">
          <el-button type="primary" class="the-login__button" @click="handleTokenGet"> Войти </el-button>
          <router-link class="the-login__register link--second" to="/authorization/registration">
            No account?
          </router-link>
        </div>
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

const rememberMe = ref(false)

const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

const loginUser = async (): Promise<void> => {
  const [error, data] = await authorizationApi.loginUser()

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

<style lang="scss" scoped>
.the-login {
  &__register {
    font-size: 12px;
  }
}
</style>
