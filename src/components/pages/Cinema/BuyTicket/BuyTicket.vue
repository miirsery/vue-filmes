<template>
  <div class="buy-ticket">
    <div class="buy-ticket__content d-flex jc-between">
      <ticket-result :movie="props.movie" :session="props.session" :seats="props.seats" />
      <div>
        <div>
          <input-common v-model="form.email" placeholder="Enter a email" />
          <input-common v-model="form.phone" placeholder="Enter a phone" />
        </div>
        <div class="buy-ticket__payment-methods">
          <div>QR</div>
          <div>Bank card</div>
        </div>
      </div>
    </div>
    <div class="buy-ticket__footer">
      <div class="buy-ticket__user-agreement">
        <a href="/pdf" target="_blank">User Agreement</a>
      </div>
      <el-button type="primary" class="buy-ticket__submit" @click="handleTicketBuy">
        Pay {{ calculateResultPrice }} Р
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import { useUserStore } from '@/stores/user.store'

interface IProps {
  movie: any
  seats: any
  session: any
}

interface IEmits {
  (e: 'buy-ticket', data: any): void
}

const emit = defineEmits<IEmits>()
const props = defineProps<IProps>()

const useUser = useUserStore()

const form = reactive<any>({
  email: useUser.user.email,
})

const activePaymentMethod = ref('QR')

const calculateResultPrice = computed(() => {
  const currentSession = JSON.parse(JSON.stringify(props.session))
  const currentSessionPrice = currentSession.price

  props.seats.forEach((_: any, index: number) => {
    if (!index) {
      return
    }

    currentSession.price += currentSessionPrice
  })

  return currentSession.price
})

const handleTicketBuy = (): void => {
  emit('buy-ticket', {
    email: form.email,
    phone: form.phone,
    total_price: calculateResultPrice.value,
    movie: props.movie,
    session: props.session,
  })
}
</script>

<style lang="scss" scoped>
.buy-ticket {
  &__payment-methods {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
