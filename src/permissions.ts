import router from '@/router'
import { useUserStore } from '@/stores/user.store'
const useUser = useUserStore()

router.beforeEach(async (to, from, next) => {
  await getSelf()
})

const getSelf = async (): Promise<void> => {
  await useUser.getSelf()
}
