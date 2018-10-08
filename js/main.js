function auto() {
  var i = 1880; //anio min

  function myLoop() {
    setTimeout(function() {
      d3.select("#slYear")
        .property("value", i); // set el anio a mostrar

      document.getElementById('lbYear').textContent = i; // actualizacion de label

      updateData();
      i++;
      if (i < 2019) { //anio max
        myLoop();
      }
    }, 500)
  }
  myLoop();
}
