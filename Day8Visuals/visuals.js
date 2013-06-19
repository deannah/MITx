// Day 8, visualizations practice with D3

var data= [0, 4, 8, 8, 15, 16, 23, 42];

// var chart = $("<div></div>").addClass("chart");

// $(".chart-container").append(chart);

//data.forEach(function(d) {chart.append(d);});
// data.forEach(function(d) {
//     chart.append($("<div></div>").css("width", d * 10 + "px").text(d));
// });
   
var chart_height = 300;
var chart_width = 300;
   
var y_scale = d3.scale.linear()
        .domain([0, d3.max(data)])
          .range([0, chart_height]);

var x_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0, chart_height]);
// keys(data) is essentially data.length, in array form

var chart = d3.select(".chart-container")
        .append("svg")
          .attr("class", "chart")
          .attr("height", chart_height)
          .attr("width", chart_width);

chart.selectAll("rect").data(data)
        .enter().append("rect")
          .attr("x", function(d, i) {return x_scale(i);})  //d is the data, i is the index of the one we're looking at now
          .attr("y", function(d) {return chart_height - y_scale(d);})
          // that i is necessary in case you need to repeat data(and you have two 8s)
          .attr("width", x_scale.rangeBand())
          .attr("height", y_scale); 

// rects don't have text, so we have to add our own text nodes:

chart.selectAll("text").data(data)
        .enter().append("text")
          .attr("y", function(d) { return chart_height +3 - y_scale(d);})
          .attr("x", function(d, i) {return x_scale(i) + x_scale.rangeBand()/2;})
          // .attr("dx", -3)
          // .attr("dy", ".35em") // roughly move text down by half of its height
          // .attr("text-anchor", "end")
          .attr("dy", "0.7em")
          .attr("text-anchor", "middle")
          .text(function(d) {return d;});



// chart.selectAll("div").data(data)
//         .enter().append("div")
//           //.style("width", function(d) {return d * 10 + "px";})
//           .style("width", x_scale)
//             .text(function(d) {return d;}); 
//d3 will find all the divs and bind each to a piece of data.
// enter() is like doing a $ with something that doesn't exist yet.