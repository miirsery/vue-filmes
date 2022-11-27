<template>
  <div class="user-page">
    <h1>User page</h1>
    <div class="d-flex jc-between">
      <user-tickets />
      <div>
        <h2>Link to telegram</h2>
        <div v-if="isConnectedWithTelegram">
          <span v-if="!isLoaded">Loading...</span>
          <telegram-login-temp
            mode="callback"
            telegram-login="move_movies_bot"
            @loaded="isTelegramLoaded"
            @callback="handleWithTelegramConnect"
          />
        </div>
        <el-button v-else type="primary">Unlink</el-button>
      </div>
      <aside>
        <nav>
          <ul>
            <li> tickets </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { telegramLoginTemp } from 'vue3-telegram-login'
import usersApi from '@/api/users/users.api'
import { TelegramUserType } from '@/types/user.types'

const useUser = useUserStore()

const isLoaded = ref(false)
const userId = ref(0)

const user = computed(() => useUser.user)
const isConnectedWithTelegram = computed(() => !user.value.telegram_username)

watchEffect(async () => {
  const localUser = user.value

  if (localUser) {
    userId.value = localUser.id
  }
})

const isTelegramLoaded = (): void => {
  isLoaded.value = true
}

const handleWithTelegramConnect = async (user: TelegramUserType): Promise<void> => {
  const [error, data] = await usersApi.connectWithTelegram(
    Object.assign(user, {
      user_id: userId.value,
    })
  )

  if (!error && data) {
    await getSelf()
  }
}

onMounted(() => {
  getSelf()
})

const getSelf = async (): Promise<void> => {
  await useUser.getSelf()
}
</script>
