import { SongType } from '../types';

function SongCard(props: SongType) {
  const { trackName, previewUrl } = props;

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
    </div>
  );
}

export default SongCard;
