
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var geojson;

// d3.json(geoData, function(data) {
//     //console.log(data.features)
//     features = data.features
//     console.log(features)
//     //createFeatures(data.features)
//   var markers = L.markerClusterGroup();
//   for (var i = 0; i < features.length; i++) {
//     //var location = data.features[i].geometry;
//     console.log(features[i])
//   //   if (location) {
//   //     markers.addLayer(L.marker([location[0], location[1]]))
//   //   }
//   // }
//   //myMap.addLayer(markers);
// }
// });

d3.json(geoData, function(data) {
  createFeatures(data.features);
})
function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    // L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], 1000).addTo(map)
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  createMap(earthquakes)
}
function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  // Create a map object
});
  var overlayMap = {
    Earthquakes: earthquakes
  }
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
}
// Add a tile layer

