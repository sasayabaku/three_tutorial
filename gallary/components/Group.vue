<template>
    <div id="container">
        <b-row class="text-center">
            <b-col cols="12">
                <div>Group</div>
            </b-col>
            <b-col cols="4">
                <canvas id="group_canvas1"></canvas>
                <h3>Group</h3>
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
        canvas: document.querySelector("#group_canvas1")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(-100, 150, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 地面を作成
    scene.add(new THREE.GridHelper(600));
    scene.add(new THREE.AxesHelper(300));

    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < 10; i++) {
        // 直方体の作成
        const material = new THREE.MeshNormalMaterial();
        const geometry = new THREE.SphereGeometry(30, 30, 30);
        const mesh = new THREE.Mesh(geometry, material);

        // 配置座標を計算
        const radian = (i / 10) * Math.PI * 2;
        mesh.position.set(
            200 * Math.cos(radian),
            30,
            200 * Math.sin(radian)
        );

        group.add(mesh);
    }


    tick();

    function tick() {

        group.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
</script>