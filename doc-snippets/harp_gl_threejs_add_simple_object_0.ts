const scale = 100;
const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00fe
});
function createPinkCube(): THREE.Mesh {
    const mesh = new THREE.Mesh(geometry, material);
    // Make sure the cube overlaps everything else, is completely arbitrary.
    mesh.renderOrder = Number.MAX_SAFE_INTEGER;
    return mesh;
}
