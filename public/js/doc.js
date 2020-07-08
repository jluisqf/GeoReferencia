
    var mymap = L.map('mapid').setView([19.37596, -99.07000], 12);
    var mymap2 = L.map('mapid2').setView([19.37596, -99.07000], 12);
    var mymap3 = L.map('mapid3').setView([19.37596, -99.07000], 12);
    var mymap4 = L.map('mapid4').setView([19.37596, -99.07000], 12);
    var mymap5 = L.map('mapid5').setView([19.37596, -99.07000], 11);
    var map = L.map('map').setView([19.37596, -99.07000], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(map);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11'
    }).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11'
    }).addTo(mymap2);



    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap3);

    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11'
            }).addTo(mymap5);

    function clearMap(m) {
        for (i in m._layers) {
            if (m._layers[i]._path != undefined) {
                try {
                    m.removeLayer(m._layers[i]);
                } catch (e) {
                    console.log("problem with " + e + m._layers[i]);
                }
            }
        }
    }

    function animate() {

        var pointA;
        var pointB;
        var pointList;
        var firstpolyline;

        clearMap(mymap);
        clearMap(mymap2);
        clearMap(mymap3);
        $.get("/traffic", function (data, status) {

            for (i = 0; i < data.jams.length; i++) {
                for (j = 1; j < (data.jams[i].line.length - 1); j++) {

                    pointA = new L.LatLng(data.jams[i].line[j].y, data.jams[i].line[j].x);
                    pointB = new L.LatLng(data.jams[i].line[j + 1].y, data.jams[i].line[j + 1].x);
                    pointList = [pointA, pointB];

                    if (data.jams[i].speed < 5) {
                        firstpolyline = new L.Polyline(pointList, {
                            color: 'red',
                            weight: 6,
                            opacity: 0.5,
                            smoothFactor: 1
                        });
                    } else {
                        firstpolyline = new L.Polyline(pointList, {
                            color: 'orange',
                            weight: 6,
                            opacity: 0.5,
                            smoothFactor: 1
                        });
                    }
                    firstpolyline.addTo(mymap);



                }
            }

        });

        
        var Icon = L.icon({iconUrl: 'trafficlight.png',
                iconSize: [20, 20],
                iconAnchor: [22, 20],
                popupAnchor: [-3, -76]});
        $.get("/semaforoizt", function (data, status) {
            var marker;
            for (i = 0; i < data.length; i++) {

                marker = L.marker([data[i].latitud, data[i].longitud], {icon: Icon} ).addTo(mymap).bindPopup("Hola.");

            }
        });

        $.get("/semaforoizc", function (data, status) {
            var marker;
            for (i = 0; i < data.length; i++) {

                marker = L.marker([data[i].latitud, data[i].longitud],{icon: Icon}).addTo(mymap);

            }
        });

        $.get("/semaforomh", function (data, status) {
            var marker;
            for (i = 0; i < data.length; i++) {

                marker = L.marker([data[i].latitud, data[i].longitud],{icon: Icon}).addTo(mymap);

            }
        });
    
        
        $.get("callescerradas", function (data, status) {

            var marker;
            var marker2;
            var Icon1 = L.icon({iconUrl: 'accesdenied.png',
                iconSize: [20, 20],
                iconAnchor: [22, 20],
                popupAnchor: [-3, -76]});
            var Icon2 = L.icon({iconUrl: 'construction.png',
                iconSize: [20, 20],
                iconAnchor: [22, 20],
                popupAnchor: [-3, -76]});

            for (i = 0; i < data.jams.length; i++) {

                
                const opcionesPopUp = L.popup() //Funcion de leaflet
                    .setContent(`<p><b>Alcaldia:</b> ${data.jams[i].city}</p>
                    <p> <b>Calle:</b>  ${data.jams[i].street}</p>
                    `)

                if (data.jams[i].blockType == "ROAD_CLOSED_EVENT") {
                    
                    marker = L.marker([data.jams[i].line[0].y, data.jams[i].line[0].x], {icon: Icon1}).addTo(mymap2).bindPopup(opcionesPopUp);
                    //marker = L.marker([data.alerts[i].location.y, data.alerts[i].location.x], {icon: greenIcon}).addTo(mymap3).bindPopup("Soy un nuevo");
                }
                else if(data.jams[i].blockType == "ROAD_CLOSED_CONSTRUCTION") {
                    marker2 = L.marker([data.jams[i].line[0].y, data.jams[i].line[0].x], {icon: Icon2}).addTo(mymap2).bindPopup(opcionesPopUp);
                }
            }

        });
/////////////////////////////////////////////////////////////////////////////////////////
$.get("roadclosed", function (data, status) {
   
    var markers = L.markerClusterGroup();
    var markerList = [];    
 
    var Icon1 = L.icon({iconUrl: 'accesdenied.png',
        iconSize: [20, 20],
        iconAnchor: [22, 20],
        popupAnchor: [-3, -76]});
    var Icon2 = L.icon({iconUrl: 'construction.png',
        iconSize: [20, 20],
        iconAnchor: [22, 20],
        popupAnchor: [-3, -76]});
    for (i = 0; i < data.jams.length; i++) {

        const opcionesPopUp = L.popup() //Funcion de leaflet
            .setContent(`<p><b>Alcaldia:</b> ${data.jams[i].city}</p>
            <p> <b>Calle:</b>  ${data.jams[i].street}</p>
            `)

        if (data.jams[i].blockType == "ROAD_CLOSED_EVENT") {
            
            var marker = L.marker(L.latLng(data.jams[i].line[0].y, data.jams[i].line[0].x), {icon: Icon1}).bindPopup(opcionesPopUp);
            markerList.push(marker);

        }
        else if(data.jams[i].blockType == "ROAD_CLOSED_CONSTRUCTION") {
            var marker2 = L.marker(L.latLng(data.jams[i].line[0].y, data.jams[i].line[0].x), {icon: Icon2}).bindPopup(opcionesPopUp);
            markerList.push(marker2);
        }
        
        
    }
    markers.addLayers(markerList);
    console.log(markerList);
    map.addLayer(markers);

    //L.Control.geocoder().addTo(map);

});
////////////////////////////////////////////////////////////////////////////////////////
        $.get("callescerradas", function (data, status) {

            var marker;
            var greenIcon = L.icon({iconUrl: 'accesdenied.png',
                iconSize: [20, 20],
                iconAnchor: [22, 20],
                popupAnchor: [-3, -76]});

            for (i = 0; i < data.alerts.length; i++) {
                if (data.alerts[i].type == "ROAD_CLOSED") {
                    marker = L.marker([data.alerts[i].location.y, data.alerts[i].location.x], {icon: greenIcon}).addTo(mymap3).bindPopup("Soy un nuevo");
                } 
                //else
                //marker = L.marker([data.alerts[i].location.y, data.alerts[i].location.x]).addTo(mymap2).bindPopup("Soy un nuevo");
            }

        });

   

        $.get("callescerradas", function (data, status) {
            var polygon = L.polygon([
                [19.360512, -99.143214],
                [19.316003, -99.084884],
                [19.323093, -99.188257]
            ]).addTo(mymap4);
        });

        setTimeout(animate, 3000);
    }

    
    var reporte = null;
    var reportes = [];
        for( var i = 0; i < 10; i ++){
            $.get("/traffic", function (datas, status) { 
            reporte=datas.alerts.length;
            reportes.push(reporte);
            });

        }
        
        
        setTimeout( function(){
            console.log("::::SetArrrep[i]: " + reportes);
            var ctx = document.getElementById('myChart1').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',
                // The data for our dataset
                data: {
                    labels: ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],
                    datasets: [{
                        label: 'Insidencias por hora del día 2020-01-14',
                        backgroundColor: 'rgb(9, 59, 136)',
                        //borderColor: 'rgb(255, 99, 132)',
                        data: [reportes[0], reportes[1],reportes[2], reportes[3],reportes[4], 
                               reportes[5],reportes[6], reportes[7],reportes[8],reportes[9]]
                    }]
                },

                // Configuration options go here
                options: {}
            });
        }, 10000);
        
     ////////////////////////////////////////////////////////////////////////////////////////////////////   
     function incidenciasDelAnio(){
        var createDiv = "<div class='container text-center' >" 
                        + "<h3>Incidencias de la Ciudad de Mexico</h3>"
                        + "<canvas id='myChart'></canvas>"
                        + "<button onclick=eliminarElemento("+ this +")>Eliminar</button>"
                        + "</div>";
        $("nav").after(createDiv);
        var canvas = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(canvas, {
            // The type of chart we want to create
            type: 'bar',
            // The data for our dataset
            data: {
                labels: ["Febrero","Marzo","Abril","Mayo", "Junio"],
                datasets: [{
                    label: 'Numero de incidencias en el año 2019',
                    data: [892420,989092,755321,912970,922403],
                    backgroundColor: 'rgba(2,47,187)'
                  
                },
                {
                   
                    label: 'Numero de incidencias en el año 2020',
                    data: [1012349,586073,80753,80541,76972],
                    backgroundColor: 'rgba(235,5,82)'
                    
                }]
                
            },
            // Configuration options go here
            options: {
                elements:{
                    rectangle:{
                        borderWidth:1,
                        
                        //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
                        borderSkipped:'bottom'
                    }
                },
                responsive: true,
                title:{
                    display: true,
                    text:"Reporte de incidencias en los meses Febrero, Marzo, Abril Mayo y Junio"
                }
            }
        });

        var elemento = document.getElementById('myChart')
               
    }
    
    function eliminarElemento(elemento){
        $("#"+elemento).remove();
    }

    // $(document).ready(function(){
    //     incidenciasDelAnio();
    // });
 ////////////////////////////////////////////////////////////////////////////////////////////////////   
