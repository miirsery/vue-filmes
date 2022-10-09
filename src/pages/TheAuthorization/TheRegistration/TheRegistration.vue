<template>
  <div class="the-registration">
    <div class="d-flex ai-center fd-column">
      <h1 class="the-registration__title">Зарегистироваться</h1>
      <el-form :model="registrationForm">
        <el-form-item prop="name">
          <input-common v-model="registrationForm.name" class="mb-16" placeholder="Имя" />
        </el-form-item>
        <el-form-item prop="name">
          <input-common v-model="registrationForm.surname" class="mb-16" placeholder="Фамилия" />
        </el-form-item>
        <el-form-item prop="name">
          <input-common v-model="registrationForm.patronymic" class="mb-16" placeholder="Отчество" />
        </el-form-item>
        <el-form-item prop="email">
          <input-common v-model="registrationForm.email" class="mb-16" placeholder="почта" />
        </el-form-item>
        <el-form-item prop="login">
          <input-common v-model="registrationForm.login" class="mb-16" placeholder="Логин" />
        </el-form-item>
        <el-form-item prop="email">
          <input-common v-model="registrationForm.password" class="mb-16" placeholder="Пароль" />
        </el-form-item>
        <el-button class="the-registration__button" type="primary" @click="handleAccountCreate">
          Создать аккаунт
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'
import authorizationApi from '@/api/authorization/authorization.api'
import { useRouter } from 'vue-router'

const router = useRouter()

const registrationForm = ref<RegistrationFormType>({
  email: '',
  login: '',
  password: '',
  name: '',
  surname: '',
  patronymic: '',
  role: 'user',
  avatar: '',
})

const handleAccountCreate = async (): Promise<void> => {
  const [error, data] = await authorizationApi.userRegister(registrationForm.value)

  if (!error && data) {
    console.log(data)

    await router.push({ name: 'TheLogin' })
  }
}
</script>
