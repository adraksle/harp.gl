// Center the camera on Manhattan, New York City.
map.setCameraGeolocationAndZoom(new GeoCoordinates(40.6935, -74.009), 16.9);

// Instantiate the default map controls, allowing the user to pan around freely.
const mapControls = new MapControls(map);
mapControls.maxPitchAngle = 50;
mapControls.setRotation(6.3, 50);
