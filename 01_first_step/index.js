window.addEventListener("DOMContentLoaded", init);

function init() {

    const width = 960;
    const height = 540;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas")
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        10000
    );
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.BoxGeometry(200, 200, 200);

    const material = new THREE.MeshStandardMaterial({
        color: 0x0000ff
    });

    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    const light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 2;
    light.position.set(1, 1, 1);

    scene.add(light);

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        // Boxの回転
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);
    }


    // renderer.render(scene, camera);
}