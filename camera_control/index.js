window.addEventListener('DOMContentLoaded', init);

const width = 960;
const height = 540;

function init() {

    let rot = 0;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
    });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('./earthmap1k.jpg'),
        side: THREE.DoubleSide
    });

    const geometry = new THREE.SphereGeometry(300, 30, 30);

    const earthMesh = new THREE.Mesh(geometry, material);

    scene.add(earthMesh);

    createStarField();

    function createStarField() {
        const vertices = [];

        for (let i = 0; i < 1000; i++) {
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        // マテリアルの生成
        const material = new THREE.PointsMaterial({
            size: 10, 
            color: 0xffffff,
        });
        
        // 物体の生成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    tick();

    function tick() {
        // 0.5° / frame で加算されている
        rot += 0.5;

        //　ラジアン変換
        const radian = (rot * Math.PI) / 180;

        // 角度に応じてカメラ位置の設定
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);

        // 原点方向を見続ける
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    
}