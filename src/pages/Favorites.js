import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: true,
    favorites: [],
  }

  async componentDidMount() {
    // const { favorites } = this.state;
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoriteSongs,
    });
  }

  handleCheckboxChange = async (song) => {
    this.setState({
      loading: true,
    });
    await removeSong(song);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoriteSongs,
    });
  }

  render() {
    const { loading, favorites } = this.state;
    // const { isFavorite, checked } = this.props;
    if (loading) {
      return <span>Carregando...</span>;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul style={ { listStyle: 'none' } }>
          {favorites.map((favorite) => (
            <li key={ favorite.trackId }>
              { favorite.trackName }
              <MusicCard
                song={ favorite }
                isFavorite
                handleChange={ this.handleCheckboxChange }
              />
            </li>
          ))}
        </ul>
        ;
      </div>
    );
  }
}

// Favorites.propTypes = {
//   isFavorite: PropTypes.bool.isRequired,
//   checked: PropTypes.bool.isRequired,
// };

export default Favorites;
