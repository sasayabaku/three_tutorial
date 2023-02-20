window.addEventListener('DOMContentLoaded', init);

var camera, scene, renderer, renderer2;

var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

var fov = 240;

// 埋め込み用コンポーネントの生成
var wrapper = document.createElement('div');
wrapper.style.width = '100px';
wrapper.style.height = '40px';
wrapper.style.backgroundColor = 'white';
var p1 = document.createElement('p');
p1.style.fontSize = '6px';
var text1 = document.createTextNode("This Wallpaper ");
var text2 = document.createTextNode("https://pixexid.com/");
p1.appendChild(text1);
p1.appendChild(text2);
wrapper.appendChild(p1);


// 埋め込み用コンポーネントの生成②
var wrapper2 = document.createElement('div');
wrapper2.style.width = '80px';
wrapper2.style.height = '40px';
var iframe = document.createElement('iframe');
iframe.style.width = '240px';
iframe.style.height = '120px';
iframe.style.border = '0px';

iframe.src = 'https://my-room-in-3d.vercel.app';
wrapper2.appendChild(iframe);

function init() {

    var container, mesh;

    container = document.getElementById( 'myCanvas' );

    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 1100 
    );
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 100, 100, 100 );
    geometry.scale( - 1, 1, 1 );

    var texture = new THREE.TextureLoader().load('./Panorama2.png');

    var material = new THREE.MeshBasicMaterial( {
        map: texture
    } );

    mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // Event Listener 読み込み
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
            reload(event.target.result);
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
    object.position.fromArray([0, 10, -200]);
    object.rotation.fromArray([0, 0, 0]);
    shap.add(object);

    let shap2 = new THREE.Group();
    var object2 = new THREE.CSS3DObject(wrapper2);
    object2.position.fromArray([200, 10, -300]);
    object2.rotation.fromArray([0, -(Math.PI/4), 0]);
    shap2.add(object2);

    scene.add(shap);
    scene.add(shap2);

    // WebGLのDOMレンダリング
    animate();
}

function reload(imgsrc) {

    camera, scene, renderer, renderer2 = null;

    var container, mesh;

    container = document.getElementById( 'myCanvas' );
    
    // 今あるcanvasを削除
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };

    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 1100 
    );
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 100, 100, 100 );
    geometry.scale( - 1, 1, 1 );

    var texture = new THREE.TextureLoader().load(imgsrc);

    var material = new THREE.MeshBasicMaterial( {
        map: texture
    } );

    mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // Event Listener 読み込み
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
    object.position.fromArray([0, 10, -200]);
    object.rotation.fromArray([0, 0, 0]);
    shap.add(object);

    let shap2 = new THREE.Group();
    var object2 = new THREE.CSS3DObject(wrapper2);
    object2.position.fromArray([200, 10, -300]);
    object2.rotation.fromArray([0, -(Math.PI/4), 0]);
    shap2.add(object2);

    scene.add(shap);
    scene.add(shap2);

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

    // 視点の自動回転を防ぐ
    // if ( isUserInteracting === false ) {
    //     lon += 0.005;
    // }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    renderer.render( scene, camera );
    // renderer2.render( scene, camera );

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