import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    const { song, isFavorite, handleChange } = this.props;

    return (

      <div>
        { loading ? <span>Carregando... </span>
          : (
            <div>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="checkbox">
                Favorita
                <input
                  type="checkbox"
                  id="checkbox"
                  data-testid={ `checkbox-music-${song.trackId}` }
                  onChange={ () => handleChange(song) }
                  defaultChecked={ isFavorite }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MusicCard;
