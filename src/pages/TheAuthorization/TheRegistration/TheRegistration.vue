<template>
  <div class="the-registration">
    <div class="d-flex ai-center fd-column">
      <h1 class="the-registration__title">Зарегистироваться</h1>
      <input-common v-model="registrationForm.email" class="mb-16" placeholder="почта" />
      <input-common v-model="registrationForm.login" class="mb-16" placeholder="Логин" />
      <input-common v-model="registrationForm.login" class="mb-16" placeholder="Логин" />
      <el-button class="the-registration__button" type="primary">Создать аккаунт</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'

const registrationForm = ref<RegistrationFormType>({
  email: '',
  login: '',
})
</script>
