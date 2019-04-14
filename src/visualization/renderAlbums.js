import { AVAILABLE_WIDTH, IMAGE_SIZE } from './constants.js';

const sortSongs = (a,b) => {
  return b.isLoveSong - a.isLoveSong;
};

export const renderAlbums = (svg, albums) => {
  console.log(albums);
  const wrapper = d3.select('#albums')
    .style('column-count', albums.length);

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
    .enter()
    .append('li')
    .style('width', '0px')
    .attr('class', d => `song ${d.isLoveSong && 'love-song'}`)
    .attr('title', d => d.songTitle)
    .transition()
    .delay((d, i) => 1000 + i * 20)
    .style('width', '100%');

};

