  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 1170 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(30);

  var graph = d3.select(".graph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Residue:</strong> <span style='color:red'>" + +d.residue + "</span>";
  });

  graph.call(tip);

// load the data
d3.json('dataneerslag_new.json',
function(error, data) {
  if (error)
  {
    throw error;
  }

  data = data.points;
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return +d.residue; })]);

  /*
  // simple tooltip
  var tooltip = d3.select("body")
      .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(function(d) { return "Residue", +d.residue, "Date", d.date; });
  */

  // x-axis
  graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // y-axis
  graph.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font", "24px sans-serif")
      .text("Residue");

  // create rectangles
  graph.append("g")
    .attr("class", "bars")
  .selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(+d.residue); })
      .attr("height", function(d) { return height - y(+d.residue); })
      .attr("width", x.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
      /*
      .on("mouseover", function(){return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top",
          (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
      */

  // add text
  graph.append("g")
    .attr("class", "texts")
  .selectAll(".text")
      .data(data)
    .enter().append("text")
      .attr("class", "label")
      .attr("transform", function(d) { return "translate(" + x(d.date) + ",0)"; })
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(+d.residue) + 3; })
      .attr("dy", "1em")
      .text(function(d) { return +d.residue; });
});
