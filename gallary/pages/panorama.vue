<template>
    <div id="container">
        <!-- <div id="dev_console">
            <div id="fov_console">
                
            </div>
        </div> -->
        <div id="myCanvas">
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        init1();
    }
}

var camera, scene, renderer;
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

var onPointerDownPointerX, onPointerDownPointerY, onPointerDownLat, onPointerDownLon

// var fov = 240;

function init1() {

    var container, mesh;

    container = document.getElementById('myCanvas');

    camera = new THREE.PerspectiveCamera(
        100, window.innerWidth / window.innerHeight, 1, 1100 
    );
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 500, 500, 500 );
    geometry.scale(-1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/view2.jpeg')
    })

    mesh = new THREE.Mesh(geometry, material);

    scene.add( mesh );


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Resize検知したら、WebGLのrendererのサイズを変更する
    window.addEventListener('resize', onWindowResize, false);



    animate();

}

function animate() {
    requestAnimationFrame(animate);
    update();
};

function update() {

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);

    renderer.render(scene, camera);
}

function onWindowResize() {

    /**
     * rendererのサイズを変更する
     */
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
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

    // 拡大・縮小の範囲を定義 (Fov : 45 ~ 110)
    if (event.deltaY > 0 && camera.fov < 110) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    } else if (event.deltaY <= 0 && camera.fov > 45) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    }
};

function onDocumentTouchStart( event ) {
    /**
     * cameraのlatitude / longitudeを、マウスの移動具合に応じて変更
     */
    event.preventDefault();

    isUserInteracting = true;

    console.log(event);

    onPointerDownPointerX = event.changedTouches[0].clientX;
    onPointerDownPointerY = event.changedTouches[0].clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
}

function onDocumentTouchMove( event ) {

    if (event.touches.length > 1) {
        event.preventDefault();
    }

    if (isUserInteracting === true) {
        lon = ( onPointerDownPointerX - event.changedTouches[0].clientX ) * 0.15 + onPointerDownLon;
        lat = ( event.changedTouches[0].clientY - onPointerDownPointerY ) * 0.15 + onPointerDownLat;
    };
};

</script>

<style>
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
}
</style>

<style scoped>
#container {
    /* canvas全体がずれないように、fixed指定 */
    position: fixed;
}

#myCanvas {
    position: relative;
    width: 100%;
    height: 100%;
}

#dev_console {
    width: 300px;
    height: 160px;
    padding: 0.5rem;
    background-color: #000000cc;

    color: white;

    position: absolute;
    top: 75%;
    left: 80%;
    z-index: 1;
}
</style>