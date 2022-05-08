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
            <b-col cols="4">
                <canvas id="group_canvas2"></canvas>
                <h3>World coordinate</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="group_canvas3"></canvas>
                <svg width="300" height="180" id="line_svg">
                    <g stroke="white">
                        <line id="svgLine" x1="0" y1="0" x2="0" y2="0" stroke-width="3" />
                    </g>
                </svg>
                <div id="hud"></div>
                <h3>Screen Corrdinate</h3>
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

function init2() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#group_canvas2")

    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラ
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(100, 150, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const plane2 = new THREE.GridHelper(600);
    scene.add(plane2);
    const plane = new THREE.AxesHelper(300);
    scene.add(plane);

    const group = new THREE.Group();
    scene.add(group);

    let targetMesh = new THREE.Mesh();

    for (let i = 0; i < 10; i++) {
        // 直方体作成
        const material = i == 0 ? new THREE.MeshNormalMaterial() : new THREE.MeshBasicMaterial();
        const geometry = new THREE.SphereGeometry(30, 30, 30);
        const mesh = new THREE.Mesh(geometry, material);
        const radian = (i / 10) * Math.PI * 2;
        mesh.position.set(200 * Math.cos(radian), 0, 200 * Math.sin(radian));
        group.add(mesh);

        if(i === 0) {
            targetMesh = mesh;
        }
    };

    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(50, 50, 0),
    ]);

    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
    scene.add(line);

    tick();

    function tick() {

        group.rotation.x += 0.02;
        group.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}

function init3() {
    const width = 300;
    const height = 180;
    let rot = 0;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#group_canvas3")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(100, 150, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 地面
    const plane2 = new THREE.GridHelper(600);
    scene.add(plane2);
    const plane = new THREE.AxesHelper(300);
    scene.add(plane);
    
    // 直方体
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.SphereGeometry(30, 30, 30);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();

    function tick() {
        rot += 0.5;
        const radian = (rot * Math.PI) / 100;

        mesh.position.x = 200 * Math.sin(radian);
        mesh.position.y = 50;
        mesh.position.z = 200 * Math.cos(radian);

        renderer.render(scene, camera);

        const worldPosition = mesh.getWorldPosition(new THREE.Vector3());

        // スクリーン座標
        const projection = worldPosition.project(camera);
        const sx = (width / 2) * (+projection.x + 1.0);
        const sy = (height / 2) * (-projection.y + 1.0);

        const tf = document.getElementById('hud');
        tf.innerHTML = `Screen Coordinate(${Math.round(sx)}, ${Math.round(sy)})`;
        tf.style.transform = `translate(${sx}px, ${sy}px)`;

        // SVGでら人を描画
        const line = document.getElementById('svgLine');
        line.setAttribute('x2', sx);
        line.setAttribute('y2', sy);

        requestAnimationFrame(tick);
    }

}

</script>
<style scoped>
#container {
    margin: 3rem;
}

#hud { 
    position: absolute;
    top: 0;
    left: 0;
    background: white;
}

#line_svg {
    position: absolute;
    top: 0;
    left: 0;
}
</style>