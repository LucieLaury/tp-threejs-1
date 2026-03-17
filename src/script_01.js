import * as THREE from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight);
camera.position.z = 2;
const canvas = document.querySelector("canvas");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(innerWidth, innerHeight);
renderer.render(scene, camera);

function loop() {
    requestAnimationFrame(loop);
    cube.rotation.y += 0.005;
    cube.rotation.x += 0.005;
    renderer.render(scene, camera);
}
loop();

// etape après
cube.material = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 50 });

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.copy(camera.position);
scene.add(light);

/*
MeshPhongMaterial utilise un fragment shader qui calcule la couleur finale du pixel en fonction de la lumière reçue.
Sans lumière dans la scène, aucune illumination n'est calculée, donc la couleur résultante est noire.
*/

const textureLoader = new THREE.TextureLoader();
textureLoader.load("diamond.jpg", function (texture) {
    cube.material.map = texture;
    cube.material.needsUpdate = true;
});