import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { observer, inject } from 'mobx-react'

@inject('loaderStore')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: '',
      curPage: 1
    }
  }

  componentWillMount() {
    // console.log(React.Component.prototype)
    this.getData()
  }

  async getData() {
    const res = await this.$http.get('/t/product/?limit=6')
    if (res && res.code === 0) {
      this.setState({ items: res.page })
    }
  }

  render() {
    return (
      <div>
        <div className="link">
          <Link to="/">首页</Link>
          <Link to="/me">我的</Link>
        </div>

        <Button type="primary">Button</Button>
      </div>
    )
  }
}

export default Home
