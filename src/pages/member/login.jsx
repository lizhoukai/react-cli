import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import loaderStore from '../../stores/loader'
import './login.less'

@inject('loaderStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: '',
      curPage: 1
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  handleClick() {
    const { loaderStore } = this.props
    loaderStore.handleToggle()
  }

  render() {
    return (
      <div className="login-page">
        <Button type="primary" onClick={this.handleClick.bind(this)}>
          login
        </Button>
      </div>
    )
  }
}

export default Login
