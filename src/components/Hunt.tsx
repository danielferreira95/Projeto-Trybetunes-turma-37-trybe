import { ChangeEvent, useEffect, useState } from 'react';
import { AlbumType } from '../types';
import CollectionList from './CollectionList';
import Fill from './Fill';

type PropType = {
  search: (e: string) => void,
  albums: AlbumType[] | null,
  loading: boolean,
};

function Hunt(Props: PropType) {
  const { search, albums, loading } = Props;
  const [artistInput, setArtistInput] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArtistInput(event.target.value);
  };

  useEffect(() => {
    setIsButtonDisabled(artistInput.length < 2);
  }, [artistInput]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    search(artistInput);
    setArtistName(artistInput);
    setArtistInput('');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="artist"
          data-testid="search-artist-input"
          onChange={ handleChange }
          value={ artistInput }
        />
        <button
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </form>
      { loading ? <Fill />
        : albums && <CollectionList artistName={ artistName } albumList={ albums } />}
    </div>
  );
}

export default Hunt;
