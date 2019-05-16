// Get the position of the mouse in world space.
const worldPositionAtMouse = map.getWorldPositionAt(event.pageX, event.pageY);
if (worldPositionAtMouse === null) {
    return;
}