//  var canvas3 = document.getElementById('myChart3').getContext('2d');
//             var chart = new Chart(canvas3, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["ACCIDENT","POLICE","ROAD_CLOSE", "HAZARD","JAM", "CHIT-CHAT"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [33396,30055,17815,115535,685058, 10561],
//                         backgroundColor: 'rgba(2,47,187)'
                      
//                     },
//                     {
                       
//                         label: 'Año 2020',
//                         data: [37170,63057,36335,136932,729658,9197],
//                         backgroundColor: 'rgba(235,5,82)'
                        
//                     }]
                    
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
                            
//                             //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Febrero "
//                     }
//                 }
//             });
//             var canvas4 = document.getElementById('myChart4').getContext('2d');
//             var chart = new Chart(canvas4, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["ACCIDENT","POLICE","ROAD_CLOSE", "HAZARD","JAM", "CHIT-CHAT"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [37817,36027,24060,139131,739128, 12929],
//                         backgroundColor: 'rgba(2,47,187)'
                      
//                     },
//                     {
                       
//                         label: 'Año 2020',
//                         data: [23973,43402,18971,92704,400297,6726],
//                         backgroundColor: 'rgba(235,5,82)'
                        
//                     }]
                    
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
                            
//                             //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Marzo"
//                     }
//                 }
//             });
// var canvas5 = document.getElementById('myChart5').getContext('2d');
//             var chart = new Chart(canvas5, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["ACCIDENT","POLICE","ROAD_CLOSE", "HAZARD","JAM", "CHIT-CHAT"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [30147,34710,17646,113908,549297, 9613],
//                         backgroundColor: 'rgba(2,47,187)'
                      
