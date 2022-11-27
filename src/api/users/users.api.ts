import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'
import { SuccessResponseMessageType } from '@/types/common.types'
import { TelegramUserType } from '@/types/user.types'

class UsersApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async userRegister(payload: RegistrationFormType) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'post',
      url: '',
      data: { ...payload },
    })
  }

  async connectWithTelegram(data: TelegramUserType & { user_id: number }) {
    return this.axiosCall({
      method: 'post',
      url: '/telegram',
      data,
    })
  }
}

export default new UsersApi({
  baseURL: '/api/v1/users',
  withCredentials: false,
})
