import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight);
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

loader.load('/bibi.glb', async (gltf) => {
    const model = gltf.scene;
    const mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[0];
    clip.resetDuration(5);
    mixer.clipAction(clip).play();

    const texture = await textureLoader.loadAsync('/bibi.png');

    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshPhongMaterial({ map: texture });
        }
    });

    scene.add(model);
    const clock = new THREE.Clock();

    function loop() {
        requestAnimationFrame(loop);
        model.rotation.y += 0.005;
        const dt = clock.getDelta();
        mixer.update(dt);


        renderer.render(scene, camera);
    }
    loop();
    renderer.render(scene, camera);

});


const light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
camera.position.set( 0, 1, 4 );

light.position.set( 0, 1, 4 );
scene.add(light);