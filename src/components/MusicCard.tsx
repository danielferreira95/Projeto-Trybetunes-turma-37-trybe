import { useState } from 'react';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import checkedHeart from '../images/checked_heart.png';
import uncheckedHeart from '../images/empty_heart.png';

function MusicCard(pr: SongType) {
  const { trackName, previewUrl, trackId } = pr;
  const [isPreferred, setIsPreferred] = useState<boolean>(false);

  const deal = () => {
    if (isPreferred) {
      removeSong(pr);
      setIsPreferred(false);
    } else {
      addSong(pr);
      setIsPreferred(true);
    }
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <img src={ isPreferred ? checkedHeart : uncheckedHeart } alt="favorite" />
        <input
          type="checkbox"
          name="liked"
          onChange={ deal }
          checked={ isPreferred }
        />
      </label>
    </div>
  );
}

export default MusicCard;
