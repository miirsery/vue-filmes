<template>
  <div class="buy-ticket">
    <div class="buy-ticket__header">
      <el-button class="arrow-button" type="button" @click="handleBuyTicketResultClose">
        <icon-template name="left-arrow" width="14px" height="14px" />
      </el-button>
    </div>
    <div class="buy-ticket__content d-flex jc-between">
      <ticket-result />
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
      <el-button class="buy-ticket__submit" @click="handleTicketBuy">Pay 350 Р</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputCommon from '@/components/common/InputCommon/InputCommon.vue'
import IconTemplate from '@/components/common/IconTemplate.vue'
import { useUserStore } from '@/stores/user.store'

interface IEmits {
  (e: 'buy-ticket', data: any): void
  (e: 'close-buy-ticket'): void
}

const emit = defineEmits<IEmits>()

const useUser = useUserStore()

const form = reactive<any>({
  email: useUser.user.email,
})
const activePaymentMethod = ref('QR')

const handleTicketBuy = (): void => {
  emit('buy-ticket', {
    email: form.email,
    phone: form.phone,
    price: form.price,
  })
}

const handleBuyTicketResultClose = (): void => {
  emit('close-buy-ticket')
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
