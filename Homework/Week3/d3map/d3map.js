// load the data
d3.json('data_population.json',
function(error, data) {
  if (error)
  {
    throw error;
  }
  data = data.points;

  // create a new object of the loaded data
  javaObject = {};
  data.forEach(function(d) {
        d.code = d.code;
        d.country = d.country;
        d.popDensity = +d.popDensity;

        javaObject[d.code] = {
          fillKey: colorData(d.popDensity),
          name: d.code,
          popDensity: d.popDensity
        };
      });

  // the original (now edited) .js
  $("#WorldPopDensity").datamap({
     scope: 'world',
     geography_config: {
       borderColor: 'rgba(0,0,0,0.5)',
       highlightBorderColor: 'rgba(0,255,0,1)',
       popupTemplate: _.template([
         '<div class="hoverinfo">',
         '<strong><%= geography.properties.name %></strong>',
         '<% if (data.name) { %>, <strong> <%= data.name %></strong><br/><% } %>',
         '<% if (data.popDensity) { %> Population density: <%= data.popDensity %><br/> <% } %>',
         '</div>'
        ].join('') )
     },
     fills: {
       defaultFill: '#fdedba',
       extremelyLow: '#fed976',
       veryLow: '#feb24c',
       low: '#fd8d3c',
       medium: '#fc4e2a',
       high: '#e31a1c',
       veryHigh: '#bd0026',
       extremelyHigh: '#800026'
     },
     data: javaObject
   });
 });

/* This function receives density data input and returns the appropriate colour,
   depending on the respective country's population density */
function colorData(density)
{
  // get color for the data
  if (density < 15)
  {
    return 'extremelyLow';
  }
  else if (density < 50)
  {
    return 'veryLow';
  }
  else if (density < 70)
  {
    return 'low';
  }
  else if (density < 100)
  {
    return 'medium';
  }
  else if (density < 250)
  {
    return 'high';
  }
  else if (density < 700)
  {
    return 'veryHigh';
  }
  else if (density >= 700)
  {
    return 'extremelyHigh';
  }
}

/*
    // get color for the data
    if (object.popDensity < 10)
    {
        use_color = color_scheme[0];
    }
    else if (object.popDensity < 30)
    {
        use_color = color_scheme[1];
    }
    else if (object.popDensity < 60)
    {
        use_color = color_scheme[2];
    }
    else if (object.popDensity < 100)
    {
        use_color = color_scheme[3];
    }
    else if (object.popDensity < 150)
    {
        use_color = color_scheme[4];
    }
    else if (object.popDensity < 300)
    {
        use_color = color_scheme[5];
    }
    else if (object.popDensity < 1000)
    {
        use_color = color_scheme[6];
    }
    else if (object.popDensity >= 1000)
    {
        use_color = color_scheme[7];
    }

    // change color
    if (use_color != null)
    {
        changeColor(object.code, use_color);
    }
}
*/
