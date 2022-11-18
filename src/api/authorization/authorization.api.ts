import { AxiosService } from '@/api/AxiosService/axiosSerive'
import { AxiosRequestConfig } from 'axios'
import { LoginFormType, TokenResponseType } from '@/pages/TheAuthorization/TheLogin/theLogin.types'
import { SuccessResponseMessageType } from '@/types/common.types'
import { UserSelfType } from '@/types/user.types'

class AuthorizationApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  async getToken(payload: LoginFormType) {
    return this.axiosCall<TokenResponseType>({
      method: 'post',
      url: '/get-token',
      data: { ...payload },
    })
  }

  async loginUser() {
    return this.axiosCall<SuccessResponseMessageType>({
      method: 'get',
      url: '/login',
    })
  }

  async getSelf() {
    return this.axiosCall<UserSelfType>({
      method: 'get',
      url: '/self',
    })
  }
}

export default new AuthorizationApi({
  baseURL: '/api/v1/main/auth',
  withCredentials: false,
})
