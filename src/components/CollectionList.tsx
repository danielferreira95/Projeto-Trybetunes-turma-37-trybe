import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type PropType = {
  artistName: string,
  albumList: AlbumType[] | null,
};

function CollectionList(Props: PropType) {
  const { artistName, albumList } = Props;
  return (
    <div>
      { albumList?.length === 0
        ? <p>Nenhum álbum foi encontrado</p>
        : (
          <div>
            <h1>{ `Resultado de álbuns de: ${artistName}` }</h1>
            <ul>
              { albumList?.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    {album.collectionName}
                  </Link>
                  <img
                    src={ album.artworkUrl100 }
                    alt={ `capa do disco ${album.collectionName}` }
                  />
                </li>))}
            </ul>
          </div>)}
    </div>
  );
}

export default CollectionList;
