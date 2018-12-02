import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import DevTool from 'mobx-react-devtools'
import { Spin } from 'antd'

import { DefaultLayout, BasicLayout } from '../views/layout'
import NotFound from '../views/common/404'
import Routers from './routers'
import createBrowserHistory from '../utils/browserHistory'
import loaderStore from '../stores/loader'

const isDev = process.env.NODE_ENV === 'development'

// BrowserRouter 不暴露 history 参数，因全局ajax拦截需要用到 history, 故使用 Router 组件
@observer
class Root extends React.Component {
  render() {
    const { context, location } = this.props
    return (
      <div className="root-inner">
        {isDev && <DevTool />}
        <Provider loaderStore={this.props.loaderStore || loaderStore}>
          <Router context={context} location={location} history={createBrowserHistory}>
            <Switch>
              {Routers.map((x, i) => {
                return x.layout === 'basic' ? (
                  <BasicLayout key={i} name={x.name} exact path={x.path} component={x.component} />
                ) : (
                  <DefaultLayout
                    key={i}
                    name={x.name}
                    exact
                    path={x.path}
                    component={x.component}
                  />
                )
              })}
              <DefaultLayout component={NotFound} />
            </Switch>
          </Router>
        </Provider>
        {loaderStore.isLoading && <Spin className="comm-loader" tip="Loading..." />}
      </div>
    )
  }
}

export default Root
