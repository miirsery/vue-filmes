import { defineStore } from 'pinia'
import authorizationApi from '@/api/authorization/authorization.api'
import { UserSelfType } from '@/types/user.types'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserSelfType>({
    avatar: '',
    birthdate: '',
    discount: 0,
    email: '',
    id: 0,
    login: '',
    name: '',
    patronymic: '',
    phone: '',
    register_date: '',
    role: 'user',
    surname: '',
    tickets: [],
    telegram_username: '',
  })

  const getSelf = async (): Promise<void> => {
    const [error, data] = await authorizationApi.getSelf()

    if (!error && data) {
      user.value = data
    }
  }

  onMounted(getSelf)

  return { user, getSelf }
})
