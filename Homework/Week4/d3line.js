// Jaap Nieuwenhuizen

var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var calcMonth = function(coordinate, width) {
  if (coordinate < width / 11)
  {
    return "January";
  }
  else if (coordinate < 2 * width / 11)
  {
    return "February";
  }
  else if (coordinate < 3 * width / 11)
  {
    return "March";
  }
  else if (coordinate < 4 * width / 11)
  {
    return "April";
  }
  else if (coordinate < 5 * width / 11)
  {
    return "May";
  }
  else if (coordinate < 6 * width / 11)
  {
    return "June";
  }
  else if (coordinate < 7 * width / 11)
  {
    return "July";
  }
  else if (coordinate < 8 * width / 11)
  {
    return "August";
  }
  else if (coordinate < 9 * width / 11)
  {
    return "September";
  }
  else if (coordinate < 10 * width / 11)
  {
    return "Octobre";
  }
  else if (coordinate < 11 * width / 11)
  {
    return "November";
  }
  else
  {
    return "December";
  }
}

var formatDate = d3.time.format("%B");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(formatDate.parse(d.date)); })
    .y(function(d) { return y(+d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// define label for crosshairs
var label = svg.append("text")
    .attr("x", width - 5)
    .attr("y", height - 5)
    .style("text-anchor", "end");

// create crosshair
var crosshair = svg.append("g")
    .style("display", "none")

d3_queue.queue()
  .defer(d3.json, "DataStorage/data_d3line_DeBilt.json")
  .defer(d3.json, "DataStorage/data_d3line_Vlissingen.json")
  .await(function(error, file1, file2) {
  if (error) throw error("Error: the files did not load!");
  file1 = file1.data;
  file2 = file2.data;

  xDomain = d3.extent(file1, function(d) { return formatDate.parse(d.date); });
  x.domain(xDomain);
  yDomain = d3.extent(file1, function(d) { return +d.temperature; });
  y.domain(yDomain);

  // create x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // create y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".61em")
      .attr("dx", "-.61em")
      .style("text-anchor", "end")
      .text("Temperature (0.1 Celcius)");

  // draw the line
  svg.append("path")
      .datum(file1)
      .attr("class", "line")
      .attr("d", line);

  // create horizontal line
  crosshair.append("line")
      .attr("id", "crosshairX")
      .attr("class", "crosshair");

  // create vertical line
  crosshair.append("line")
      .attr("id", "crosshairY")
      .attr("class", "crosshair");
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        crosshair.style("display", null);
      })
      .on("mouseout", function() {
        crosshair.style("display", "none");
        label.text("");
      })
      .on("mousemove", function() {
        var mouse = d3.mouse(this);

        crosshair.select("#crosshairX")
          .attr("x1", mouse[0])
          .attr("y1", y(yDomain[0]))
          .attr("x2", mouse[0])
          .attr("y2", y(yDomain[1]));

        crosshair.select("#crosshairY")
          .attr("x1", x(xDomain[0]))
          .attr("y1", mouse[1])
          .attr("x2", x(xDomain[1]))
          .attr("y2", mouse[1]);

        label.text(function() {
          return "x=" + calcMonth(mouse[0], width) + ", y=" + (yDomain[1] - mouse[1] * (yDomain[1] - yDomain[0]) / height);
        });
      })
      .on("click", function() {
        console.log(d3.mouse(this));
      });;

});
