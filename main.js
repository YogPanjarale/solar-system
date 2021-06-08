import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scence = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scence, camera);

//Lights 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scence.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scence.add(lightHelper, gridHelper);

//Background image
const spaceTexture = new THREE.TextureLoader().load("2k_stars_milky_way.jpg");
scence.background = spaceTexture;

//sun
const sunTexture = new THREE.TextureLoader().load('8k_sun.jpg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:sunTexture
  })
)

scence.add(sun)
const controls = new OrbitControls(camera, renderer.domElement);
console.log(controls.center)
function animate() {
	requestAnimationFrame(animate);
  controls.update()
	renderer.render(scence, camera);
}

animate();