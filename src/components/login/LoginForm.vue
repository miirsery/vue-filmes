<template>
  <el-form :model="form" class="login-form">
    <el-form-item prop="email">
      <input-common v-model="form.email" placeholder="Enter a email" />
    </el-form-item>
    <el-form-item prop="password">
      <input-common v-model="form.password" type="password" placeholder="Enter a password" />
    </el-form-item>
    <div class="d-flex ai-center mb-16 jc-between w-100">
      <el-button type="primary" size="small">Forgot password?</el-button>
      <el-checkbox v-model="forgotPassword" label="Option 1" size="large">Remember me</el-checkbox>
    </div>
    <div class="d-flex ai-center">
      <el-button type="primary" @click="handleTokenGet">Login</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import authorizationApi from '@/api/authorization/authorization.api'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  platform: 'site',
})

const forgotPassword = ref('')

const login = async () => {
  const [error, data] = await authorizationApi.login()

  if (!error && data) {
    await router.push({ name: 'HomePage' })
  }
}

const handleTokenGet = async () => {
  const [error, data] = await authorizationApi.getToken(form)

  if (!error && data) {
    localStorage.setItem('token', data.token)

    await login()
  }
}
</script>
