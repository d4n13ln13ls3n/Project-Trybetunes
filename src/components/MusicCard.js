import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  }

  // onSCheck = async () => {
  //   const { searchText } = this.state;
  //   this.setState({
  //     loading: true,
  //     artisttext: searchText,
  //   }, async () => {
  //     const response = await searchAlbumsAPI(searchText);
  //     this.setState({
  //       searchText: '',
  //       artists: response,
  //       loading: false,
  //     });
  //   });
  // };

  handleCheckboxChange = async (event) => {
    this.setState({
      loading: true,
    });
    const { song } = this.props;
    console.log('song:', song);
    if (event.target.checked) {
      await addSong(song);
      this.setState({
        loading: false,
        checked: true,
      });
    }
  }

  render() {
    const { loading, checked } = this.state;
    const { song } = this.props;

    // onChange = () => {
    //   if (checkbox.checked) {
    //     return true;
    //   }
    //   return false;
    // }

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
                  onChange={ this.handleCheckboxChange }
                  checked={ checked }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.string.isRequired,
};

export default MusicCard;
