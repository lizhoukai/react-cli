import React from 'react'

import { Route } from 'react-router-dom'

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="layout-wrapper">
          <Component {...matchProps} />
        </div>
      )}
    />
  )
}

export const HomeLayout = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={matchProps => <Component {...matchProps} />} />
}
