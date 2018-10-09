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
  height = 450,
  radius = Math.min(width, height) / 2,
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

// crear svg
var svg2 = d3
  .select("#viz2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Llamar datos de ZonAnn
d3.csv(url).then(data => {
  // console.log("url: ", data);

  // slider value

  var yearSL = document.querySelector("input[id='slYear']").value; //get the slide value

  // filtrar datos por months
  const filteredYear = data.filter(function(d) {
    if (d.Year == yearSL) {
      return true;
    }

  });
  // console.log("filtrado: ", filteredYear);

  //filtrar datos con un nest
  var nested_data_SH = d3.nest()
    .key(function(d) {
      return +d.Month;
    })
    .rollup(d => {
      return d3.sum(d, d => +d.SH);
    })
    .entries(filteredYear);
  // console.log("Nested Data: ", nested_data_SH);

  // valor minimo sh
  var minSH = d3.min(nested_data_SH, d => d.value);
  // console.log("minSH: ", minSH);
  // valor maximo SH
  var maxSH = d3.max(nested_data_SH, d => d.value);
  // console.log("maxSH: ", maxSH);

  //filtrar datos con un nest
  var nested_data_NH = d3.nest()
    .key(function(d) {
      return +d.Month;
    })
    .rollup(d => {
      return d3.sum(d, d => +d.NH);
    })
    .entries(filteredYear);
  // console.log("Nested DataNH: ", nested_data_NH);

  // valor minimo sh
  var minNH = d3.min(nested_data_NH, d => d.value);
  // console.log("minNH: ", minNH);
  // valor maximo NH
  var maxNH = d3.max(nested_data_NH, d => d.value);
  // console.log("maxNH: ", maxNH);

  if (minSH > minNH) {
    var min = minNH;
  } else {
    var min = minSH;
  }

  if (maxSH > maxNH) {
    var max = maxSH;
  } else {
    var max = maxNH;
  }

  // console.log("min", min);

  // console.log("max", max);

  // filtrar months
  const months = d3.extent(nested_data_SH, d => d.key);
  // console.log("anos: ", months);

  // Agregar DIV para valores de la info
  var div = d3.select("#viz2").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Escala de color
  const c = d3.scaleSequential(d3.interpolateOrRd)
    .domain([d3.min(nested_data_SH, d => d.value), d3.max(nested_data_SH, d => d.value)]).nice();

  const cNH = d3.scaleSequential(d3.interpolateOrRd)
    .domain([d3.min(nested_data_NH, d => d.value), d3.max(nested_data_NH, d => d.value)]).nice();

  // escala x
  const x = d3.scaleBand()
    .domain(nested_data_SH.map(d => d.key))
    .range([margin.left, width - margin.right]);

  // crear eje x
  svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // escala para el eje y
  y = d3.scaleLinear()
    .domain([min, max]).nice()
    .range([height - margin.bottom, margin.top]);

  // crear eje y
  svg2.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // agregar linea
  var line = d3
    .line()
    .x(d => x(+d.key))
    .y(d => y(+d.value));

  // agregar path SH
  svg2.append("path")
    .datum(nested_data_SH)
    .attr("fill", "none")
    .attr("stroke", "#98B3FB")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  // agregar path NH
  svg2.append("path")
    .datum(nested_data_NH)
    .attr("fill", "none")
    .attr("stroke", "#98FB98")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  // label eje x
  svg2.append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top) + ")")
    .text("Mes");

  // Label eje Y
  svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - height / 1.7)
    .attr("dy", "10em")
    .text("Anomalía de temperatura (°C)");

  // agregar los puntos SH
  svg2.selectAll("dot")
    .data(nested_data_SH)
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
      div.html("Mes: " + d.key + "<br/>" + "Anomalía en SH: " + d.value)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }).on("mouseout", function(d) { //desaparece informacion cuando esta fuera del punto
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // agregar los puntos NH
  svg2.selectAll("dot")
    .data(nested_data_NH)
    .enter().append("circle")
    .attr("r", 4)
    .attr("cx", function(d) {
      return x(d.key);
    })
    .attr("cy", function(d) {
      return y(+d.value);
    })
    .style("fill", d => cNH(d.value))
    .on("mouseover", function(d) { // aparece info cuando se para sobre el punto
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("Mes: " + d.key + "<br/>" + "Anomalía en NH: " + d.value)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }).on("mouseout", function(d) { //desaparece informacion cuando esta fuera del punto
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });
});

// -----------Actualizacion----------

