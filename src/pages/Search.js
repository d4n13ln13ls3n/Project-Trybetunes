import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchText: '',
    artists: [],
    loading: false,
    artisttext: '',
  };

  onInputChange = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  };

  onSearch = async () => {
    const { searchText } = this.state;
    this.setState({
      loading: true,
      artisttext: searchText,
    }, async () => {
      const response = await searchAlbumsAPI(searchText);
      this.setState({
        searchText: '',
        artists: response,
        loading: false,
      });
    });
  };

  render() {
    const { searchText, loading, artists, artisttext } = this.state;
    const disabled = searchText.length < 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ searchText }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.onSearch }
          >
            Pesquisar
          </button>
        </form>
        { loading ? (
          <span>Carregando...</span>
        ) : (
          <div>
            { artists.length === 0
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                <div>
                  <h2>{ `Resultado de álbuns de: ${artisttext}` }</h2>
                  <ul>
                    {artists.map((artist) => (
                      <li key={ artist.collectionId }>
                        <Link
                          to={ `/album/${artist.collectionId}` } // usar ':' só na definiçao da rota
                          data-testid={ `link-to-album-${artist.collectionId}` }
                        >
                          { artist.collectionName }
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

          </div>

        )}
      </div>
    );
  }
}

export default Search;
