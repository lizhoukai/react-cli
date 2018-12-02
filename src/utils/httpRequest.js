/*
 * @Author: Leon
 * @Date: 2017-08-20 00:16:20
 * @Last Modified by: Leon
 * @Last Modified time: 2018-12-01 20:25:08
 */

import axios from 'axios'
import { message } from 'antd'
import history from '../utils/browserHistory'
import loaderStore from '../stores/loader'

axios.defaults.baseURL = '/api'
axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  config => {
    if (localStorage.hasOwnProperty('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    loaderStore.handleToggle()
    return config
  },
  error => {
    loaderStore.handleToggle()
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */

axios.interceptors.response.use(
  response => {
    loaderStore.handleToggle()
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          message.error('当前用户未授权，请重新登录!')
          history.push('/login')
          break
        case 404:
          message.error('404 请求错误,未找到该资源!')
          break
        case 502:
          message.error('502 网络错误!')
          break
        case 503:
          message.error('503 服务不可用!')
          break
        case 504:
          message.error('504 网络超时!')
          break
        case 505:
          message.error('505 http版本不支持该请求!')
          break
      }
    } else {
      message.error('连接到服务器失败')
    }
    loaderStore.handleToggle()
    return Promise.reject(error)
  }
)

let HTTP = (type, url, params, config = {}) => {
  let args = [url, params, config].filter(x => Boolean(x))
  return axios[type](...args).then(res => {
    if (res.data && res.status !== 200) {
      message.error(res.data.msg)
    }
    return res.data
  })
}

export default {
  get: HTTP.bind(null, 'get'),
  post: HTTP.bind(null, 'post'),
  put: HTTP.bind(null, 'put'),
  delete: HTTP.bind(null, 'delete')
}
