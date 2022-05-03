window.addEventListener('DOMContentLoaded', init);

var camera, scene, renderer;

var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

function init() {

    var container, mesh;

    container = document.getElementById( 'myCanvas' );

    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 1100 
    );
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );

    var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( './view.jpeg' )
    } );

    mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    requestAnimationFrame( animate );
    update();

}

function update() {

    if ( isUserInteracting === false ) {

        lon += 0.1;

    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    renderer.render( scene, camera );

}

