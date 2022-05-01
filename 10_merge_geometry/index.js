window.addEventListener('DOMContentLoaded', init);

function init() {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 400);

    // 1辺あたりに配置するオブジェクトの個数
    const CELL_NUM = 25;

    // 結合用のジオメトリを格納する配列
    const boxes = [];
    for (let i = 0; i < CELL_NUM; i++) {
        for (let j = 0; j < CELL_NUM; j++) {
            for (let k = 0; k < CELL_NUM; k++) {
                // 立方体個別の要素を作成
                const geometryBox = new THREE.BoxGeometry(5, 5, 5);

                // 座標調整
                const geometryTranslated = geometryBox.translate(
                    10 * (i - CELL_NUM / 2),
                    10 * (j - CELL_NUM / 2),
                    10 * (k - CELL_NUM / 2)
                );

                // ジオメトリを保存
                boxes.push(geometryTranslated);
            }
        }
    }

    // ジオメトリを生成
    const geometry = THREE.BufferGeometryUtils.mergeBufferGeometries(boxes);

    // マテリアルを作成
    const material = new THREE.MeshNormalMaterial();

    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // フレームレートの数値を画面に表示
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '200px';
    document.body.appendChild(stats.domElement);

    tick();

    function tick() {
        mesh.rotation.x += Math.PI / 180;
        mesh.rotation.y += Math.PI / 180;

        // レンダリング
        renderer.render(scene, camera);

        // レンダリング情報を画面に表示
        document.getElementById('info').innerHTML = JSON.stringify(renderer.info.render, '', '   ');

        // フレームレートを表示
        stats.update();

        requestAnimationFrame(tick);
    }
}

function not_good() {
    const width = 960;
    const height = 540;

    const CELL_NUM = 20;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 400);

    const container = new THREE.Group();
    scene.add(container);

    // 共通マテリアル
    const material =  new THREE.MeshNormalMaterial();

    // Box
    for (let i = 0; i < CELL_NUM; i++) {
        for (let j = 0; j < CELL_NUM; j++) {
            for (let k = 0; k < CELL_NUM; k++) {
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);

                // 3次元座標の指定
                mesh.position.set(
                    10 * (i - CELL_NUM / 2), 
                    10 * (j - CELL_NUM / 2), 
                    10 * (k - CELL_NUM / 2)
                );

                // メッシュを3D空間に追加
                container.add(mesh);
            }
        }
    }

    // フレームレートの数値を画面に表示
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '200px';
    document.body.appendChild(stats.domElement);

    tick();

    function tick() {
        // 毎フレーム時に実行されるループイベント
        container.rotation.x += Math.PI / 180;
        container.rotation.y += Math.PI / 180;

        // レンダリング 
        renderer.render(scene, camera);

        // レンダリング情報を画面に表示
        document.getElementById('info').innerHTML = JSON.stringify(renderer.info.render, '', '   ');

        // フレームレートの表示
        stats.update();

        requestAnimationFrame(tick);
    }
}