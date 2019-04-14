const WIDTH = 380;
const HEIGHT = 250;

const getLoveSongRatio = album => {
  let loveSongCount = 0;
  let otherSongCount = 0;
  album.values.forEach(s => {
    s.isLoveSong ? loveSongCount++ : otherSongCount++;
  });
  return loveSongCount / (loveSongCount + otherSongCount);
}

const isAlbumMostlyLoveSongs = album => {
  return getLoveSongRatio(album) >= 0.5;
}

export const renderAlbumSummary = (albums) => {
  const yScale = d3.scaleBand()
    .domain(albums.map(d => d.key))
    .range([0, HEIGHT]);

  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, WIDTH]);

  const wrapper = d3.select('#album-summary')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  const albumGroups = wrapper
    .selectAll('g')
    .data(albums)
    .enter()
    .append('g')
    .attr('transform', d => `translate(0, ${yScale(d.key)})`)

  albumGroups
    .append('rect')
    .attr('width', d => xScale(getLoveSongRatio(d)))
    .attr('height', yScale.bandwidth());

  albumGroups
    .append('text')
    .attr('text-anchor', d => isAlbumMostlyLoveSongs(d) ? 'start' : 'end')
    .text(d => d.key)
    .attr('y', 14)
    .attr('x', d => isAlbumMostlyLoveSongs(d) ? 5 : WIDTH - 5)
    .attr('class', d => isAlbumMostlyLoveSongs(d) ? 'song love-song' : 'song');
};

