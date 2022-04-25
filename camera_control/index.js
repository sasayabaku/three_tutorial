window.addEventListener('DOMContentLoaded', init);
window.addEventListener('DOMContentLoaded', init2);

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

function init2() {
    let rot = 0;
    let mouseX = 0; // マウス座標

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas2'),
    });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // マテリアルを作成
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./earthmap1k.jpg'),
        side: THREE.DoubleSide
    });

    // 球体の形状生成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // メッシュ作成
    const earthMesh = new THREE.Mesh(geometry, material);
    // シーンにメッシュを追加
    scene.add(earthMesh);

    // 星屑の生成
    createStarField();

    function createStarField() {
        // 頂点情報を格納する配列
        const vertices = [];

        for (let i = 0; i < 1000; i++){
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
        });

        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }

    document.addEventListener('mousemove', (event) => {
        mouseX = event.pageX;
    })

    tick();

    function tick() {
        // マウスの位置に応じて角度を設定
        // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360°で換算する。
        const targetRot = (mouseX / window.innerWidth) * 360;

        // イージングの公式
        // 値 += (目標値 - 現在の値) * 減速値
        // これによって、動きが滑らかになる
        rot += (targetRot - rot) * 0.02;

        // ラジアン変換
        const radian = (rot * Math.PI) / 180;

        // 角度に応じたカメラの位置
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);

        // 原点方向を見続ける
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        earthMesh.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}