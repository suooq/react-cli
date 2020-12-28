import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routes from './routes';
import RouteView from './routes/RouteView';

function App(props) {
  const { count, dispatch } = props;

  function addCount() {
    dispatch({
      type: 'count/setCount',
      payload: {
        count: count + 1,
      },
    });
  }

  function asyncAddCount() {
    dispatch({
      type: 'count/asyncSetCount',
      payload: {
        count: count + 1,
      },
      callback(result) {
        console.log(result);
      },
    });
  }

  return (
    <>
      <h1>{count}</h1>
      <button type="button" onClick={addCount}>sync+1</button>
      <button type="button" onClick={asyncAddCount}>async+1</button>
      <br />
      <br />
      <NavLink to="/">Home</NavLink>
      <span> | </span>
      <NavLink to="/About">About</NavLink>

      <RouteView routes={routes} />
    </>
  );
}

const getDvaState = ({
  count: { count },
}) => ({ count });
export default connect(getDvaState)(App);
