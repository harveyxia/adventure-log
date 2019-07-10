var height = 2000
var width = 2000

var svg = d3.select('#map')
  .append('svg')
  // .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', `0 360 ${height} ${width}`)
  .call(d3.zoom().on("zoom", function() {
    svg.attr("transform", d3.event.transform)
  }))
  .append('g');

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
  // add circles to svg
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
})

// Copied from https://bl.ocks.org/piwodlaiwo/7dac64184e3581d2e7a6d9c3220aa958
var drag = d3.drag()
  .on("start", function() {
    // Adapted from http://mbostock.github.io/d3/talk/20111018/azimuthal.html and updated for d3 v3
    var proj = projection.rotate();
    m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
    o0 = [-proj[0], -proj[1]];
  })
  .on("drag", function() {
    if (m0) {
      var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY],
        o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
      projection.rotate([-o1[0], -o1[1]]);
    }
    // Update the map
    path = d3.geoPath().projection(projection);
    d3.selectAll("path").attr("d", path);
  });