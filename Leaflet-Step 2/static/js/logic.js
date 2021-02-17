var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap)

var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(geoData, function(data) {
  console.log(data)
  data.features.forEach(function (response) {
    L.circle([response.geometry.coordinates[1], response.geometry.coordinates[0]], {
      color: "black",
      fillColor: colorDepth(response.geometry.coordinates[2]),
      fillOpacity: 0.8,
      weight: 0.5,
      radius: (response.properties.mag)*20000
    }).bindPopup(`Location: ${response.properties.place}<br>
                  Magnitude: ${response.properties.mag}<br>
                  Depth: ${response.geometry.coordinates[2]}<br>
                  Date: ${new Date(response.properties.time)}`).addTo(myMap)
  })
})
function colorDepth(depth) {
  if (depth <=10) {
    return "#00cc44"
  }
  else if (depth > 10 && depth <= 30) {
    return "#80ff00"
  }
  else if (depth > 30 && depth <= 50) {
    return "#ffe680"
  }
  else if (depth > 50 && depth <= 70) {
    return "#ffb366"
  }
  else if (depth > 70 && depth <= 90) {
    return "#ff704d"
  }
  else if (depth > 90) {
    return "#b32400"
  }
}
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += "<h4>Depth Legend</h4>";
  div.innerHTML += '<i style="background: #00cc44"></i><span>-10 - 10</span><br>';
  div.innerHTML += '<i style="background: #80ff00"></i><span>10 - 30</span><br>';
  div.innerHTML += '<i style="background: #ffe680"></i><span>30 - 50</span><br>';
  div.innerHTML += '<i style="background: #ffb366"></i><span>50 - 70</span><br>';
  div.innerHTML += '<i style="background: #ff704d"></i><span>70 - 90</span><br>';
  div.innerHTML += '<i style="background: #b32400"></i><span>90+</span><br>';
  
  return div;
};
legend.addTo(myMap)