var height = 1000
var width = 1000

var svg = d3.select('#map')
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 180 ${height} ${width}`);
var g = svg.append('g');
var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

d3.json('/json/countries.topo.json', function(error, countriesTopojson) {
  var geojson = topojson.feature(countriesTopojson, countriesTopojson.objects.countries)

  projection.fitSize([width, height], geojson)

  g.selectAll('path')
    .data(geojson.features)
    .enter()
    .append("path")
    .attr('d', path)
    .style("fill", "steelblue")
    .style("stroke-width", "1")
    .style("stroke", "white");
})