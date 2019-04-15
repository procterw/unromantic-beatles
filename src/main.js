import { renderAlbumSummary } from './visualization/renderAlbumSummary.js';
import { renderAlbumDetails } from './visualization/renderAlbumDetails.js';

const init = async () => {
  const songs = await d3.json('src/data/songs.json');
  const albums = await d3.json('src/data/albums.json');

  const songsGroupedByAlbum = d3.nest()
    .key(d => d.album)
    .entries(songs)
    .map(d => ({
      ...d,
      ...albums[d.key],
    }));

  renderAlbumSummary(songsGroupedByAlbum);
  renderAlbumDetails(songsGroupedByAlbum);
};

init();
