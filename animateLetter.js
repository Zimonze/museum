var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var canvas = document.querySelector('#canvas')
var renderer = new THREE.WebGLRenderer({canvas});
document.body.appendChild( renderer.domElement );

function start(letter) {
  load(letter);
  animateLetter(true);
}

function load(letter) {
  var loader = new THREE.FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', function (res) {
    font = res;
    createText(letter);
  });
}

function createText(text) {
  textGeo = new THREE.TextGeometry( text, {
    font: font,
    size: 70,
    height: 10,
  });
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();

  var material = new THREE.MeshPhongMaterial({
    color: 0xff0000,    // (can also use a CSS color string here)
  });
  var text = new THREE.Mesh(textGeo, material)
  text.position.x = -textGeo.boundingBox.max.x/2;
  text.position.y = -textGeo.boundingBox.max.y/2;
  text.position.z = -textGeo.boundingBox.max.z/2;
  text.castShadow = true;
  scene.add(text);
}

var light = new THREE.PointLight( 0x444444, 4 );
camera.add(light);
scene.add(camera);
var rotation = 3.14/2;

function spinCamera(){
  rotation += 0.005
  camera.position.z = Math.sin(rotation) * 80;
  camera.position.x = Math.cos(rotation) * 80;
  camera.lookAt(scene.position)
}

//https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

var id;
var spin = true;
function animateLetter() {

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  requestAnimationFrame( animateLetter );
  camera.position.z = Math.sin(rotation) * 80;
  camera.position.x = Math.cos(rotation) * 80;
  camera.lookAt(scene.position)
  if (spin == true) {
    spinCamera();
  }
  renderer.render( scene, camera );
}