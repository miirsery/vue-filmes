import { defineStore } from 'pinia'
import authorizationApi from '@/api/authorization/authorization.api'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as any,
    }
  },
  actions: {
    async getSelf() {
      const [error, data] = await authorizationApi.getSelf()

      if (!error && data) {
        this.user = data
      }
    },
  },
})
