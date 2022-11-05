import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Header from './Header';

class PrivateRoute extends React.Component {
  state= {
    user: null,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { Component, ...rest } = this.props;

    if (!user) {
      return <span>Carregando...</span>;
    }

    return (
      <>
        <Header user={ user } />
        <Component { ...rest } user={ user } />
      </>
    );
  }
}

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/require-default-props
  Component: PropTypes.elementType,
};

export default PrivateRoute;
