// Resize the mapView to maximum.
map.resize(window.innerWidth, window.innerHeight);

// React on resize events.
window.addEventListener("resize", () => {
    map.resize(window.innerWidth, window.innerHeight);
});
