// URL de la data:
var urlZonAnn = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/ZonAnn.Ts%2BdSST.csv", // ZonAnn
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

// crear svg
var svg = d3
  .select("#target4")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Llamar datos de ZonAnn
d3.csv(urlZonAnn).then(data => {
  console.log("urlZonAnn: ", data);

  //filtrar datos con un nest
  var nested_data = d3.nest()
    .key(function(d) {
      return +d.Year;
    })
    .rollup(d => {
      return d3.sum(d, d => +d.Glob);
    })
    .entries(data);
  console.log("Nested Data: ", nested_data);

  // filtrar anios
  const anios = d3.extent(nested_data, d => d.key);
  console.log("anos: ", anios);


  // Agregar DIV para valores de la info
  var div = d3.select("#target4").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Escala de color
  const c = d3.scaleSequential(d3.interpolateOranges)
    .domain([d3.min(nested_data, d => d.value), d3.max(nested_data, d => d.value)]).nice();

  // eje x
  const x = d3.scaleTime()
    .domain(anios)
    .range([margin.left, width - margin.right]);

  // crear eje x
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // escala para el eje y
  y = d3.scaleLinear()
    .domain([d3.min(nested_data, d => d.value), d3.max(nested_data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  // crear eje y
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // agregar linea
  var line = d3
    .line()
    .x(d => x(+d.key))
    .y(d => y(+d.value));

  // agregar path
  svg.append("path")
    .datum(nested_data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  // label eje x
  svg.append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top) + ")")
    .text("Años");

  // Label eje Y
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - height / 1.7)
    .attr("dy", "3em")
    .text("Anomalía de temperatura");

  // agregar los puntos
  svg.selectAll("dot")
    .data(nested_data)
    .enter().append("circle")
    .attr("r", 4)
    .attr("cx", function(d) {
      return x(d.key);
    })
    .attr("cy", function(d) {
      return y(+d.value);
    })
    .style("fill", d => c(d.value))
    .on("mouseover", function(d) { // aparece info cuando se para sobre el punto
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("Año: " + d.key + "<br/>" + "Anomalía: " + d.value)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }).on("mouseout", function(d) { //desaparece informacion cuando esta fuera del punto
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });
});
