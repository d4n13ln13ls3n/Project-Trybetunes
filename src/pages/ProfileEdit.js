/* eslint-disable max-len */
import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    user: '',
    email: '',
    descricao: '',
    imagem: '',
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      user: userInfo.name,
      loading: false,
      email: userInfo.email,
      descricao: userInfo.descricao,
      imagem: userInfo.imagem,
    });
  }

  render() {
    const { user, loading, descricao, email } = this.state;
    if (loading) {
      return <span>Carregando...</span>;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="username">
            Nome:
            <input
              type="text"
              data-testid="edit-input-name"
              placeholder={ user }
              id="username"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="edit-input-email"
              placeholder={ email }
              id="email"
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="textarea"
              data-testid="edit-input-description"
              placeholder={ descricao }
              id="descricao"
            />
          </label>
          <label htmlFor="imagem">
            Imagem de perfil:
            <input type="text" data-testid="edit-input-image" id="imagem" />
          </label>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
