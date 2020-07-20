var fechaInc = document.getElementById('fechaIncidencia');
var tipoInc = document.getElementById('tipoIncidencia');
var botong = document.getElementById('boton');

var chart;
var contador = 0;

botong.addEventListener("click",
        function() {
            if (contador > 0) {
                $("#myChart").remove();
            }
            contador++;

            var fechaSelect = fechaInc.options[fechaInc.selectedIndex]
            var tipoIncSelect = tipoInc.options[tipoInc.selectedIndex]

            console.log(fechaInc.value);
            if (fechaSelect.value == 'anio'
                    || tipoIncSelect.value == 'incidencia') {
                alert("Debe seleccionar una opcion");

            } else {

                console.log(tipoIncSelect.text);

                console.log(fechaSelect.text);
                buscarGrafica(tipoIncSelect.text, fechaSelect.text);

            }
        });

function buscarGrafica(tipoIncidencia, fechaInc) {

    $
            .get(
                    "incidencias",
                    function(data, status) {

                        var incidencia;
                        var totales = [];
                        var etiquetasFinales = [];
                        var totalMes, etiquetaMes;

                        for (var i = 0; i < data.incidencia.length; i++) {
                            if (data.incidencia[i].anio == fechaInc) {
                               
                                for (var j = 0; j < data.incidencia[i].mes.length; j++) {
                                    
                                    for (var k = 0; k < (data.incidencia[i].mes[j].datos[0].tipo[k].tipo.length) ; k++) {                 
                                        if (tipoIncidencia.toLowerCase() == data.incidencia[i].mes[j].datos[0].tipo[k].tipo) {
                                            totalMes = data.incidencia[i].mes[j].datos[0].tipo[k].total;
                                            etiquetaMes = data.incidencia[i].mes[j].mes;
                                            totales.push(totalMes);
                                            etiquetasFinales.push(etiquetaMes);
                                        }
                                    }
                                }

                            }

                        }
                        console.log("Total " + totales);
                        console
                                .log("Etiquetas de meses"
                                        + etiquetasFinales);

                        dibujarGrafica(etiquetasFinales, totales);

                    });
}

function dibujarGrafica(etiquetas, datosFinales) {
    var createDiv = "<div class='container text-center' >"
            + "<canvas id='myChart'></canvas>" + "</div>";

    $("#hola").after(createDiv);
    var canvas = document.getElementById('myChart').getContext('2d');
    chart = new Chart(canvas, {
        // The type of chart we want to create
        type : 'bar',
        // The data for our dataset
        data : {
            labels : etiquetas,
            datasets : [ {
                label : 'Numero de incidencias en el año 2019',
                data : datosFinales
            //backgroundColor: 'rgba(2,47,187)'

            } ]

        },
        // Configuration options go here
        options : {
            elements : {
                rectangle : {
                    borderWidth : 1,

                    backgroundColor : [ 'rgb(0, 99, 132)',
                            'rgb(122, 44, 120)', 'rgb(241, 39, 116 )',
                            'rgb(227, 29, 29)', 'rgb(0, 99, 132)' ],
                    borderSkipped : 'bottom'
                }
            },
            responsive : true,
            title : {
                display : true,
                text : "Reporte de incidencia"
            }
        }
    });

}