<template>
    <div id="container">
        <b-row class="text-center">
            <b-col cols="12">
                <div>Three.js カメラ</div>
                <br />
            </b-col>
            <b-col cols="4">
                <canvas id="camera_canvas1"></canvas>
                <h3>basic material</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="camera_canvas2"></canvas>
                <h3>Orthographic Camera</h3>
            </b-col>            
        </b-row>
        <br />
        <b-row class="text-center">
            <b-col cols="12">
                <div>Fog効果</div>
                <br />
            </b-col>
            <b-col cols="4">
                <canvas id="fog_canvas1"></canvas>
                <h3>Fog Effects</h3>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col cols="12">
                <div>Sprite効果</div>
                <br />
            </b-col>
            <b-col cols="4">
                <canvas id="sprite_canvas1"></canvas>
                <h3>Fog Effects</h3>
            </b-col>
        </b-row>
    </div>    
</template>
<script>
export default {
    mounted() {
        init1();
        init2();
        init3();
        init4();
    }
}

function init1() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#camera_canvas1'),
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // レンダラーでの影の有効化
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000);
    camera.fov = 90;

    // 光源の生成
    {
        const spotLight = new THREE.SpotLight(0xffffff, 4, 2000, Math.PI / 5, 0.2, 1.5);
        spotLight.position.set(500, 500, 500);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        scene.add(spotLight);
    }

    // 床のテクスチャ
    {
        const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/ics-creative/tutorial-three/master/samples/imgs/floor.png');
        // リピート可能にする
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        texture.magFilter = THREE.NearestFilter;

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.0,
                metalness: 0.6
            })
        );

        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
    }

    // マス目の設定
    {
        // 立方体のマテリアル・ジオメトリの設定
        const material = new THREE.MeshStandardMaterial({
            color: 0x22dd22,
            roughness: 0.1,
            metalness: 0.2
        });
        const geometry = new THREE.BoxGeometry(45, 45, 45);

        // 立方体を複数作成し、ランダムに配置
        for (let i = 0; i< 60; i++) {
            const box = new THREE.Mesh(geometry, material);
            box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
            box.position.y = 25;
            box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;

            // 影の設定
            box.receiveShadow = true;
            box.castShadow = true;
            scene.add(box);
        }
    }

    tick();

    function tick() {
        camera.position.x = 500 * Math.sin(Date.now() / 2000);
        camera.position.y = 250;
        camera.position.z = 500 * Math.cos(Date.now() / 2000);

        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0,0,0));

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

function init2() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#camera_canvas2"),
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // レンダラー側で影を有効に
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-480, 480, 270, -270, 1, 1000);

    // 光源を作成
    {
        const spotLight = new THREE.SpotLight(0xffffff, 4, 2000, Math.PI / 5, 0.2, 1.5);
        spotLight.position.set(500, 300, 500);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        scene.add(spotLight);
    }

    // 地面の作成
    {
        // 床
        const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/ics-creative/tutorial-three/master/samples/imgs/floor.png');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        texture.magFilter = THREE.NearestFilter;

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.0,
                metalness: 0.8
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
    }

    // マス目を作成
    {
        // 立方体のマテリアルとジオメトリを作成
        const material = new THREE.MeshStandardMaterial({
            color: 0x2299ff,
            roughness: 0.1,
            metalness: 0.2
        });
        const geometry = new THREE.BoxGeometry(45, 45, 45);

        // 立方体を複数作成しランダムに配置
        for (let i=0; i < 60; i++) {
            const box = new THREE.Mesh(geometry, material);
            box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
            box.position.y = 25;
            box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;

            // 影の設定
            box.receiveShadow = true;
            box.castShadow = true;
            scene.add(box);
        }
    }

    tick();

    function tick() {

        camera.position.x = 500 * Math.sin(Date.now() / 2000);
        camera.position.y = 250;
        camera.position.z = 500 * Math.cos(Date.now() / 2000);

        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

function init3() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#fog_canvas1"),
        antialias: true,
        devicePixelRatio: window.devicePixelRatio,
    });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x000000, 50, 2000);

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial();

    for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 2000;
        mesh.position.y = (Math.random() - 0.5) * 2000;
        mesh.position.z = (Math.random() - 0.5) * 2000;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;

        group.add(mesh);
    }

    scene.add(new THREE.DirectionalLight(0xff0000, 2)); // 平行光源
    scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

    tick();

    function tick() {
        group.rotateY(0.01);
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

function init4() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#sprite_canvas1"),
        antialias: true,
        devicePixelRatio: window.devicePixelRatio,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xf9f9f9, 1.0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf9f9f9, 100, 300);

    const camera = new THREE.PerspectiveCamera(45, width / height);

    // マテリアル
    const material = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(
            "https://raw.githubusercontent.com/ics-creative/tutorial-three/master/samples/imgs/star.png"
        ),
    });
    material.fog = true;

    for (let i = 0; i < 500; i++) {
        const sprite = new THREE.Sprite(material);

        sprite.position.x = 300 * (Math.random() - 0.5);
        sprite.position.y = 100 * Math.random() - 40;
        sprite.position.z = 300 * (Math.random() - 0.5);

        // 必要に応じてスケールの調整
        sprite.scale.set(10, 10, 10);

        scene.add(sprite);
    }

    const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
    plane.position.y = -40;
    scene.add(plane);

    tick();

    function tick() {

        camera.position.x = 100 * Math.sin(Date.now() / 2000);
        camera.position.z = 100 * Math.cos(Date.now() / 2000);
        camera.position.y = 50 * Math.sin(Date.now() / 1000) + 60;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

</script>