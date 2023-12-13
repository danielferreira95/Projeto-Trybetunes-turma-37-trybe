import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type Kinds = {
  artistName: string,
  albumList: AlbumType[] | null,
};

function AlbumList(Pr: Kinds) {
  const { artistName, albumList } = Pr;
  return (
    <div>
      { albumList?.length === 0
        ? <p>Nenhum álbum foi encontrado</p>
        : (
          <div>
            <h1>{ `Resultado de álbuns de: ${artistName}` }</h1>
            <ul>
              { albumList?.map((record) => (
                <li key={ record.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${record.collectionId}` }
                    to={ `/album/${record.collectionId}` }
                  >
                    {record.collectionName}
                  </Link>
                  <img
                    src={ record.artworkUrl100 }
                    alt={ `Frente do album ${record.collectionName}` }
                  />
                </li>))}
            </ul>
          </div>)}
    </div>
  );
}

export default AlbumList;
