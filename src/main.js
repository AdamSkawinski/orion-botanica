import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'htmx.org'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set the background color to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000); 

/*
    Renderer Information
*/
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

/*
    Geometry Set
*/
const geometry = new THREE.TorusGeometry( 11,4,17,100 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x328751, wireframe:true } ); 
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

scene.add(torus);


/*
    Lighting
*/
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

    /*
        Animation Helpers
    
    */
        // const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom functionality


    /*
        Many Random Objects
    */
        // function addStar() {
//     const geometry = new THREE.SphereGeometry(.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
//     const star = new THREE.Mesh( geometry, material);

//     const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
//     star.position.set(x,y,z);
//     scene.add(star)
// }

// Array(200).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load('src/resources/space.jpg');
// scene.background = spaceTexture;


function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += .01;
    torus.rotation.y += .005;
    torus.rotation.z += .01;

    controls.update();
    
    renderer.render(scene, camera);

}

animate();