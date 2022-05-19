import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateName(),
    );
    console.log('name:', name);
    console.log('value:', value);
  };

  validateName = () => {
    const { name } = this.state;
    const maxNameLength = 3;
    if (name.length >= maxNameLength) {
      return this.setState({
        isButtonDisabled: false,
      });
    }
    return this.setState({
      isButtonDisabled: true,
    });
  };

  loginSuccessful = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name }); // check if the problem is on this line
    history.push(
      { pathname: '/search' },
    );
  }

  render() {
    const { loading, isButtonDisabled, name } = this.state;

    if (loading) {
      return <span>Carregando...</span>;
    }

    return (
      <div data-testid="page-login">
        <label htmlFor="input-text">
          Digite seu nome:
          <input
            type="text"
            data-testid="login-name-input"
            id="input-text"
            onChange={ this.onInputChange }
            name="name"
            value={ name } // react controlando o estado name do input
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ () => this.loginSuccessful() } // inserir nova função aqui
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
  }),
};

Login.defaultProps = {
  history: '/',
};

export default Login;
