// Day 8, visualizations practice with D3

var data= [0, 4, 8, 8, 15, 16, 23, 42];

// var chart = $("<div></div>").addClass("chart");

// $(".chart-container").append(chart);

//data.forEach(function(d) {chart.append(d);});
// data.forEach(function(d) {
//     chart.append($("<div></div>").css("width", d * 10 + "px").text(d));
// });
   
var chart_height = 140;
   
var x_scale = d3.scale.linear()
        .domain([0, d3.max(data)])
          .range(["0%", "100%"]);

var y_scale = d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0, chart_height]);
// keys(data) is essentially data.length, in array form

var chart = d3.select(".chart-container")
        .append("svg")
          .attr("class", "chart");

chart.selectAll("rect").data(data)
        .enter().append("rect")
          .attr("y", function(d, i) {return y_scale(i);})  //d is the data, i is the index of the one we're looking at now
          // that i is necessary in case you need to repeat data(and you have two 8s)
          .attr("width", x_scale)
          .attr("height", 20); 

// rects don't have text, so we have to add our own text nodes:

chart.selectAll("text").data(data)
        .enter().append("text")
          .attr("x", x_scale)
          .attr("y", function(d, i) {return y_scale(i) + y_scale.rangeBand()/2;})
          .attr("dx", -3)
          .attr("dy", ".35em") // roughly move text down by half of its height
          .attr("text-anchor", "end")
          .text(function(d) {return d;});
          
          
          
          


// chart.selectAll("div").data(data)
//         .enter().append("div")
//           //.style("width", function(d) {return d * 10 + "px";})
//           .style("width", x_scale)
//             .text(function(d) {return d;}); 
//d3 will find all the divs and bind each to a piece of data.
// enter() is like doing a $ with something that doesn't exist yet.