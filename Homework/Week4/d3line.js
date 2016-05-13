// Jaap Nieuwenhuizen

var margin = {top: 50, right: 250, bottom: 50, left: 50},
    width = 1160 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%B");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%B"));

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
var label1 = svg.append("text");
var label2 = svg.append("text");

// create crosshair
var crosshair = svg.append("g")
    .style("display", "none")

// load the files
d3_queue.queue()
  .defer(d3.json, "DataStorage/data_d3line_DeBilt.json")
  .defer(d3.json, "DataStorage/data_d3line_Vlissingen.json")
  .await(function(error, file1, file2) {
  if (error) throw error("Error: the files did not load!");
  file1 = file1.data;
  file2 = file2.data;

  // create a new object of the loaded datasets
  filesAll = file1.concat(file2);

  // define domains
  xDomain = d3.extent(filesAll, function(d) { return formatDate.parse(d.date); });
  x.domain(xDomain);
  yDomain = d3.extent(filesAll, function(d) { return +d.temperature; });
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

  // draw the line for De Bilt
  svg.append("path")
      .datum(file1)
      .attr("id", "DeBilt")
      .attr("class", "line")
      .attr("d", line);

  // set points on the line of De Bilt
  var points = svg.selectAll(".point")
          .data(file1)
        .enter().append("svg:circle")
           .attr("stroke", "red")
           .attr("fill", function(d, i) { return "white" })
           .attr("cx", function(d, i) { return x(formatDate.parse(d.date)) })
           .attr("cy", function(d, i) { return y(+d.temperature) })
           .attr("r", function(d, i) { return 4 })
           .attr("class", "circle");

  // draw the line for Vlissingen
  svg.append("path")
      .datum(file2)
      .attr("id", "Vlissingen")
      .attr("class", "line")
      .attr("d", line);

  // set points on the line of Vlissingen
  var points = svg.selectAll(".point")
          .data(file2)
        .enter().append("svg:circle")
           .attr("stroke", "steelblue")
           .attr("fill", function(d, i) { return "white" })
           .attr("cx", function(d, i) { return x(formatDate.parse(d.date)) })
           .attr("cy", function(d, i) { return y(+d.temperature) })
           .attr("r", function(d, i) { return 4 })
           .attr("class", "circle");

 // focus tracking
  var focus = svg.append('g').style('display', 'none');

  focus.append('line')
      .attr('id', 'focusLineX')
      .attr('class', 'focusLine');
  focus.append('line')
      .attr('id', 'focusLineY')
      .attr('class', 'focusLine');
  focus.append('circle')
      .attr('id', 'focusCircle')
      .attr('r', 4)
      .attr('class', 'circle focusCircle');

  focus.append('line')
      .attr('id', 'focusLineX2')
      .attr('class', 'focusLine');
  focus.append('line')
      .attr('id', 'focusLineY2')
      .attr('class', 'focusLine');
  focus.append('circle')
      .attr('id', 'focusCircle2')
      .attr('r', 4)
      .attr('class', 'circle focusCircle');

  var bisectDate = d3.bisector(function(d) { return formatDate.parse(d.date); }).left;

  svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function() { focus.style('display', null); })
      .on('mouseout', function() { focus.style('display', 'none'); })
      .on('mousemove', function() {
          var mouse = d3.mouse(this);
          var mouseDate = x.invert(mouse[0]);

          // file 1
          var i = bisectDate(file1, mouseDate); // returns the index to the current data item

          var d0 = file1[i - 1]
          var d1 = file1[i];
          // work out which date value is closest to the mouse
          var d = (formatDate.parse(d1.date) - formatDate.parse(d0.date)) / 2.0 > mouseDate - formatDate.parse(d0.date) ? d0 : d1;
          // mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;

          var xVal = x(formatDate.parse(d.date));
          var yVal = y(+d.temperature);

          focus.select('#focusCircle')
              .attr('cx', xVal)
              .attr('cy', yVal);
          focus.select('#focusLineX')
              .attr('x1', xVal).attr('y1', y(yDomain[0]))
              .attr('x2', xVal).attr('y2', y(yDomain[1]));
          focus.select('#focusLineY')
              .attr('x1', x(xDomain[0])).attr('y1', yVal)
              .attr('x2', x(xDomain[1])).attr('y2', yVal);

          // define label for crosshairs file1
          label1.attr("x", xVal + 10).attr("y", yVal).style("text-anchor", "center");
          label1.text(function() {
            return "x=" + formatDate(x.invert(xVal)) + ", y=" + y.invert(yVal);
          });

          // file 2
          var i = bisectDate(file2, mouseDate); // returns the index to the current data item

          var d0 = file2[i - 1]
          var d1 = file2[i];
          // work out which date value is closest to the mouse
          var d = (formatDate.parse(d1.date) - formatDate.parse(d0.date)) / 2.0 > mouseDate - formatDate.parse(d0.date) ? d0 : d1;
          // mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;

          var xVal2 = x(formatDate.parse(d.date));
          var yVal2 = y(+d.temperature);

          focus.select('#focusCircle2')
              .attr('cx', xVal2)
              .attr('cy', yVal2);
          focus.select('#focusLineX2')
              .attr('x1', xVal2).attr('y1', y(yDomain[0]))
              .attr('x2', xVal2).attr('y2', y(yDomain[1]));
          focus.select('#focusLineY2')
              .attr('x1', x(xDomain[0])).attr('y1', yVal2)
              .attr('x2', x(xDomain[1])).attr('y2', yVal2);

          // define label for crosshairs file2
          label2.attr("x", xVal2 + 10).attr("y", yVal2).style("text-anchor", "center");
          label2.text(function() {
            return "x=" + formatDate(x.invert(xVal2)) + ", y=" + y.invert(yVal2);
          });

          // put a text label in the lower-right corner
          label.text(function() {
            return "x=" + d.date + ", y=" + y.invert(mouse[1]);
          });
      });
});
