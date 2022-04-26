window.addEventListener('DOMContentLoaded', init);
window.addEventListener('DOMContentLoaded', init2);

function init(){
    const width = 960;
    const height = 540;

    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
    });
    renderer.setSize(width, height);

    // シーン
    const scene = new THREE.Scene();

    // カメラ作成
    const camera = new THREE.PerspectiveCamera(45, width / height);

    // カメラ初期座標を設定
    camera.position.set(0, 0, 1000);

    // カメラコントローラー生成
    const controls = new THREE.OrbitControls(camera, canvasElement);

    // 形状とマテリアルからメッシュを作成
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300), new THREE.MeshNormalMaterial());
    scene.add(mesh);

    tick();

    function tick() {
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

function init2() {
    const width = 960;
    const height = 540;

    const canvasElement = document.querySelector("#myCanvas2");
    
    // レンダラー作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement
    });
    renderer.setSize(width, height);

    // シーン作成
    const scene = new THREE.Scene();

    // カメラ作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);

    //カメラコントローラー
    const controls = new THREE.OrbitControls(camera, canvasElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // マテリアル作成
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("./earthmap1k.jpg"),
    });

    // 球体の形状を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);

    // 形状とマテリアルからメッシュを作成
    const earthMesh = new THREE.Mesh(geometry, material);
    
    // シーンにメッシュを追加
    scene.add(earthMesh);

    createStarField();

    function createStarField(){
        const vertices = [];

        for (let i = 0; i < 1000; i++) {
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        //マテリアル作成
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
        });

        // 物体作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    tick();

    function tick() {
        earthMesh.rotation.y += 0.0001;

        controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

}