var polygon;

function initialize() {

    var pointsarr = [];

    var map = new google.maps.Map(document.getElementById("map"),
    {
        zoom: 4,
        center: new google.maps.LatLng(22.7964, 79.8456),
        mapTypeId: google.maps.MapTypeId.HYBRID
    });

    var coords =
    [
        new google.maps.LatLng(-1.7096745161876172, -55.865444349059054), //Oriximiná
        new google.maps.LatLng(-8.773704, -58.442166), //Apuí
        new google.maps.LatLng(-7.121136623283787, -73.7983343133373), //Peru
        new google.maps.LatLng(2.1986278998173088, -67.46207066103257) //Columbia
    ];

    polygon = new google.maps.Polygon({
        paths: coords,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.26
    });

    polygon.setMap(map);

    var bounds = new google.maps.LatLngBounds();
    
    for (var i=0; i < polygon.getPath().getLength(); i++) {
        bounds.extend(polygon.getPath().getAt(i));
    }
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    for (var i = 0; i < 100; i++) {

       var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
       var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
       pointsarr.push([ptLat, ptLng]);
       console.log(pointsarr);
       var point = new google.maps.LatLng(ptLat,ptLng);

       if (google.maps.geometry.poly.containsLocation(point,polygon)) {
         var marker = new google.maps.Marker({position:point, map:map});
         var infowindow = new google.maps.InfoWindow({});
           google.maps.event.addListener(marker, "click", function(evt) {
               infowindow.setContent(marker.getPosition().toUrlValue(6));
               infowindow.open(map, marker);
           });
         break;
       }
    }

}

        google.maps.event.addDomListener(window, 'load', initialize);