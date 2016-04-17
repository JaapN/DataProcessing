/**
 * Loading the data
 */
// get data by id
var dataset = document.getElementById('rawdata').innerHTML.split('\n');

// define arrays
var date = [];
var temperature = [];

// store date and temperature in arrays
for (var count = 1; count < dataset.length; count++)
{
    date.push(new Date(dataset[count].split(',\t')[0]));
    var integer = parseInt(dataset[count].split(',\t')[1], 10);
    temperature.push(integer);
}


/**
 * Transformations
 */
function createTransform(domain, range)
{
 	var alpha = (range[0] - range[1]) / (domain[0] - domain[1]);
	var beta = range[0] - (domain[0] * (range[0] - range[1]) / (domain[0] - domain[1]));
	return function(x)
	{
		return alpha * x + beta;
	};
}

// calculate new date function
dom_min = date[0].getTime();
dom_max = date[364].getTime();
ran_min = 120;
ran_max = 700;
date_function = createTransform([dom_min, dom_max], [ran_min, ran_max]);

// calculate date screen coordinates
var date_screen = [];
var date_new = [];
for (var count = 0; count < date.length; count++)
{
    var date_time = date_function(date[count].getTime());
    date_screen.push(date_time);
    
    // new date array
    date_new.push(date[count].getTime());
}

// calculate new temperature function
var dom_min = -100;
var dom_max = 300;
var ran_min = 450;
var ran_max = 60;
var temp_function = createTransform([dom_min, dom_max], [ran_min, ran_max]);

// calculate temperature screen coordinates
var temperature_screen = [];
for (var count = 0; count < temperature.length; count++)
{
    var temperature_new = temp_function(temperature[count]);
    temperature_screen.push(temperature_new);
}


/**
 * Canvas
 */
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// axis labels
ctx.font = "20px times new roman";
ctx.save();
ctx.rotate((Math.PI/180)*90);
ctx.fillText("Degree Celcius", 180, -20);
ctx.restore();
ctx.fillText("Month", 720, 455);

// title
ctx.font = "26px arial";
ctx.fillText("Average temperature in De Bilt (NL), 2015", 310, 25);

// source
ctx.font = "10px arial";
ctx.fillText("http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi", 5, 495);

// y-axis values
for (var count = 0; count < 3; count++)
{
    ctx.font = "22px serif";
    ctx.fillText("30", 50, 70);
    ctx.beginPath();
    ctx.moveTo(100,60);
    ctx.lineTo(90,60);
    ctx.stroke();
    ctx.fillText("26", 50, 108);
    ctx.beginPath();
    ctx.moveTo(100,99);
    ctx.lineTo(90,99);
    ctx.stroke();
    ctx.fillText("22", 50, 146);
    ctx.beginPath();
    ctx.moveTo(100,138);
    ctx.lineTo(90,138);
    ctx.stroke();
    ctx.fillText("18", 50, 184);
    ctx.beginPath();
    ctx.moveTo(100,177);
    ctx.lineTo(90,177);
    ctx.stroke();
    ctx.fillText("14", 50, 222);
    ctx.beginPath();
    ctx.moveTo(100,216);
    ctx.lineTo(90,216);
    ctx.stroke();
    ctx.fillText("10", 50, 260);
    ctx.beginPath();
    ctx.moveTo(100,255);
    ctx.lineTo(90,255);
    ctx.stroke();
    ctx.fillText("6", 60, 298);
    ctx.beginPath();
    ctx.moveTo(100,294);
    ctx.lineTo(90,294);
    ctx.stroke();
    ctx.fillText("2", 60, 336);
    ctx.beginPath();
    ctx.moveTo(100,333);
    ctx.lineTo(90,333);
    ctx.stroke();
    ctx.fillText("-2", 50, 374);
    ctx.beginPath();
    ctx.moveTo(100,372);
    ctx.lineTo(90,372);
    ctx.stroke();
    ctx.fillText("-6", 50, 412);
    ctx.beginPath();
    ctx.moveTo(100,411);
    ctx.lineTo(90,411);
    ctx.stroke();
    ctx.fillText("-10", 40, 450);
    ctx.beginPath();
    ctx.moveTo(100,450);
    ctx.lineTo(90,450);
    ctx.stroke();
}

