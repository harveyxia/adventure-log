var height = 2000
var width = 2000

var svg = d3.select('#map')
  .append('svg')
  .attr('viewBox', `0 300 ${height} ${width}`)
  .call(
    d3.zoom()
    .on("zoom", function() {
      d3.event.transform.x = Math.min(0, Math.max(d3.event.transform.x, width - width * d3.event.transform.k))
      d3.event.transform.y = Math.min(-300 * (d3.event.transform.k - 1), Math.max(d3.event.transform.y, height - (height - 300) * d3.event.transform.k))
      svg.attr("transform", d3.event.transform)
    })
    .scaleExtent([1, 5])
  ).append('g');

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

d3.json('/json/countries.topo.json', function(error, countriesTopojson) {
  if (error) throw error;
  var geojson = topojson.feature(countriesTopojson, countriesTopojson.objects.countries)
  projection.fitSize([width, height], geojson)
  // draw map
  svg.selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('d', path);
});

d3.json('/json/places.json', function(error, places) {
  svg.selectAll("circle")
    .data(places)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return projection(d)[0];
    })
    .attr("cy", function(d) {
      return projection(d)[1];
    })
    .attr("r", "8px")
    .attr("fill", "red")
});