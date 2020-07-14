
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
        // $.get("/traffic", function (data, status) {

        //     for (i = 0; i < data.jams.length; i++) {
        //         for (j = 1; j < (data.jams[i].line.length - 1); j++) {

        //             pointA = new L.LatLng(data.jams[i].line[j].y, data.jams[i].line[j].x);
        //             pointB = new L.LatLng(data.jams[i].line[j + 1].y, data.jams[i].line[j + 1].x);
        //             pointList = [pointA, pointB];

        //             if (data.jams[i].speed < 5) {
        //                 firstpolyline = new L.Polyline(pointList, {
        //                     color: 'red',
        //                     weight: 6,
        //                     opacity: 0.5,
        //                     smoothFactor: 1
        //                 });
        //             } else {
        //                 firstpolyline = new L.Polyline(pointList, {
        //                     color: 'orange',
        //                     weight: 6,
        //                     opacity: 0.5,
        //                     smoothFactor: 1
        //                 });
        //             }
        //             firstpolyline.addTo(mymap);



        //         }
        //     }

        // });

        
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
    
        
        // $.get("callescerradas", function (data, status) {

        //     var marker;
        //     var marker2;
        //     var Icon1 = L.icon({iconUrl: 'accesdenied.png',
        //         iconSize: [20, 20],
        //         iconAnchor: [22, 20],
        //         popupAnchor: [-3, -76]});
        //     var Icon2 = L.icon({iconUrl: 'construction.png',
        //         iconSize: [20, 20],
        //         iconAnchor: [22, 20],
        //         popupAnchor: [-3, -76]});

        //     for (i = 0; i < data.jams.length; i++) {

                
        //         const opcionesPopUp = L.popup() //Funcion de leaflet
        //             .setContent(`<p><b>Alcaldia:</b> ${data.jams[i].city}</p>
        //             <p> <b>Calle:</b>  ${data.jams[i].street}</p>
        //             `)

        //         if (data.jams[i].blockType == "ROAD_CLOSED_EVENT") {
                    
        //             marker = L.marker([data.jams[i].line[0].y, data.jams[i].line[0].x], {icon: Icon1}).addTo(mymap2).bindPopup(opcionesPopUp);
        //             //marker = L.marker([data.alerts[i].location.y, data.alerts[i].location.x], {icon: greenIcon}).addTo(mymap3).bindPopup("Soy un nuevo");
        //         }
        //         else if(data.jams[i].blockType == "ROAD_CLOSED_CONSTRUCTION") {
        //             marker2 = L.marker([data.jams[i].line[0].y, data.jams[i].line[0].x], {icon: Icon2}).addTo(mymap2).bindPopup(opcionesPopUp);
        //         }
        //     }

        // });
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
        $.get("alcaldias", function(data, starus){
            L.geoJSON(data).addTo(mymap5);
        });    
        setTimeout(animate, 3000);   
        
        