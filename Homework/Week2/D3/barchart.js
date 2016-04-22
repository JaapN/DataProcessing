d3.json('dataneerslag.json',
function(error, object) {
  if (error)
  {
    return console.warn(error);
  }
  console.log(object);
});
