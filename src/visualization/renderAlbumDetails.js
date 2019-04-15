


export const renderAlbumDetails = (albums) => {
  const albumList = d3.select('#album-details')
    .append('ul')
    .attr('class', 'album-list');

  const album = albumList.selectAll('li')
    .data(albums)
    .enter()
    .append('li')
    .attr('class', 'album-detail');

  const albumMeta = album.append('div')
    .attr('class', 'album-meta');

  albumMeta.append('img')
    .attr('src', d => `src/images/${d.imgSrc}`);

  albumMeta.append('h2')
    .attr('class', 'album-name')
    .text(d => d.key);

  albumMeta.append('span')
    .attr('class', 'release-date')
    .text(d => d.releaseDate);

  const trackList = album.append('ul')
    .attr('class', 'track-list');

  const trackListItems = trackList.selectAll('li')
    .data(d => d.values)
    .enter()
    .append('li')
    .attr('class', 'track-list-item')
    .classed('love-song', d => d.isLoveSong);

  trackListItems.append('span')
    .attr('class', 'track-number')
    .text(d => d.trackNumber);

  trackListItems.append('span')
    .attr('class', 'song-title')
    .text(d => d.songTitle);
};

