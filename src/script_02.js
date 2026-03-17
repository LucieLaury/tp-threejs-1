import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load('mario.glb', (gltf) => {
    const model = gltf.scene;

    // On remplace le matériau de chaque sous-mesh par le nôtre
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshPhongMaterial({ map: texture });
        }
    });

    // À vous de jouer ici...
});