function updateData() {
  // Remover la visualización anterior
  d3.select("#viz2").remove();

  // obtener vlaor del slider
  var yearSL = document.querySelector("input[id='slYear']").value;
  // console.log("Year", yearSL);

// crear de nuevo el div que contiene la visualización
  d3.select('#target1')
    .append('div')
    .attr("id", "viz2");

  var svg2 = d3
    .select("#viz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Generar una nueva visualización

  d3.csv(url).then(data => {
    // console.log("url: ", data);
    // slider value

    var yearSL = document.querySelector("input[id='slYear']").value; //get the slide value

    // filtrar datos por months
    const filteredYear = data.filter(function(d) {
      if (d.Year == yearSL) {
        return true;
      }

    });
    // console.log("filtrado: ", filteredYear);

    //filtrar datos con un nest
    var nested_data_SH = d3.nest()
      .key(function(d) {
        return +d.Month;
      })
      .rollup(d => {
        return d3.sum(d, d => +d.SH);
      })
      .entries(filteredYear);
    // console.log("Nested Data: ", nested_data_SH);

    // valor minimo sh
    var minSH = d3.min(nested_data_SH, d => d.value);
    // console.log("minSH: ", minSH);
    // valor maximo SH
    var maxSH = d3.max(nested_data_SH, d => d.value);
    // console.log("maxSH: ", maxSH);

    //filtrar datos con un nest
    var nested_data_NH = d3.nest()
      .key(function(d) {
        return +d.Month;
      })
      .rollup(d => {
        return d3.sum(d, d => +d.NH);
      })
      .entries(filteredYear);
    // console.log("Nested DataNH: ", nested_data_NH);

    // valor minimo sh
    var minNH = d3.min(nested_data_NH, d => d.value);
    // console.log("minNH: ", minNH);
    // valor maximo NH
    var maxNH = d3.max(nested_data_NH, d => d.value);
    // console.log("maxNH: ", maxNH);

// obtener valor minimo de los datos
    if (minSH > minNH) {
      var min = minNH;
    } else {
      var min = minSH;
    }

// obtener el valor maximo de los datos
    if (maxSH > maxNH) {
      var max = maxSH;
    } else {
      var max = maxNH;
    }

    // console.log("min", min);
    // console.log("max", max);

    // filtrar months
    const months = d3.extent(nested_data_SH, d => d.key);
    // console.log("anos: ", months);

    // Agregar DIV para valores de la info
    var div = d3.select("#viz2").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Escala de color
    const c = d3.scaleSequential(d3.interpolateOrRd)
      .domain([d3.min(nested_data_SH, d => d.value), d3.max(nested_data_SH, d => d.value)]).nice();

    const cNH = d3.scaleSequential(d3.interpolateOrRd)
      .domain([d3.min(nested_data_NH, d => d.value), d3.max(nested_data_NH, d => d.value)]).nice();

    // escala x
    const x = d3.scaleBand()
      .domain(nested_data_SH.map(d => d.key))
      .range([margin.left, width - margin.right]);

    // crear eje x
    svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // escala para el eje y
    y = d3.scaleLinear()
      .domain([min, max]).nice()
      .range([height - margin.bottom, margin.top]);

    // crear eje y
    svg2.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // agregar linea
    var line = d3
      .line()
      .x(d => x(+d.key))
      .y(d => y(+d.value));

    // agregar path SH
    svg2.append("path")
      .datum(nested_data_SH)
      .attr("fill", "none")
      .attr("stroke", "#98B3FB")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // agregar path NH
    svg2.append("path")
      .datum(nested_data_NH)
      .attr("fill", "none")
      .attr("stroke", "#98FB98")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // label eje x
    svg2.append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top) + ")")
      .text("Mes");

    // Label eje Y
    svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 5)
      .attr("x", 0 - height / 1.7)
      .attr("dy", "10em")
      .text("Anomalía de temperatura (°C)");

    // agregar los puntos SH
    svg2.selectAll("dot")
      .data(nested_data_SH)
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
        div.html("Mes: " + d.key + "<br/>" + "Anomalía en SH: " + d.value)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }).on("mouseout", function(d) { //desaparece informacion cuando esta fuera del punto
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // agregar los puntos NH
    svg2.selectAll("dot")
      .data(nested_data_NH)
      .enter().append("circle")
      .attr("r", 4)
      .attr("cx", function(d) {
        return x(d.key);
      })
      .attr("cy", function(d) {
        return y(+d.value);
      })
      .style("fill", d => cNH(d.value))
      .on("mouseover", function(d) { // aparece info cuando se para sobre el punto
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Mes: " + d.key + "<br/>" + "Anomalía en NH: " + d.value)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }).on("mouseout", function(d) { //desaparece informacion cuando esta fuera del punto
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });

    window.location.hash = "#viz2";
}