// x-axis values
for (var count = 0; count < 1; count++)
{
    ctx.font = "12px serif";
    ctx.fillText("January", 100, 475);
    ctx.beginPath();
    ctx.moveTo(120,450);
    ctx.lineTo(120,460);
    ctx.stroke();
    ctx.fillText("February", 150, 475);
    ctx.beginPath();
    ctx.moveTo(173,450);
    ctx.lineTo(173,460);
    ctx.stroke();
    ctx.fillText("March", 210, 475);
    ctx.beginPath();
    ctx.moveTo(225,450);
    ctx.lineTo(225,460);
    ctx.stroke();
    ctx.fillText("April", 265, 475);
    ctx.beginPath();
    ctx.moveTo(278,450);
    ctx.lineTo(278,460);
    ctx.stroke();
    ctx.fillText("May", 320, 475);
    ctx.beginPath();
    ctx.moveTo(331,450);
    ctx.lineTo(331,460);
    ctx.stroke();
    ctx.fillText("June", 370, 475);
    ctx.beginPath();
    ctx.moveTo(384,450);
    ctx.lineTo(384,460);
    ctx.stroke();
    ctx.fillText("July", 425, 475);
    ctx.beginPath();
    ctx.moveTo(436,450);
    ctx.lineTo(436,460);
    ctx.stroke();
    ctx.fillText("Augustus", 460, 475);
    ctx.beginPath();
    ctx.moveTo(489,450);
    ctx.lineTo(489,460);
    ctx.stroke();
    ctx.fillText("September", 515, 475);
    ctx.beginPath();
    ctx.moveTo(541,450);
    ctx.lineTo(541,460);
    ctx.stroke();
    ctx.fillText("Oktober", 575, 475);
    ctx.beginPath();
    ctx.moveTo(594,450);
    ctx.lineTo(594,460);
    ctx.stroke();
    ctx.fillText("November", 625, 475);
    ctx.beginPath();
    ctx.moveTo(647,450);
    ctx.lineTo(647,460);
    ctx.stroke();
    ctx.fillText("December", 685, 475);
    ctx.beginPath();
    ctx.moveTo(700,450);
    ctx.lineTo(700,460);
    ctx.stroke();
}

/**
 * Graph
 */
// construct y-axis
ctx.beginPath();
ctx.moveTo(100,60);
ctx.lineTo(100,450);
ctx.stroke();

// construct x-axis
ctx.beginPath();
ctx.moveTo(120,450);
ctx.lineTo(700,450);
ctx.stroke();

// draw graph line
ctx.beginPath();
ctx.moveTo(date_screen[0],temperature_screen[0]);
for (var count = 0; count < temperature_screen.length; count++)
{
    ctx.setLineDash([3, 1]);
    ctx.lineDashOffset = 0;
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.lineTo(date_screen[count], temperature_screen[count]);
}
ctx.stroke();

/**
 * PART 2
 * !!!
 * Interactivity
 * !!!
 */
var canvas2 = document.getElementById('mysecondcanvas');
var ctx2 = canvas2.getContext('2d');

// draw the crosshairs
canvas2.addEventListener("mousemove", function(event)
{
    ctx2.clearRect(0, 0, 580, 390);

    var x_pos = event.clientX - 128;
    var y_pos = event.clientY - 68;

    // draw horizontal line
    ctx2.beginPath();
    ctx2.moveTo(0, y_pos);
    ctx2.lineTo(580, y_pos);

    // draw vertical line
    ctx2.moveTo(x_pos, 390);
    ctx2.lineTo(x_pos, 0);
    ctx2.stroke();
});

// extra credit - tooltip
canvas2.addEventListener("mousemove", function(event)
{
    // get positions
    var x_pos = event.clientX - 128;
    var y_pos = event.clientY - 68;

    // compute new functions
    var transformDate = createTransform([0, 580], [0, 364]);
    var transformTemp = createTransform([0, 390], [30, -10]);

    // calculate precise values
    var dateValue = date[Math.ceil(transformDate(x_pos))];
    var tempValue = transformTemp(y_pos);

    ctx.clearRect(20, 33, 750, 20);
    ctx.font = "13px cambria";
    ctx.fillText("Date: ", 90, 50);
    ctx.fillText(dateValue, 125, 50);
    ctx.fillText("Temperature: ", 550, 50);
    ctx.fillText(tempValue, 630, 50);
});