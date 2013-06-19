// Day 8, visualizations practice with D3

var data= [0, 4, 8, 8, 15, 16, 23, 42];

// var chart = $("<div></div>").addClass("chart");

// $(".chart-container").append(chart);

//data.forEach(function(d) {chart.append(d);});
// data.forEach(function(d) {
//     chart.append($("<div></div>").css("width", d * 10 + "px").text(d));
// });
    
    
var chart = d3.select(".chart-container")
        .append("div")
        .attr("class", "chart");

chart.selectAll("div").data(data).enter().append("div"); 
//d3 will find all the divs and bind each to a piece of data.
// enter() is like doing a $ with something that doesn't exist yet.