// Day 8, visualizations practice with D3
   
var outer_height = 300;
var outer_width = 300;

var margin = {top: 20, right: 20, bottom: 20, left: 20};

var chart_width = outer_width - margin.left - margin.right;
var chart_height = outer_height - margin.top - margin.bottom;

var stack = d3.layout.stack();
var stacked_data = stack(data);

var y_stack_max = d3.max(stacked_data, function(layer) {return d3.max(layer, function(d) {return d.y + d.y0;});});

var y_group_max = d3.max(stacked_data, function(layer) {return d3.max(layer, function(d) {return d.y;});});
   
var y_scale = d3.scale.linear()
        .domain([0, y_stack_max])
          .range([chart_height, 0]);

var x_scale = d3.scale.ordinal().domain(d3.range(data[0].length)).rangeBands([0, chart_height]);
// keys(data) is essentially data.length, in array form

var chart = d3.select(".chart-container")
        .append("svg")
          .attr("class", "chart")
          .attr("height", outer_height)
          .attr("width", outer_width)
        .append("g") // group element
          .attr("transform", "translate(" +margin.left + "," + margin.top + ")");

chart.selectAll("line").data(y_scale.ticks(10))
        .enter().append("line")
          .attr("x1", 0)
          .attr("x2", chart_width)
          .attr("y1", y_scale)
          .attr("y2", y_scale);
          
//chart.selectAll("text").data() no you can't do this because later it'll select this text! we can use classes to fix it.
chart.selectAll(".y-scale-label").data(y_scale.ticks(10))
        .enter().append("text")
          .attr("class", "y-scale-label")
          .attr("text-anchor", "end")
          .attr("x", 0)
          .attr("y", y_scale)
          .attr("dx", -(margin.left/8))
          .attr("dy", "0.3em")
          .text(String);

var layer_groups = chart.selectAll(".layer").data(stacked_data)
        .enter().append("g")
          .attr("class", "layer");
          
var rects = layer_groups.selectAll("rect").data(function(d) {return d;})
        .enter().append("rect")
          .attr("x", function(d, i) {return x_scale(i);})
          .attr("y", function(d) {return y_scale(d.y0 + d.y);})
          .attr("width", x_scale.rangeBand())
          .attr("height", function(d) {return y_scale(d.y0) - y_scale(d.y0 + d.y )});
          
function goGrouped() {
    y_scale.domain([0, y_group_max]);
    rects.transition()
        .duration(1000)
        .delay(function(d, i) {return i *20;})
        .attr("x", function(d, i, j) {
            return x_scale(i) + x_scale.rangeBand()/stacked_data.length*j;})
        .attr("width", x_scale.rangeBand()/stacked_data.length)
      .transition()
        .attr("y", function(d) {return y_scale(d.y);})
        .attr("height", function(d) {return chart_height - y_scale(d.y);});
}

// chart.selectAll("rect").data(data)
//         .enter().append("rect")
//           .attr("x", function(d, i) {return x_scale(i);})  //d is the data, i is the index of the one we're looking at now
//           .attr("y", y_scale)
//           // that i is necessary in case you need to repeat data(and you have two 8s)
//           .attr("width", x_scale.rangeBand())
//           .attr("height", function(d) {return chart_height - y_scale(d);}); 

// chart.selectAll(".bar-label").data(data)
//         .enter().append("text")
//           .attr("class", "bar-label")
//           .attr("y", function(d) { return y_scale(d) + margin.top/4;})
//           .attr("x", function(d, i) {return x_scale(i) + x_scale.rangeBand()/2;})
//           // .attr("dx", -3)
//           // .attr("dy", ".35em") // roughly move text down by half of its height
//           // .attr("text-anchor", "end")
//           .attr("dy", "0.7em")
//           .attr("text-anchor", "middle")
//           .text(function(d) {return d;});