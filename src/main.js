import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'htmx.org'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


let pot; // This will hold the pot model once it's loaded

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set the background color to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000); 
// Set the camera to a higher position and adjust the angle for a top-down view
// Further adjust the camera to achieve a top-down view
camera.position.set(0, 40, 20); // Higher Y value and closer Z to look more downward
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure camera still points towards the center or the pot


/*
    Renderer Information
*/
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;



/*
    Geometry Set
*/
// const geometry = new THREE.TorusGeometry( 11,4,17,100 ); 
// const material = new THREE.MeshBasicMaterial( { color: 0x328751, wireframe:true } ); 
// const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

// scene.add(torus);


/*
    Load the 3D Model
*/
const loader = new GLTFLoader();
loader.load('src/resources/pot.glb', function(gltf) {
    pot = gltf.scene;
    pot.scale.set(50,50,50); // Keep the pot large
    pot.position.y = -10; // Lower the pot in the scene
    pot.rotation.x = -Math.PI / 6; // Slightly tilt the pot forward
        pot.traverse(function(child) {
        if (child.isMesh) {
            // Assuming the pot's original material is suitable for simple color changes
            child.material.color.setHex(0xF4A460); // Example: Set to a terracotta color
        }
    });
    scene.add(pot);
}, undefined, function(error) {
    console.error(error);
});







/*
    Lighting
*/
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);


// Ambient light for overall scene illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjust intensity as needed
scene.add(ambientLight);

// Directional light for depth and shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-5, 10, 5); // Adjust position to achieve desired shadow and highlight effect
directionalLight.castShadow = true;

// Optional: Adjust the shadow map size for better shadow quality
directionalLight.shadow.mapSize.width = 512; // Default is 512
directionalLight.shadow.mapSize.height = 512; // Default is 512

scene.add(directionalLight);




const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1; // Smooth out the control's movement
controls.rotateSpeed = 0.7;
controls.panSpeed = 0.5;
controls.zoomSpeed = 0.8;
controls.enablePan = false; // Depending on your preference
controls.minDistance = 10; // Closer in
controls.maxDistance = 100; // Further out

function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Only needed if using OrbitControls

    renderer.render(scene, camera);
}



animate();