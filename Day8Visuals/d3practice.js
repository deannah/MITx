var width = 50;
var height = 50;

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
    
var svg = d3.select(".chartcontainer").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");
    
var links = [0, 3, 6, 2, 19]
    
var link = svg.selectAll(".link").data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);