import React from 'react'
import { Link } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="link">
          <Link to="/">首页</Link>
          <Link to="/me">我的</Link>
        </div>
        <QueueAnim type={['right', 'left']} delay={300} key="text" className="layout-content">
          home page
        </QueueAnim>
      </div>
    )
  }
}

export default Home
