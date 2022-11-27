import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'
import { SuccessResponseMessageType } from '@/types/common.types'
import { TelegramDisconnectUserType, TelegramUserType } from '@/types/user.types'

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

  async connectWithTelegram(data: TelegramUserType) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'post',
      url: '/telegram',
      data,
    })
  }

  async disconnectWithTelegram(data: TelegramDisconnectUserType) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'post',
      url: '/telegram/disconnect',
      data,
    })
  }
}

export default new UsersApi({
  baseURL: '/api/v1/users',
  withCredentials: false,
})
