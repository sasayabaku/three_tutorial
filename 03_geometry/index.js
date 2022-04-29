window.addEventListener('DOMContentLoaded', init);

const width = 960;
const height = 540;

function init() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });

    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    // カメラ
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 500, +1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // コンテナ
    const container = new THREE.Object3D();
    scene.add(container);

    // マテリアル
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // ジオメトリを作成
    const geometryList = [
        new THREE.SphereGeometry(50),
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.PlaneGeometry(100, 0),
        new THREE.TetrahedronGeometry(100, 0),
        new THREE.ConeGeometry(50, 50, 100, 32),
        new THREE.CylinderGeometry(50, 50, 100, 32),
        new THREE.TorusGeometry(50, 30, 16, 100)
    ];

    geometryList.map((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, material);

        container.add(mesh);

        mesh.position.x = 400 * Math.sin((index / geometryList.length) * Math.PI * 2);
        mesh.position.z = 400 * Math.cos((index / geometryList.length) * Math.PI * 2);
    });

    tick();

    function tick() {
        container.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}