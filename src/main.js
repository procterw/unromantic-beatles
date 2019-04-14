import { renderAlbums } from './visualization/renderAlbums.js';
import { HEIGHT, WIDTH, PADDING_X, PADDING_Y } from './visualization/constants.js';

const init = async () => {
  const songs = await d3.json('./data/songs.json');
  const albums = await d3.json('./data/albums.json');

  const songsGroupedByAlbum = d3.nest()
    .key(d => d.album)
    .entries(songs)
    .map(d => ({
      ...d,
      ...albums[d.key],
    }));

  const svg = d3.select('svg#main')
    .attr('height', HEIGHT)
    .attr('width', WIDTH)
    .append('g')
    .attr('transform', `translate(${PADDING_X}, ${PADDING_Y})`);

  renderAlbums(svg, songsGroupedByAlbum);
};

init();