//                     },
//                     {
                       
//                         label: 'Año 2020',
//                         data: [5432,11347,3246,28813,31336,579],
//                         backgroundColor: 'rgba(235,5,82)'
                        
//                     }]
                    
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
                            
//                             //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Abril"
//                     }
//                 }
//             });
// var canvas6 = document.getElementById('myChart6').getContext('2d');
//             var chart = new Chart(canvas6, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["ACCIDENT","POLICE","ROAD_CLOSE", "HAZARD","JAM", "CHIT-CHAT"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [33824,42110,19898,123796,682552, 10790],
//                         backgroundColor: 'rgba(2,47,187)'
                      
//                     },
//                     {
                       
//                         label: 'Año 2020',
//                         data: [5033,11274,3076,29397,31276,485],
//                         backgroundColor: 'rgba(235,5,82)'
                        
//                     }]
                    
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
                            
//                             //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Mayo"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas7 = document.getElementById('myChart7').getContext('2d');
//             var chart = new Chart(canvas7, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["ACCIDENT","POLICE","ROAD_CLOSE", "HAZARD","JAM", "CHIT-CHAT"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [34444,40814,22263,146832,666348, 11702],
//                         backgroundColor: 'rgba(2,47,187)'
                      
//                     },
//                     {
                       
//                         label: 'Año 2020',
//                         data: [3843,7131,4338,23281,37864,515],
//                         backgroundColor: 'rgba(235,5,82)'
                        
