import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    songs: [],
  };

  componentDidMount() {
    this.onLoad();
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

  render() {
    const { songs } = this.state;
    const [collection, ...tracks] = songs;
    console.log('tracks:', tracks);
    console.log('songs', songs);
    return (
      <div data-testid="page-album">
        <Header />
        {collection && <span data-testid="artist-name">{collection.artistName}</span>}
        <br />
        {collection && <span data-testid="album-name">{collection.collectionName}</span>}
        <ul style={ { listStyle: 'none' } }>
          {tracks.map((song) => (
            <li key={ song.id }>
              { song.trackName }
              <MusicCard song={ song } />
            </li>
          ))}
        </ul>
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
