window.addEventListener('DOMContentLoaded', init);

function init() {
    const width = 960;
    const height = 540;
    let rot = 0;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);

    // パーティクル作成
    createStarField();

    function createStarField() {
        const vertices = [];

        const SIZE = 3000;
        const LENGTH = 1000;

        for (let i = 0; i < LENGTH; i++){
            const x = SIZE * (Math.random() - 0.5);
            const y = SIZE * (Math.random() - 0.5);
            const z = SIZE * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        // 形状データを作成
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            // 1つ1つのサイズ
            size: 10,
            //　色
            color: 0xffffff,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    tick();
    function tick() {
        rot += 1;

        // ラジアン変換
        const radian = (rot * Math.PI) / 180;
        // 角度に対するカメラの位置
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);
        // 原点方向にフォーカス
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}