<template>
    <div id="container">
        <b-row class="text-center">
            <b-col cols="12">
                <div>Three.js 影</div>
            </b-col>
            <b-col cols="4">
                <canvas id="shadow_canvas1"></canvas>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    mounted() {
        init1();
    }
};

function init1() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#shadow_canvas1")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // レンダラーのシャドウを有効にする
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 床の作成
    const meshFloor = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 0.1, 2000),
        new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
    );

    // 影の生成
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    // オブジェクトの生成
    const meshKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(3, 1, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    );
    meshKnot.position.set(0, 5, 0);

    // 影を落とす
    meshKnot.castShadow = true;
    scene.add(meshKnot);

    //照明を作成
    const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);

    // ライトによる影の有効化
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    tick();

    function tick() {
        renderer.render(scene, camera);

        const t = Date.now() / 500;
        const r = 20.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);

        requestAnimationFrame(tick);
    }
}
</script>