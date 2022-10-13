import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { SuccessResponseMessageType } from '@/types/common.types'
import { RegistrationFormType } from '@/pages/TheAuthorization/TheRegistration/theRegistration.types'
import { LoginFormType, TokenResponseType } from '@/pages/TheAuthorization/TheLogin/theLogin.types'

class AuthorizationApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async userRegister(payload: RegistrationFormType) {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'post',
      url: '/register',
      data: { ...payload },
    })
  }

  async getToken(payload: LoginFormType) {
    return this.axiosCall<TokenResponseType>({
      method: 'post',
      url: '/get-token',
      data: { ...payload },
    })
  }

  async loginUser(payload: LoginFormType) {
    return this.axiosCall<TokenResponseType>({
      method: 'post',
      url: '/login',
      data: { ...payload },
    })
  }
}

export default new AuthorizationApi({
  baseURL: '/api/v1/auth',
  withCredentials: false,
})
