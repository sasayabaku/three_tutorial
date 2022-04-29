window.addEventListener('DOMContentLoaded', init);

function init() {
    const width = 960;
    const height =540;

    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンの作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0, 10, 10);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // FBX形式のモデルデータを読み込む
    // const loader = new THREE.FBXLoader();
    // loader.load('./jin.fbx', (object) => {
    //     scene.add(object);
    // });

    // glbファイルの読み込み
    const loader = new THREE.GLTFLoader();
    loader.load("./models/scene.gltf", (gltf) => {
        model = gltf.scene;
        model.traverse((object) => {
            if(object.isMesh) {
                object.material.transparent = true;
                object.material.opacity = 0.8;
                object.material.depthTest = true;
            }
        })
        scene.add(model);
    })

    tick();

    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}