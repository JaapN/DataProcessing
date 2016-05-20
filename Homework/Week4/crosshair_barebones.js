/*
// create crosshair
var crosshair = svg.append("g")
    .style("display", "none")


.crosshair {
      fill: none;
      stroke-width: 1px;
}

#crosshairX {
  stroke: yellow;
  stroke-width: 2px;
}

#crosshairY {
  stroke: yellow;
  stroke-width: 2px;
}
*/



/*
var calcMonth = function(coordinate, width) {
  if (coordinate < (width / 11) - (width / 22))
  {
    return "January";
  }
  else if (coordinate < (1.95 * width / 11) - (width / 22))
  {
    return "February";
  }
  else if (coordinate < (2.95 * width / 11) - (width / 22))
  {
    return "March";
  }
  else if (coordinate < (3.95 * width / 11) - (width / 22))
  {
    return "April";
  }
  else if (coordinate < (4.95 * width / 11) - (width / 22))
  {
    return "May";
  }
  else if (coordinate < (5.95 * width / 11) - (width / 22))
  {
    return "June";
  }
  else if (coordinate < (6.95 * width / 11) - (width / 22))
  {
    return "July";
  }
  else if (coordinate < (8 * width / 11) - (width / 22))
  {
    return "August";
  }
  else if (coordinate < (9 * width / 11) - (width / 22))
  {
    return "September";
  }
  else if (coordinate < (10 * width / 11) - (width / 22))
  {
    return "Octobre";
  }
  else if (coordinate < (11 * width / 11) - (width / 22))
  {
    return "November";
  }
  else
  {
    return "December";
  }
}
*/

// create horizontal line
/*
crosshair.append("line")
.attr("id", "crosshairX")
.attr("class", "crosshair");
*/

// create vertical line
/*
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
*/
