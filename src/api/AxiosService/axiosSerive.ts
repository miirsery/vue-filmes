import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import Cookies from 'js-cookie'
import { AxiosResponseType } from '@/api/AxiosService/axiosSerivce.type'
import router from '@/router'
import { ElMessage } from 'element-plus'

export class AxiosService {
  private axiosInstance!: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((config: any) => {
      // const token = Cookies.get('token_for_admin_panel')
      const token = localStorage.getItem('token') || ''
      //
      // config.xsrfCookieName = 'XSRF-TOKEN'
      // config.xsrfHeaderName = 'X-XSRF-TOKEN'

      config.headers = {
        Authorization: `Bearer ${token}`,
      }

      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        const status = response?.status

        switch (status) {
          case 201:
            ElMessage({
              type: 'success',
              message: response?.data?.message,
            })
        }

        return response
      },
      (error: any) => {
        const response = error?.response?.data

        switch (error?.response?.status) {
          case 401:
            break
          case 403:
            break
          case 404:
            break
          case 422:
            break
          case 500:
            ElMessage({
              type: 'error',
              message: response.message,
            })

          default:
            break
        }

        return Promise.reject(response)
      }
    )
  }

  protected async axiosCall<T = any>(config: AxiosRequestConfig): AxiosResponseType<T> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)

      return [null, data]
    } catch (error: any) {
      return [error]
    }
  }
}
