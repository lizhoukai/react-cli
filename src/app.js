// eslint-disable-next-line
import React from 'react'
import { render } from 'react-dom'
import Root from './router'

import './assets/style/orc.scss'
import http from './utils/httpRequest'
import dayjs from 'dayjs'

// 注册全局变量
Object.assign(React.Component.prototype, {
  $http: http,
  $dayjs: dayjs
})

render(<Root />, document.getElementById('root'))
