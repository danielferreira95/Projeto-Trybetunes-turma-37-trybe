import { ChangeEvent, useEffect, useState } from 'react';
import { AlbumType } from '../types';
import AlbumList from './AlbumList';
import Loading from './Loading';

type Kinds = {
  hunt: (k: string) => void,
  records: AlbumType[] | null,
  charging: boolean,
};

function Search(Pr: Kinds) {
  const { hunt, records, charging } = Pr;
  const [creatorInsert, setCreatorInsert] = useState<string>('');
  const [creatorTitle, setCreatorTitle] = useState<string>('');
  const [isToggleOff, setIsToggleOff] = useState<boolean>(true);

  const dealModification = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatorInsert(event.target.value);
  };

  useEffect(() => {
    setIsToggleOff(creatorInsert.length < 2);
  }, [creatorInsert]);

  const sending = (event: React.FormEvent) => {
    event.preventDefault();
    hunt(creatorInsert);
    setCreatorTitle(creatorInsert);
    setCreatorInsert('');
  };

  return (
    <div>
      <form onSubmit={ sending }>
        <input
          type="text"
          name="artist"
          data-testid="search-artist-input"
          onChange={ dealModification }
          value={ creatorInsert }
        />
        <button
          data-testid="search-artist-button"
          disabled={ isToggleOff }
        >
          Pesquisar
        </button>
      </form>
      { charging ? <Loading />
        : records && <AlbumList artistName={ creatorTitle } albumList={ records } />}
    </div>
  );
}

export default Search;
