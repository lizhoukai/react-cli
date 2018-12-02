import Home from '../pages/home'
import Login from '../pages/member/login'

export default [
  {
    path: '/',
    name: '',
    component: Home,
    layout: 'basic'
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    layout: 'default'
  }
]
