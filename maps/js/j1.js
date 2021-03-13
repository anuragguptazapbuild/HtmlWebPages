var map;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initMap() {

  var india = {lat: parseInt(document.getElementById("userInput1").value), lng: parseInt(document.getElementById("userInput").value)};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: india,
    mapTypeId: 'roadmap'
  });
  var input = document.getElementById("userInput1").value;
  var input1 = document.getElementById("userInput").value;
  console.log(input);
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Accident Detected</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Accident occured ,</b> Need help immediately ' +
      'As Soon As Possible . '+
      'Click the link below to get the fastest route to the Accident '+
      'Site . '+
      'Also inform the concerned Department and thier Officials for Rescue . </p>'+
      '<p>Link to Google Maps: Rescue, <a href="https://www.google.com/maps/dir//'+input+','+input1+'/"> '+
      'https://www.google.com/maps</a> '+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    addMarker(event.latLng);
     infowindow.open(map, marker);

  });


  // Adds a marker at the center of the map.
  addMarker(india);



  var shape = {
    coords: [1,1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
      label: labels[labelIndex++ % labels.length],
    map: map,
    draggable: true,
     icon: 'img/1.png',
     shape: shape,
     title: 'Accident Detected Here'
  });
  markers.push(marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
}



// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// Deletes all markers in the array by removing references to them.