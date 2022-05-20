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
    this.setState({ songs: response.filter((it) => it.wrapperType === 'track') });
  };

  render() {
    const { songs } = this.state;
    const [firstSong] = songs;
    console.log('songs', songs);
    return (
      <div data-testid="page-album">
        <Header />
        {firstSong && <span data-testid="artist-name">{firstSong.artistName}</span>}
        <br />
        {firstSong && <span data-testid="album-name">{firstSong.collectionName}</span>}
        <ul style={ { listStyle: 'none' } }>
          {songs.map((song) => (
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
