import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    user: '',
    email: 'email@test.com',
    descricao: 'Lorem ipsum',
    imagem: 'url-to-image',
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      loading: false,
      user: userInfo.name,
      email: userInfo.email,
      descricao: userInfo.description,
      imagem: userInfo.image,
    });
  }

  render() {
    const { imagem, user, loading, email, descricao } = this.state;
    if (loading) {
      return <span>Carregando...</span>;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <img src={ imagem } alt="imagem de perfil" data-testid="profile-image" />
        <Link to="/profile/edit">Editar perfil</Link>
        <p className="user-name">Nome</p>
        <p>{ user }</p>
        <p className="email">Email</p>
        <p>{ email }</p>
        <p className="descricao">Descrição</p>
        <p>{ descricao }</p>
      </div>
    );
  }
}

export default Profile;
