// URL de la data:
var urlGLB = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/GLB.Ts%2BdSST.csv"; //GLB

// margenes
margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
  width = 1100,
  height = 500,
  radius = Math.min(width, height) / 2,
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

// crear svg2
var svg2 = d3
  .select("#target1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Llamar datos de GLB
d3.csv(urlGLB).then(data => {
  console.log("urlGLB: ", data);

  // filtrar el año que se desea visualizar
  var year = document.querySelector("input[id='slYear']").value;
  console.log("year: ", year);

  // Extraer todos los valores de los meses
  const filteredYear = data.filter(function(d) {
    if (d.Year == year) {
      return true;
    }
  });
  console.log("filteredYear: ", filteredYear);

  var datos = d3.set(data).values();

  console.log("Datos: ", datos);

  var nested_data = d3.nest()
    .key(function(d) {
      return +d.Year;
    })
    .entries(data);

  console.log("Nested Data: ", nested_data.map(d=>d.value));

});
