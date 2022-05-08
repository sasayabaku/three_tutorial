<template>
    <div id="container">
        <b-row class="text-center">
            <b-col cols="12">
                <div>Three.jsでのマテリアルの種類</div>
                <br />
            </b-col>
            <b-col cols="4">
                <canvas id="canvas1"></canvas>
                <h3>basic material</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="canvas2"></canvas>
                <h3>MeshNormalMaterial</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="canvas3"></canvas>
                <h3>MeshLambertMaterial</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="canvas4"></canvas>
                <h3>MeshPhongMaterial</h3>
            </b-col>     
            <b-col cols="4">
                <canvas id="canvas5"></canvas>
                <h3>MeshToonMaterial</h3>
            </b-col>                        
            <b-col cols="4">
                <canvas id="canvas6"></canvas>
                <h3>MeshStandardMaterial</h3>
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
        init5();
        init6();
    }
}

function init1() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas1'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);

    const material = new THREE.MeshBasicMaterial({ color: 0x6699ff });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    tick();

    function tick() {

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
};

function init2() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas2'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    tick();

    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

};

function init3() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas3'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshLambertMaterial({color: 0x6699FF});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    tick();

    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // ライトを周回
        pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500)
        );

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}

function init4() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas4'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshPhongMaterial({color: 0x6699FF});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    tick();

    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // ライトを周回
        pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500)
        );

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

};

function init5() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas5'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshToonMaterial({color: 0x6699FF});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    tick();

    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // ライトを周回
        pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500)
        );

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}

function init6() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas6'),
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1200);

    const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
    const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness: 0.5});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // ポイント光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    tick();

    function tick() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        // ライトを周回
        pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500)
        );

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}

</script>
<style scoped>
#container {
    margin: 3rem;
}
</style>