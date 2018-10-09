// URL de la data:
var url = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/data.csv", // ZonAnn
  // margenes
  margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  },
  width = 790,
  height = 500,
  radius = Math.min(width, height) / 2,
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

// crear svg
var svg3 = d3
  .select("#target2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Llamar datos de ZonAnn
d3.csv(url).then(data => {
  // console.log("url: ", data);

  var i = 1880;

  function myLoop() { //loop para crear dato de cada anio
    setTimeout(function() {
      // console.log("i: ", i);

      // filtrar datos por months
      const filteredYear = data.filter(function(d) {
        if (d.Year == i) {
          return true;
        }
      });
      // console.log("filtrado: ", filteredYear);

      //filtrar datos con un nest
      var nested_data_GLB = d3.nest()
        .key(function(d) {
          return +d.Month;
        })
        .rollup(d => {
          return d3.sum(d, d => +d.GLB);
        })
        .entries(filteredYear);
      // console.log("Nested Data: ", nested_data_GLB);

      // valor minimo GLB
      var minGLB = d3.min(nested_data_GLB, d => d.value);
      // console.log("minGLB: ", minGLB);
      // valor maximo GLB
      var maxGLB = d3.max(nested_data_GLB, d => d.value);
      // console.log("maxGLB: ", maxGLB);

      // filtrar months
      const months = d3.extent(nested_data_GLB, d => +d.key);
      // console.log("anos: ", months);
      //
      // Agregar DIV para valores de la info
      var div = d3.select("#target1").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Escala de color
      const c = d3.scaleSequential(d3.interpolateOranges)
        .domain([1880, 2018]).nice();


      // escala x
      const x3 = d3.scaleBand()
        .domain(nested_data_GLB.map(d => d.key))
        .range([margin.left, width - margin.right]);

      // crear eje x
      svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x3));

      // escala para el eje y
      y3 = d3.scaleLinear()
        .domain([-0.8, 1.31]).nice()
        .range([height - margin.bottom, margin.top]);

      // crear eje y
      svg3.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y3));

      // agregar linea
      var line = d3
        .line()
        .x(d => x3(+d.key))
        .y(d => y3(+d.value));

      // agregar path SH
      svg3.append("path")
        .datum(nested_data_GLB)
        .attr("fill", "none")
        .attr("stroke", c(i))
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

      // label eje x
      svg3.append("text")
        .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top) + ")")
        .text("Mes");

      // Label eje Y
      svg3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 5)
        .attr("x", 0 - height / 1.7)
        .attr("dy", "3em")
        .text("Anomalía de temperatura (°C)");


      i++;
      if (i < 2019) { //anio max
        myLoop();
      }
    }, 100)
  }
  myLoop();

});
