var scene = new THREE.Scene();
var canvasContainer = document.getElementById("canvasContainer");
var canvasWidth = canvasContainer.clientWidth
var canvasHeight = canvasContainer.clientHeight
var camera = new THREE.PerspectiveCamera( 45, canvasWidth/canvasHeight);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
canvasContainer.appendChild( renderer.domElement );

//debug cube
/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

scene.add(new THREE.AmbientLight( 0xffffff ))

camera.lookAt(0,0,0)
var cameraDistance = 25
camera.position.z = cameraDistance

var angle = 0
var animate = function () {

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  resizeRendererToDisplaySize(renderer);

	requestAnimationFrame( animate );

  if(document.getElementById("animate").checked){
    angle += 0.02
    camera.position.z = cameraDistance * Math.cos(angle)
    camera.position.x = cameraDistance * Math.sin(angle)
    camera.lookAt(0,0,0)   

	  renderer.render( scene, camera );
  }

};

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('models/scissors.gltf', 
function (gltf) {

  gltf.scene.scale.set(100,100,100)

  model = gltf.scene
  scene.add(model)

  //center model
  const box = new THREE.Box3().setFromObject( gltf.scene );
  const center = box.getCenter( new THREE.Vector3() );

  model.position.x += ( model.position.x - center.x );
  model.position.y += ( model.position.y - center.y );
  model.position.z += ( model.position.z - center.z );

  console.log("hi")
  animate();

},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {
    console.log(error)
    console.log( 'An error happened' );

})


//https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvasContainer.clientWidth;
  const height = canvasContainer.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    console.log("ee")
    renderer.setSize(width, height);
  }
  return needResize;
}