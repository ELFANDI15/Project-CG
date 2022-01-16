import * as THREE from './three.js-master/build/three.module.js';
import { PointerLockControls } from './three.js-master/examples/jsm/controls/PointerLockControls.js'
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

let controls;
let keyboard = [];
let moveStraight ;
let moveBackward;
let moveRight;
let moveLeft;
var collidableMeshList = [];
var myObj = new THREE.Object3D();

function main(){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#9AEEFF');
    const renderer = createRenderer();
    const camera = createCamera();

    handleResize(renderer, camera);

    const wall = createWall(scene);
    const wall1 = createWall1(scene);
    const wall2 = createWall2(scene);
    const wall3 = createWall3(scene);
    const wall4 = createWall4(scene);
    const wall5 = createWall5(scene);
    const wall6 = createWall6(scene);
    const wall7 = createWall7(scene);
    const wall8 = createWall8(scene);
    const wall9 = createWall9(scene);
    const wall10 = createWall10(scene);
    const wall11 = createWall11(scene);
    const wall12 = createWall12(scene);
    const wall13 = createWall13(scene);
    const wall14 = createWall14(scene);
    const wall15 = createWall15(scene);
    const wall16 = createWall16(scene);
    const wall17 = createWall17(scene);
    const wall18 = createWall18(scene);
    const wall19 = createWall19(scene);
    const wall20 = createWall20(scene);
    const wall21 = createWall21(scene);
    const wall22 = createWall22(scene);
    const wall23 = createWall23(scene);
    const wall24 = createWall24(scene);
    const wall25 = createWall25(scene);
    const wall26 = createWall26(scene);
    const wall27 = createWall27(scene);
    const wall28 = createWall28(scene);
    const wall29 = createWall29(scene);
    const wall30 = createWall30(scene);
    const wall31 = createWall31(scene);
    const wall32 = createWall32(scene);
    const wall33 = createWall33(scene);

    const flashlight = falshlightModel('img/3d/lantern/candle_lantern/scene.gltf',scene);
    const skybox = createSkyBox(scene);
    const box1 = createBox1(scene);
    const box2 = createBox2(scene);
    const box3 = createBox3(scene);
    const box4 = createBox4(scene);
    const plane = createPlane(scene);
    const welcomeText = createText(scene);
    const endText = createText2(scene);
    const aLight = createAmbientLight();
    const sLight = createSpotlight(scene);
    scene.add(aLight);
    sLight.target = camera;
    camera.add(sLight);
    
    
    scene.add(camera);


    const animate = () => {
        moveStraight = true;
        moveBackward = true;
        moveRight = true;
        moveLeft = true;

        
        myObj.position.set( camera.position.x, camera.position.y, camera.position.z );
        myObj.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
        myObj.updateMatrix();
        myObj.translateZ( - 1.5 );
        myObj.translateY( - 1 );
        myObj.translateX( - 2 );

        box1.position.copy(camera.position);
        box2.position.copy(camera.position);
        box3.position.copy(camera.position);
        box4.position.copy(camera.position);

        box1.rotation.copy(camera.rotation);
        box2.rotation.copy(camera.rotation);
        box3.rotation.copy(camera.rotation);
        box4.rotation.copy(camera.rotation);


         box1.translateY(-1);
         box2.translateY(1);
         box3.translateX(1);
         box4.translateX(-1);


        //collider depan
    for (var vertexIndex = 0; vertexIndex < box1.geometry.attributes.position.array.length; vertexIndex++)
{       
    var localVertex = new THREE.Vector3().fromBufferAttribute(box1.geometry.attributes.position, 0).clone();
    var globalVertex = localVertex.applyMatrix4(box1.matrix);
    var directionVector = globalVertex.sub( box1.position );

    var ray = new THREE.Raycaster( box1.position, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance <= directionVector.length() ) 
    {
        moveStraight = false;
        console.log("hit");
        
    }
}
        //collider belakang
    for (var vertexIndex = 0; vertexIndex < box2.geometry.attributes.position.array.length; vertexIndex++)
{       
    var localVertex = new THREE.Vector3().fromBufferAttribute(box2.geometry.attributes.position, 0).clone();
    var globalVertex = localVertex.applyMatrix4(box2.matrix);
    var directionVector = globalVertex.sub( box2.position );

    var ray = new THREE.Raycaster( box2.position, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
    {
        moveBackward = false;
        console.log("back hit");
    }
}
        //collider kanan
    for (var vertexIndex = 0; vertexIndex < box3.geometry.attributes.position.array.length; vertexIndex++)
{       
    var localVertex = new THREE.Vector3().fromBufferAttribute(box3.geometry.attributes.position, 0).clone();
    var globalVertex = localVertex.applyMatrix4(box3.matrix);
    var directionVector = globalVertex.sub( box3.position );

    var ray = new THREE.Raycaster( box3.position, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
    {
        moveRight = false;
        console.log("right hit");
    }
}
        //collider kiri
    for (var vertexIndex = 0; vertexIndex < box3.geometry.attributes.position.array.length; vertexIndex++)
{       
    var localVertex = new THREE.Vector3().fromBufferAttribute(box4.geometry.attributes.position, 0).clone();
    var globalVertex = localVertex.applyMatrix4(box4.matrix);
    var directionVector = globalVertex.sub( box4.position );

    var ray = new THREE.Raycaster( box4.position, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
    {
        moveLeft = false;
        console.log("left hit");
    }
}
        renderer.render(scene, camera);
        defineKeyboard();
        requestAnimationFrame(animate);
    }

    animate();

    controls = new PointerLockControls( camera, document.body );
    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );
    
    instructions.addEventListener( 'click', function () {
    
        controls.lock();
    
    } );
    
    controls.addEventListener( 'lock', function () {
    
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    
    } );
    
    controls.addEventListener( 'unlock', function () {
    
        blocker.style.display = 'block';
        instructions.style.display = '';
    
    } );
    
    
    addEventListener('keydown', (e)=>{
        keyboard[e.key] = true;
    });
    
    addEventListener('keyup', (e)=>{
        keyboard[e.key] = false;
    });
    
    
    function defineKeyboard(){
        let speed = 0.05;
        if(keyboard['w'] && moveStraight == true){
            controls.moveForward(speed);
        }
        if(keyboard['s'] && moveBackward == true){
            controls.moveForward(-speed);
        }
        if(keyboard['a'] && moveLeft == true){
            controls.moveRight(-speed);
        }
        if(keyboard['d'] && moveRight == true){
            controls.moveRight(speed);
        }
    }
      
    
}

function handleResize  (renderer, camera)  {
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  };


function createCamera(){
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(14, 2, 8);
    
    return camera;
}

function createRenderer(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
}
//light
function createAmbientLight(){
    const aLight = new THREE.AmbientLight('#E8DC8B',0.1);

    return aLight;
}

function createSpotlight(scene) {
    const sLight = new THREE.SpotLight('#fff099', 3, 30, 0.2, 1);
    sLight.position.set(10,40, 5);
    sLight.castShadow = true;
    scene.add(sLight);
    let helper = new THREE.SpotLightHelper(sLight);
    scene.add(helper);
    sLight.position.y = 2;
    sLight.position.x = 10;
    sLight.position.z = 15;
    sLight.rotation.z = -1.3;
    sLight.rotation.x = 0;
    return sLight;
}
// object

//skybox
function createSkyBox(scene){
    let materials = [];

    let ft = new THREE.TextureLoader().load('img/skybox/kurt/space_ft.png');
    let bk = new THREE.TextureLoader().load('img/skybox/kurt/space_bk.png');
    let up = new THREE.TextureLoader().load('img/skybox/kurt/space_up.png');
    let dn = new THREE.TextureLoader().load('img/skybox/kurt/space_dn.png');
    let rt = new THREE.TextureLoader().load('img/skybox/kurt/space_rt.png');
    let lt = new THREE.TextureLoader().load('img/skybox/kurt/space_lf.png');

    materials.push(new THREE.MeshBasicMaterial({map: ft, color: 0x6B6A6A}));
    materials.push(new THREE.MeshBasicMaterial({map: bk, color: 0x6B6A6A}));
    materials.push(new THREE.MeshBasicMaterial({map: up, color: 0x6B6A6A}));
    materials.push(new THREE.MeshBasicMaterial({map: dn, color: 0x6B6A6A}));
    materials.push(new THREE.MeshBasicMaterial({map: rt, color: 0x6B6A6A}));
    materials.push(new THREE.MeshBasicMaterial({map: lt, color: 0x6B6A6A}));

    for(let i=0; i<6; i++){
        materials[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
    let skyboxMesh = new THREE.Mesh(skyboxGeo, materials);
    scene.add(skyboxMesh);
    return skyboxMesh; 
}

//plane / floor
const createPlane = (scene) =>{
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    var groundTexture = new THREE.TextureLoader().load( 'img/ground/04univ3.png' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 1000, 1000 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    const material = new THREE.MeshPhysicalMaterial({
        color: 'white',
        side: THREE.DoubleSide,
        wireframe: false,
        map: groundTexture,
       // normalMap: normal
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    
    scene.add(mesh);
    
    return mesh;
}

    const loader = new THREE.TextureLoader();
    const texture = loader.load('img/wall/brick_wall2-diff-1024-2.png');
    const normal = loader.load('img/wall/brick_wall2-nor-1024.png');
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 'white',
        side: THREE.DoubleSide,
        wireframe: false,
        map: texture,
        normalMap: normal,
        

    });
//wall
const createWall = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 38, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(-5, 2, -9);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall1 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 18, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(3.5, 2, 10.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall2 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 18, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(25, 2, 10.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall3 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 38, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(33.5, 2, -9);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall4 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 18, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(25, 2, -27.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall5 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 18, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(3.5, 2, -27.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}
//kecil lurus
const createWall6 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(1, 2, 8);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall7 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(12, 2, 8);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

//kecil samping
const createWall8 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(9.5, 2, 5.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall9 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
   
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(7, 2, 3);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall10 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(3.5, 2, 0.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}
//medium lurus
const createWall11 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(16.5, 2, 5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall12 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(22, 2, 8);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}
//medium samping
const createWall13 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(28, 2, -1);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall14 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(27, 2, 1.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall15 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(14, 2, -0.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall16 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(11.5, 2, -3);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall17 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(6, 2, -5.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall18 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(0.5, 2, -8);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall19 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 18, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(9, 2, -10.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall20 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(17.5, 2, -8);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall21 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(22.5, 2, -6.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall22 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(25, 2, -12);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall23 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(27.5, 2, -9.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall24 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(7, 2, -13);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall25 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(-2.5, 2, -15.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall26 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(17.5, 2, -15.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall27 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(31, 2, -15.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall28 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(1, 2, -18);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall29 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(3.5, 2, -20.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall30 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 12, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(12, 2, -22);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall31 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(23, 2, -18);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall32 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);

    mesh.position.set(20.5, 2, -20.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    
    
    return mesh;
}

const createWall33 = (scene) =>{
    const geometry = new THREE.BoxGeometry(1, 6, 3);
    const material = new THREE.MeshBasicMaterial({
        color: 'red'
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI/2);
    mesh.rotateX(Math.PI/2);
    

    mesh.position.set(14, 2, 11.5);
    scene.add(mesh);
    collidableMeshList.push(mesh);
    mesh.visible = false
    
    return mesh;
}

//text
const createText = (scene) => {
    const loader = new FontLoader();
  
    loader.load( './three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
  
      const geometry = new TextGeometry('Escape From This Place!!!', {
        font: font,
        size: 0.5,
        height: 0.3,
      });
      const material = new THREE.MeshLambertMaterial({color: '#FF0000'});
      const text = new THREE.Mesh(geometry, material);
      geometry.center();
  
      text.rotation.set(0,Math.PI ,0);
      text.position.set(15, 2, 14);
      scene.add(text);
  
    }); 
  
  }

  const createText2 = (scene) => {
    const loader = new FontLoader();
  
    loader.load( './three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
  
      const geometry = new TextGeometry('Congratulations!!!', {
        font: font,
        size: 0.5,
        height: 0.3,
      });
      const material = new THREE.MeshLambertMaterial({color: '#FF0000'});
      const text = new THREE.Mesh(geometry, material);
      geometry.center();
  
      text.rotation.set(0,Math.PI/9 ,0);
      text.position.set(14, 2, -31);
      scene.add(text);
  
    }); 
  
  }

//3d
function falshlightModel (path, scene){
    let loader = new GLTFLoader();
    let Model = null;
    loader.load(path, (object) => {
        myObj = object.scene;
        console.log("3D Model On Load");
        console.log(object);
        Model = object.scene;
        Model.position.set(13.4, 1.5, 7);
        Model.rotation.set(-Math.PI/2,0,0);
        Model.scale.set(0.003, 0.003 ,0.003);
        scene.add(object.scene);
    }, () => {
        console.log("3D Model On Progress")
    }, () => {
        console.log("3D Model Error")
    });


}

//player collider
const createBox1 = (scene) =>{
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshBasicMaterial({
        color: 'green',
        side: THREE.DoubleSide,
        wireframe: true,

    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.visible = true;
    
    scene.add(mesh);
    
    return mesh;
}

const createBox2 = (scene) =>{
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshBasicMaterial({
        color: 'green',
        side: THREE.DoubleSide,
        wireframe: true,

    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.visible = false;
    
    scene.add(mesh);
    
    return mesh;
}

const createBox3 = (scene) =>{
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshBasicMaterial({
        color: 'green',
        side: THREE.DoubleSide,
        wireframe: true,

    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.visible = true;
    
    scene.add(mesh);
    
    return mesh;
}

const createBox4 = (scene) =>{
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshBasicMaterial({
        color: 'green',
        side: THREE.DoubleSide,
        wireframe: true,

    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.visible = true;
    
    scene.add(mesh);
    
    return mesh;
}

// -----
main();
