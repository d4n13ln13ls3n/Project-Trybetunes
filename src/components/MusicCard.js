import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    console.log('song:', song);

    return (
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.string.isRequired,
};

export default MusicCard;
