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

var camera, scene, renderer, renderer2;
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, lat = 0, 
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

    var geometry = new THREE.SphereGeometry( 800, 500, 500 );
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

    // CSS3DObject
    const element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0, 127, 127,' + (Math.random() * 0.5 * 0.25) + ')';

    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = (( 2 / 5 ) + 1) * 10;
    element.appendChild( number );

    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = "Be";
    element.appendChild(symbol);

    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = "Beryllium" + '<br>' + "9.012182";
    element.appendChild(details);

    const objectCSS = new THREE.CSS3DObject( element );

    objectCSS.position.x = 45;
    objectCSS.position.y = 0;
    objectCSS.position.z = -200;

    scene.add( objectCSS );

    // CSS3DObject2
    const element2 = document.createElement('div');
    element2.className = 'element';
    element2.id = 'element2';
    element2.style.backgroundColor = 'rgba(255, 209, 82,' + (Math.random() * 0.5 * 0.25) + ')';

    const number2 = document.createElement('div');
    number2.className = 'number';
    number2.textContent = 88;
    element2.appendChild( number2 );

    const symbol2 = document.createElement('div');
    symbol2.className = 'symbol';
    symbol2.textContent = "Ra";
    element2.appendChild(symbol2);

    const details2 = document.createElement('div');
    details2.className = 'details';
    details.id = 'details2';
    details2.innerHTML = "Radium" + '<br>' + "226.0";
    element2.appendChild(details2);

    const objectCSS2 = new THREE.CSS3DObject( element2 );

    objectCSS2.position.x = 400;
    objectCSS2.position.y = 0;
    objectCSS2.position.z = -200;
    objectCSS2.rotation.y = -Math.PI / 2;

    scene.add( objectCSS2 );


    renderer2 = new THREE.CSS3DRenderer();
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;

    renderer2.setSize( window.innerWidth, window.innerHeight );
    container.appendChild(renderer2.domElement );

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Resize検知したら、WebGLのrendererのサイズを変更する
    window.addEventListener('resize', onWindowResize, false);

    // 画像ファイルをアップロードしたら、その画像のパノラマに変更する
    document.addEventListener('dragover', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false);

    document.addEventListener('dragenter', function (event) {
        document.body.style.opacity = 1;
    }, false);

    document.addEventListener('drop', function (event) {
        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false);

        reader.readAsDataURL( event.dataTransfer.files[0] );

        document.body.style.opacity = 1;
    }, false);

    animate();

}

/* 各関数 */

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
    renderer2.render(scene, camera);
}

function onWindowResize() {

    /**
     * rendererのサイズを変更する
    **/
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown( event ) {

    /**
     * マウス押下時、カメラ座標を変更
    **/

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
    **/

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

    // 拡大・縮小の範囲を定義 (Fov : 60 ~ 130)
    if (event.deltaY > 0 && camera.fov < 130) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    } else if (event.deltaY <= 0 && camera.fov > 60) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    }
};

function onDocumentTouchStart( event ) {
    /**
     * cameraのlatitude / longitudeを、マウスの移動具合に応じて変更
     */
    // event.preventDefault();

    isUserInteracting = true;

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


.element {
    width: 100px;
    height: 160px;
    box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
    border: 1px solid rgba(127,255,255,0.25);
    font-family: Helvetica, sans-serif;
    text-align: center;
    line-height: normal;
    cursor: default;
    z-index: 100;
}

.element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
}

.element .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 50px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
}

.element:hover {
    box-shadow: 0px 0px 30px rgba(0, 255, 255, 0.875);
}



.element:hover .details {
    color: rgba(127, 255, 255, 0.95);
}

#element2 {
    box-shadow: 0px 0px 12px rgba(255,209,82,0.5);
}

#element2 .number {
    color: rgba(255,209,82,0.75);
}

#element2 .symbol {
    text-shadow: 0 0 10px rgba(255,209,82,0.95);
}

#element2 .details {
    color: rgba(255,209,82,0.75);
}

#element2:hover {
    box-shadow: 0px 0px 30px rgba(255,209,82,0.875);
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