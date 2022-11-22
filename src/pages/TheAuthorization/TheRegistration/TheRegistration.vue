<template>
  <div class="the-registration">
    <div class="d-flex ai-center fd-column">
      <h1 class="the-registration__title">Зарегистрироваться</h1>
      <el-form ref="registrationFormRef" :model="registrationForm" :rules="rules">
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
        <el-form-item prop="password">
          <input-common v-model="registrationForm.password" type="password" class="mb-16" placeholder="Пароль" />
        </el-form-item>
        <el-form-item prop="passwordConfirm">
          <input-common
            v-model="registrationForm.passwordConfirm"
            type="password"
            class="mb-16"
            placeholder="Retry password"
          />
        </el-form-item>
        <div class="d-flex ai-center jc-between">
          <el-button type="primary" class="the-registration__button" @click="handleAccountCreate">
            Создать аккаунт
          </el-button>
          <router-link to="/authorization/login" class="the-registration__login link--second">
            Already have account?
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'
import { useRouter } from 'vue-router'
import usersApi from '@/api/users/users.api'
import { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const registrationFormRef = ref<FormInstance | null>(null)

const registrationForm = ref<RegistrationFormType>({
  email: '',
  login: '',
  password: '',
  name: '',
  surname: '',
  patronymic: '',
  role: 'user',
  avatar: '',
  passwordConfirm: '',
})

const validatePassword = (rule: any, value: any, callback: any): void => {
  const passwordRegularExpression = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9!@#$%^&*a-zA-Z]{6,}/g

  if (!passwordRegularExpression.test(value) && registrationForm.value.password !== '') {
    callback(new Error('Enter at least one number and character'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: string, callback: any): void => {
  console.log(value, registrationForm.value.password)

  if (value !== registrationForm.value.password) {
    callback(new Error('Passwords don`t match!'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  password: [
    {
      min: 6,
      message: 'length must be more 6 symbols',
      trigger: 'blur',
    },
    {
      validator: validatePassword,
    },
  ],
  passwordConfirm: [{ trigger: 'blur' }, { validator: validateConfirmPassword }],
  email: [
    {
      required: true,
      trigger: 'blur',
    },
  ],
  login: [
    {
      required: true,
      trigger: 'blur',
    },
  ],
})

const handleAccountCreate = async (): Promise<void> => {
  if (!registrationFormRef.value) return

  await registrationFormRef.value.validate(async (valid) => {
    if (valid) {
      delete registrationForm.value.passwordConfirm

      const [error, data] = await usersApi.userRegister(registrationForm.value)

      if (!error && data) {
        await router.push('/authorization/login')
      }
    }
  })
}

const handleResetForm = () => {
  if (!registrationFormRef.value) return

  registrationFormRef.value.resetFields()
}
</script>
