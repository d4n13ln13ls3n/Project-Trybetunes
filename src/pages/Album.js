/* eslint-disable max-len */
import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    songs: [],
    loading: true,
    favorites: [],
    // checked: false,
  };

  async componentDidMount() {
    await this.onLoad();
    // getFavoriteSongs();
    const quantityFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: quantityFavorites, // quando se está dentro de uma função JS não é necessário envolver com chaves; se estiver dentro de escopo HTML precisa
    });
  }

  isFavorite = (song) => {
    const { favorites } = this.state;
    return favorites.some((track) => track.trackId === song.trackId);
  }

  onLoad = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);
    this.setState({ songs: response });
  };

  handleCheckboxChange = async (song) => {
    this.setState({
      loading: true,
    });
    if (!this.isFavorite(song)) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    // const quantityFavorites = await getFavoriteSongs();
    const setFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: setFavorites, // quando se está dentro de uma função JS não é necessário envolver com chaves; se estiver dentro de escopo HTML precisa
      // checked: true,
    });
  }

  render() {
    const { songs, loading } = this.state;
    // const { checked } = this.props.children;
    const [collection, ...tracks] = songs;
    // console.log('tracks:', tracks);
    // console.log('songs', songs);
    // console.log('collection:', collection);
    return (
      <div>

        <div data-testid="page-album">
          <Header />
          { loading && <span>Carregando...</span> }
          {collection && <img
            src={ collection.artworkUrl100 }
            alt={ collection.collectionName }
          />}
          <br />
          {collection && <p data-testid="artist-name">{collection.artistName}</p>}
          <br />
          {collection && <p data-testid="album-name">{collection.collectionName}</p>}
          <ul style={ { listStyle: 'none' } }>
            {tracks.map((song) => (
              <li key={ song.trackId }>
                { song.trackName }
                <MusicCard
                  song={ song }
                  isFavorite={ this.isFavorite(song) }
                  handleChange={ this.handleCheckboxChange }
                />
              </li>
            ))}
          </ul>
        </div>
        )
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: '/',
};

export default Album;
