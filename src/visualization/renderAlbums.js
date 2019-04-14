import { AVAILABLE_WIDTH, IMAGE_SIZE } from './constants.js';

const calculateSongWidth = song => {
  const trackLength = song.trackLength.split(':');
  const lengthSeconds = Number(trackLength[0]) * 60 + Number(trackLength[1]);
  return `${100 * (lengthSeconds / 250)}%`;
}




export const renderAlbums = (svg, albums) => {
  const wrapper = d3.select('#albums')

  const columns = wrapper.selectAll('div')
    .data(albums)
    .enter()
    .append('div')
    .attr('class', 'album-column');

  const images = columns.append('div')
    .attr('class', 'album-image');

  images.append('img')
    .attr('src', d => `images/${d.imgSrc}`);

  images.append('div')
    .attr('class', 'image-filter');

  const songList = columns.append('ul')
    .attr('class', 'song-list');
    
  const songs = songList.selectAll('li')
    .data(d => d.values.sort(sortSongs))
    // .data(d => d.values)
    .enter()
    .append('li')
    .style('width', '0px')
    .attr('class', d => `song ${d.isLoveSong && 'love-song'}`)
    .attr('title', d => d.songTitle)
    .transition()
    .delay((d, i) => 500 + i * 20)
    .style('width', calculateSongWidth);

};

