window.addEventListener('DOMContentLoaded', init);

var camera, scene, renderer;

var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

var fov = 240;
// var wrapper = document.querySelector('.container');
var wrapper = document.createElement('div');
wrapper.style.width = '40px';
wrapper.style.height = '40px';
wrapper.style.backgroundColor = 'white';
var text = document.createTextNode("Orbital VSAT");
wrapper.appendChild(text);

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

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Resize検知したら、WebGLのrendererのサイズを変更する
    window.addEventListener('resize', onWindowResize, false);

    // 画像ファイルをアップロードしたら、その画像のパノラマに変更する。
    document.addEventListener('dragover', function ( event ) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false );

    document.addEventListener('dragenter', function ( event ) {
        document.body.style.opacity = 1;
    }, false);

    document.addEventListener('drop', function ( event ){
        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener('load', function ( event ) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false);

        reader.readAsDataURL( event.dataTransfer.files[0] );

        document.body.style.opacity = 1;

    }, false);

    // Div要素のレンダリングを行う
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;

    renderer2.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer2.domElement );

    let shap = new THREE.Group();
    var object = new THREE.CSS3DObject(wrapper);
    object.position.fromArray([30, 10, -100]);
    object.rotation.fromArray([0, 0, 0]);
    shap.add(object);

    scene.add(shap);

    // WebGLのDOMレンダリング
    animate();
}

function onWindowResize() {

    /**
     * rendererのサイズを変更する
     */
    
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

        lon += 0.01;

    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    renderer.render( scene, camera );
    renderer2.render( scene, camera );

}

/**
 * マウスイベント処理関数
 */

function onDocumentMouseDown( event ) {

    // preventDefaultで、既定のマウスクリック時の挙動を無効化
    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

};

function onDocumentMouseMove( event ) {

    /**
     * cameraのlatitude / longitudeを、マウスの移動具合に応じて変更
     */

    if (isUserInteracting === true) {
        lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
    };

};

function onDocumentMouseUp( event ) {
    // onDocumentMouseMoveを無効にする
    isUserInteracting = false;
};

function onDocumentMouseWheel( event ) {
    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();
};