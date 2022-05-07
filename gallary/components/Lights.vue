<template>
    <div id="container">
        <b-row class="text-center">
            <b-col cols="12">
                <div>Three.jsでのマテリアルの種類</div>
                <br />
            </b-col>            
            <b-col cols="4">
                <canvas id="lights_canvas1"></canvas>
                <h3>環境光源</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="lights_canvas2"></canvas>
                <h3>平行光源</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="lights_canvas3"></canvas>
                <h3>半球光源</h3>
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
    }    
};

function init1() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas1'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 床を作成
    const meshFloor = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
    );
    scene.add(meshFloor);

    // オブジェクトを作成
    const meshKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    );
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);

    // 環境光源を作成
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);

    tick();

    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}

function init2() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas2'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 床を作成
    const meshFloor = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
    );
    scene.add(meshFloor);

    // オブジェクトを作成
    const meshKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    );
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);

    // 環境光源を作成
    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    const lightHelper = new THREE.DirectionalLightHelper(light);
    scene.add(lightHelper);

    tick();

    function tick() {
        renderer.render(scene, camera);

        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        lightHelper.update();

        requestAnimationFrame(tick);
    }

}

function init3() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas3'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 床を作成
    const meshFloor = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
    );
    scene.add(meshFloor);

    // オブジェクトを作成
    const meshKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    );
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);

    // 半球光源の作成
    // new THREE.HemisphereLight(空の色, 地の色, 光の強さ)
    const light = new THREE.HemisphereLight(0x888888, 0x0000ff, 1.0);
    scene.add(light);

    // 照明を可視化するヘルパー
    const lightHelper = new THREE.HemisphereLightHelper(light);
    scene.add(lightHelper);

    tick();

    function tick() {
        renderer.render(scene, camera);

        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        lightHelper.update();

        requestAnimationFrame(tick);
    }

}
</script>
<style scoped>

</style>