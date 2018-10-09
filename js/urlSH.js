// URL de la data:
var urlZonAnn = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/ZonAnn.Ts%2BdSST.csv"; // ZonAnn

const c = d3.scaleSequential(d3.interpolateOranges)
  .domain([-0.8, 1.31]).nice();

// Llamar datos de ZonAnn
d3.csv(urlZonAnn).then(data => {

  console.log("urlZonAnn: ", data[0].Glob);

  var i = 1880; //anio min
  var a = 0;

  function myLoop() {
    setTimeout(function() {
      d3.selectAll("h6")
      .style("color", c(data[a].Glob));

        var texto = "Año: " + i  + " Anomalía: " + data[a].Glob;

      document.getElementById('anio').textContent = texto; // actualizacion de label
      a++;
      i++;
      if (i < 2018) { //anio max
        myLoop();
      }
    }, 100)
  }
  myLoop();


});
