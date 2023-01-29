import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);
// Torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pt=new THREE.PointLight(0xffffff)
pt.position.set(5,5,5)


const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(pt,ambientLight)

// Helpers
const lightHelper = new THREE.PointLightHelper(pt)
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper)

// Controls
const controls = new OrbitControls(camera, renderer.domElement);


function addstar(){
    const geometry=new THREE.SphereGeometry(0.17,20,20)
    const material=new THREE.MeshStandardMaterial({color:0xffffff})
    const star=new THREE.Mesh(geometry,material)

    const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z)
    scene.add(star)
}
Array(200).fill().forEach(addstar)

const spacebg= new THREE.TextureLoader().load("/space.jpg");
scene.background=spacebg


//texture
const ajnastexture=new THREE.TextureLoader().load('ajnas.jpg')
const ajnas=new THREE.Mesh(
    new THREE.BoxGeometry(4,4,4),
    new THREE.MeshBasicMaterial({map:ajnastexture})
)
scene.add(ajnas)
ajnas.position.z=7
//moon 
const moontexture= new THREE.TextureLoader().load('moon.jpg')
const normaltexture= new THREE.TextureLoader().load('normal.jpg')
const moon=new THREE.Mesh(
    new THREE.SphereGeometry(3,35,35),
    new THREE.MeshStandardMaterial({map:moontexture,
    normalMap:normaltexture})
)
scene.add(moon)

moon.position.z=30;
moon.position.setX(-10);

//earth 
const earthtexture= new THREE.TextureLoader().load('earth.jpg')

const earth=new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map:earthtexture,
    })
)
scene.add(earth)

earth.position.z=-30;
earth.position.setX(10);

function movecam(){ 
    const t = document.body.getBoundingClientRect().top;
    
 

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
 
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;
  ajnas.rotation.y += 0.01;
  ajnas.rotation.z += 0.01;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}
document.body.onscroll=movecam;
movecam();
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    controls.update();
    renderer.render(scene,camera);
}
animate()
