# ¡El mundo paso de usar pantalones largos a usar pantalones cortos!

El calentamiento global es una realidad, la NASA publica los registros de las variaciones en la temperatura de la tierra, donde es posible evidenciar que la temperatura en la tierra ha venido aumentando. En el siguiente [link](https://data.giss.nasa.gov/gistemp/) se puede acceder a los datos que provee la NASA; en los que encontrará los datasets con las anomalías de la temperatura en grados Celcius a nivel global, hemisferio norte y sur, entre otros datos; por cada mes del año desde 1880 hasta la fecha.  

## Objetivo de la visualización

Diseñar una visualización que eduque a la gente acerca del calentamiento global. Se quiere  que a todo el mundo le quede claro que el calentamiento global es una realidad de todo el planeta, y que la evidencia muestra que en los últimos años se ha venido presentando un incremento constante de la temperatura. Se quiere una visualización interactiva, que descreste a la gente, que sea novedosa y fácil de entender, y sobre todo que muestre ese comportamiento global, y por continente. para esto se debe usar los [datos](https://data.giss.nasa.gov/gistemp/) que provee la NASA, con los registros desde el año 1880 hasta el día de hoy. 

## Tecnologias utilizadas 

* HTML 5
* CSS
* Javascript
* D3
* Bootstrap
* Git 

## ¿Cómo se corre?

Clonar el repositorio de forma manual o desde la consola con el comando:
`git clone https://github.com/santiagoconde0/globalTemperature.git` 
desplegar en un servidor como http-server, Tomcat, nginx, etc.

## Autores 

Santiago Suárez Conde

## Link a la página del proyecto

https://santiagoconde0.github.io/globalTemperature/

## Screenshot

![Alt text](https://github.com/santiagoconde0/globalTemperature/blob/master/img/presentation.png "Title")


## [Video de explicación](https://youtu.be/vtO-va-o7tU)


## Framework Tamara

### What?
 **Dataset:** Es de tipo *TEMPORAL* 
 **Atributos:** 
 1. Year -> Ordered - Ordinal - Sequential
 2. Glob (Temperature °C) ->  Ordered - Quantitative - Diverging
 3. NHem  (Temperature °C)->  Ordered - Quantitative - Diverging
 4. SHem (Temperature °C)-> Ordered - Quantitative - Diverging
 5. Months -> Ordered - Ordinal - Cyclic 
### Why?

** Tarea principal : **  
- **Identificar** la** tendencia** de la temperatura en  el mundo. (TAMARA: **Identify - Trends**)

**Tareas secundarias: **
- **Identificar** **valores atípicos** de las anomalías de la temperatura a través del tiempo desde 1880 (TAMARA: **Identify**, **Outliers**)
- **Resumir** la **distribución** de las anomalías de la temperatura a través del tiempo desde 1880 (TAMARA: **Summarize** -** distribution**)
- **Buscar** anomalías **extremas** en la temperatura global. (TAMARA: **Browse** - **Extremes**)
- **Comparar** la **similitud** de las temperaturas en cada hemisferio de la tierra. (TAMARA: **Compare** - **Similitary**)
- **Enjoy** 



### How?

######  **Visualización #1:** 
  **- Encode: **  Express - Ordered - Separate. 
  **- Manupulate: ** Change.
  **- Mark: ** 
 Points: Temperatura por año.
 Lines: Temperatura.

  **- Channels: ** 
 Position Horizontal and Vertical:  Temperatura en el tiempo
Color - Saturation: Temperatura en el tiempo

######  **Visualización #2:** 
  **- Encode: **  Express - Ordered - Separate 
  **- Manupulate: **  Navigate- Select - Superimpose
  **- Mark: ** 
 Points: Temperatura por año.
 Lines: Temperatura.

  **- Channels: ** 
 Position Horizontal and Vertical:  Temperatura en el tiempo
Color - Saturation: Temperatura en el tiempo

######  **Visualización #3:** 
  **- Encode: **  Express - Ordered - Separate 
  **- Manipulate: **Navigate -  Select - Superimpose / Filter
  **- Mark: ** 
 Points: Temperatura por año.
 Lines: Temperatura.

  **- Channels: ** 
 Position Horizontal and Vertical:  Temperatura en el tiempo
Color - Saturation: Temperatura en el tiempo


*Under the MIT license*