//                     }]
                    
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
                            
//                             //backgroundColor: ['rgb(0, 99, 132)','rgb(122, 44, 120)','rgb(241, 39, 116 )','rgb(227, 29, 29)'],
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Junio"
//                     }
//                 }
//             });

// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas8 = document.getElementById('myChart8').getContext('2d');
//             var chart = new Chart(canvas8, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["HAZARD_ON_ROAD_TRAFFIC_LIGHT_FAULT","HAZARD_ON_SHOULDER_ANIMALS ","HAZARD_WEATHER_FLOOD", "HAZARD_ON_ROAD_ROAD_KILL ", "HAZARD_ON_SHOULDER_MISSING_SIGN","HAZARD_ON_ROAD_POT_HOLE ","HAZARD_ON_ROAD_OBJECT","subtipo HAZARD_ON_ROAD_CONSTRUCTION","HAZARD_ON_ROAD_ICE","HAZARD_ON_SHOULDER_CAR_STOPPED ","HAZARD_ON_ROAD_CAR_STOPPED"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [1692,636,359,834,873, 25129,5039,18252,62,12892,45236],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [2339,1497,1177,1147,1698,28406,7385,25484,54,19355,43359],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Febrero"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas9 = document.getElementById('myChart9').getContext('2d');
//             var chart = new Chart(canvas9, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["HAZARD_ON_ROAD_TRAFFIC_LIGHT_FAULT","HAZARD_ON_SHOULDER_ANIMALS ","HAZARD_WEATHER_FLOOD", "HAZARD_ON_ROAD_ROAD_KILL ", "HAZARD_ON_SHOULDER_MISSING_SIGN","HAZARD_ON_ROAD_POT_HOLE ","HAZARD_ON_ROAD_OBJECT","subtipo HAZARD_ON_ROAD_CONSTRUCTION","HAZARD_ON_ROAD_ICE","HAZARD_ON_SHOULDER_CAR_STOPPED ","HAZARD_ON_ROAD_CAR_STOPPED"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [2309,898,861,1139,1019,32365,6208,19941,79,15584,53510],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [1528,965,1212,768,1074,17888,5394,16787,50,13783,29252],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Marzo"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas10 = document.getElementById('myChart10').getContext('2d');
//             var chart = new Chart(canvas10, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["HAZARD_ON_ROAD_TRAFFIC_LIGHT_FAULT","HAZARD_ON_SHOULDER_ANIMALS ","HAZARD_WEATHER_FLOOD", "HAZARD_ON_ROAD_ROAD_KILL ", "HAZARD_ON_SHOULDER_MISSING_SIGN","HAZARD_ON_ROAD_POT_HOLE ","HAZARD_ON_ROAD_OBJECT","subtipo HAZARD_ON_ROAD_CONSTRUCTION","HAZARD_ON_ROAD_ICE","HAZARD_ON_SHOULDER_CAR_STOPPED ","HAZARD_ON_ROAD_CAR_STOPPED"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [1527,688,387,863,872,26389,5573,16082,42,13670,43767],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [483,203,2069,188,310,5346,2301,6300,27,3135,6931],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Abril"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas11 = document.getElementById('myChart11').getContext('2d');
//             var chart = new Chart(canvas11, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["HAZARD_ON_ROAD_TRAFFIC_LIGHT_FAULT","HAZARD_ON_SHOULDER_ANIMALS ","HAZARD_WEATHER_FLOOD", "HAZARD_ON_ROAD_ROAD_KILL ", "HAZARD_ON_SHOULDER_MISSING_SIGN","HAZARD_ON_ROAD_POT_HOLE ","HAZARD_ON_ROAD_OBJECT","subtipo HAZARD_ON_ROAD_CONSTRUCTION","HAZARD_ON_ROAD_ICE","HAZARD_ON_SHOULDER_CAR_STOPPED ","HAZARD_ON_ROAD_CAR_STOPPED"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [2134,993,1916,1047,977,25342,6161,15725,93,15373,49000],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [409,215,2166,199,339,5980,2296,6855,14,3005,6471],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Mayo"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas12 = document.getElementById('myChart12').getContext('2d');
//             var chart = new Chart(canvas12, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels:["JAM_HEAVY_TRAFFIC", "JAM_MODERATE_TRAFFIC"," JAM_STAND_STILL_TRAFFIC"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [296372,78473,282104],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [314305,90927,299478],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Febrero"
//                     }
//                 }
//             });
// //////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas13 = document.getElementById('myChart13').getContext('2d');
//             var chart = new Chart(canvas13, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["JAM_HEAVY_TRAFFIC", "JAM_MODERATE_TRAFFIC"," JAM_STAND_STILL_TRAFFIC"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [320799,87916,300356],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [171958,56248,157732],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Marzo"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas14 = document.getElementById('myChart14').getContext('2d');
//             var chart = new Chart(canvas14, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["JAM_HEAVY_TRAFFIC", "JAM_MODERATE_TRAFFIC"," JAM_STAND_STILL_TRAFFIC"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [242576,72370,211828],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [12731,7837,8949],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Abril"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////            
// var canvas15 = document.getElementById('myChart15').getContext('2d');
//             var chart = new Chart(canvas15, {
//                 // The type of chart we want to create
//                 type: 'bar',
//                 // The data for our dataset
//                 data: {
//                     labels: ["JAM_HEAVY_TRAFFIC", "JAM_MODERATE_TRAFFIC"," JAM_STAND_STILL_TRAFFIC"],
//                     datasets: [{
//                         label: 'Año 2019',
//                         data: [302608,87470,265901],
//                         backgroundColor: 'rgba(2,47,187)'
//                     },
//                     {
//                         label: 'Año 2020',
//                         data: [12288,8168,8794],
//                         backgroundColor: 'rgba(235,5,82)' 
//                     }]
//                 },
//                 // Configuration options go here
//                 options: {
//                     elements:{
//                         rectangle:{
//                             borderWidth:1,
//                             borderSkipped:'bottom'
//                         }
//                     },
//                     responsive: true,
//                     title:{
//                         display: true,
//                         text:"Reporte de incidencias en el mes de Mayo"
//                     }
//                 }
//             });
// ///////////////////////////////////////////////////////////////////////////////////////////////////     
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// var canvas17 = document.getElementById('myChart17').getContext('2d');
// var myLineChart = new Chart(canvas17, {
//     type: 'line',
//     data: datos = {
//         labels: ["Febrero", "Marzo", "Abril", "Mayo", "Junio"],
//         datasets: [{
//             label: "Reportes de incidencias en el año 2019",
//             data: [892420,989092,755321,912970,922403]
//   }]
// },
//     options: {


//     }
// });
////////////////////////////////////////////////////////////////////////////////////////////////////               
    $.get("alcaldias", function(data, starus){
        L.geoJSON(data).addTo(mymap5);
    });    
    setTimeout(animate, 3000);




