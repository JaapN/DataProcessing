/**
 * Jaap Nieuwenhuizen
 */

/* use this to test out your function */
window.onload = function()
{
 	changeColor('gre', '#AFEEEE');
 	changeColor('ita', '#008000');
 	changeColor('ch', '#FF6347');
 	changeColor('swe', '#FFFF00');
 	changeColor('nld', '#FF9F00');
};

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color)
{
    document.getElementById(id).setAttribute("fill", color);
}
