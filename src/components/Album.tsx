import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

function Album() {
  const { id } = useParams<{ id: string | undefined }>();

  const [comming, setComming] = useState<boolean>(false);
  const [songSequence, setSongSequence] = useState<SongType[]>([]);
  const [recordData, setRecordData] = useState<AlbumType | null>(null);

  useEffect(() => {
    const getInfo = async () => {
      if (id) {
        setComming(true);
        const repercussion = await getMusics(id);
        const [album, ...songs] = repercussion;
        setRecordData(album);
        setSongSequence(songs);
        setComming(false);
      }
    };
    getInfo();
  }, []);

  return (
    <div>
      {comming ? (
        <Loading />
      ) : (
        <div>
          <img src={ recordData?.artworkUrl100 } alt="album cover" />
          <h1 data-testid="artist-name">{recordData?.artistName}</h1>
          <h2 data-testid="album-name">{recordData?.collectionName}</h2>
          {songSequence.map((music: SongType) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
