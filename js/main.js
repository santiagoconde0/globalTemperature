// URL de la data:
var urlGLB = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/data/GLB.Ts%2BdSST.csv", //GLB
  urlNH = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/data/NH.Ts%2BdSST.csv", // NH
  urlSH = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/data/SH.Ts%2BdSST.csv", // SH
  urlZonAnn = "https://raw.githubusercontent.com/santiagoconde0/globalTemperature/master/data/ZonAnn.Ts%2BdSST.csv"; // ZonAnn

// Llamar datos de GLB
d3.csv(urlGLB).then(data => {
console.log("urlGLB: ",   data);
});

// // Llamar datos de NH
// d3.csv(urlNH).then(data => {
// console.log("urlNH: ",   data);
// });
//
// // Llamar datos de SH
// d3.csv(urlSH).then(data => {
// console.log("urlSH: ",   data);
// });
//
// // Llamar datos de ZonAnn
// d3.csv(urlZonAnn).then(data => {
// console.log("urlZonAnn: ",   data);
// });
