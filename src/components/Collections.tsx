import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Fill from './Fill';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import SongCard from './SongCard';

function Collections() {
  const { id } = useParams<{ id: string | undefined }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [musicList, setMusicList] = useState<SongType[]>([]);
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const results = await getMusics(id);
        const [album, ...songs] = results;
        setAlbumInfo(album);
        setMusicList(songs);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Fill />
      ) : (
        <div>
          <img src={ albumInfo?.artworkUrl100 } alt="album cover" />
          <h1 data-testid="artist-name">{albumInfo?.artistName}</h1>
          <h2 data-testid="album-name">{albumInfo?.collectionName}</h2>
          {musicList.map((music: SongType) => (
            <SongCard
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
export default Collections;
