import React from 'react';
import { connect } from 'react-redux';

function About({ count }) {
  return (
    <>
      <h1>About</h1>
      <h3>
        <span>count: </span>
        <span style={{ color: 'red' }}>{count}</span>
      </h3>
    </>
  );
}

const getDvaState = ({
  count: { count },
}) => ({ count });
export default connect(getDvaState)(About);
