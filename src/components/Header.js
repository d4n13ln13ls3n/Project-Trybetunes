import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    const loadingMessage = <span>Carregando...</span>;
    if (!user) {
      return loadingMessage;
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ user.name }</p>
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
