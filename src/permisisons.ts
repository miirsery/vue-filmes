import router from '@/router'
import authorizationApi from '@/api/authorization/authorization.api'

import { ElMessage } from 'element-plus'

router.beforeEach(async (to, from, next) => {
  // let isAuthorized = false

  const token = localStorage.getItem('token')

  if (!token) {
    return next({ name: 'LoginPage' })
  } else {
    return next()
  }
})
