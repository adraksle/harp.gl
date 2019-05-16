// Add a callback to execute before the items are rendered.
map.addEventListener(MapViewEventNames.Render, () => {
    // Set the cube position relative to the world center. Note, we don't subtract the
    // [[worldCenter]] from the worldMousePosition, because we need to keep the cubes
    // world position untouched.
    cube.position.copy(worldPositionAtMouse).sub(map.worldCenter);
});
