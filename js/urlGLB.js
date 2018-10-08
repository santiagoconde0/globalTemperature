// URL de la data:
var urlGLB1 = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/GLB.csv"; //GLB
var urlGLB2 = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/datos/GLB.Ts%2BdSST.csv"; //GLB

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
d3.csv(urlGLB2).then(data => {
  console.log("urlGLB: ", data);
//   data.forEach(function (d) {
//     d.Year = +d.Year;
//     // console.log("Year: ", d.Year);
//     d.Jan = +d.Jan; //1
//     // console.log("d.Jan", d.Jan);
//     d.Feb = +d.Feb; //2
//     // console.log("d.Feb", d.Feb );
//     d.Mar = +d.Mar; //3
//     // console.log("d.Mar", d.Mar);
//     d.Apr = +d.Apr;  //4
//     // console.log("d.Apr", d.Apr);
//     d.May = +d.May; //5
//     // console.log("d.May", d.May);
//     d.Jun = +d.Jun; //6
//     // console.log("d.Jun", d.Jun);
//     d.Jul = +d.Jul; //7
//     // console.log("d.Jul",d.Jul);
//     d.Aug = +d.Aug; //8
//     // console.log("d.Aug",d.Aug);
//     d.Sep = +d.Sep; //9
//     // console.log("d.Sep",d.Sep);
//     d.Oct = +d.Oct; //10
//     // console.log("d.Oct",d.Oct);
//     d.Nov = +d.Nov; //11
//     // console.log("d.Nov",d.Nov);
//     d.Dec = +d.Dec; //12
//     // console.log("d.Dec",d.Dec);
// });
//
// var chart = makeLineChart(data, 'Year', {
//     'Variable A': {column: 'variableA'},
//     'Variable B': {column: 'variableB'},
//     'Variable C': {column: 'variableC'},
//     'Variable D': {column: 'variableD'}
// }, {xAxis: 'Years', yAxis: 'Amount'});
// chart.bind("#chart-line1");
// chart.render();


});
