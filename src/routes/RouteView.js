import React from 'react';
import { Switch, Route } from 'react-router-dom';

function RouteView({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          {...route}
          component={null}
          render={(props) => <route.component {...props} routes={route.routes || []} />}
        />
      ))}
    </Switch>
  );
}

export default RouteView;
