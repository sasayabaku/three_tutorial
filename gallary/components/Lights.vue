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
            <b-col cols="4">
                <canvas id="lights_canvas4"></canvas>
                <h3>点光源</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="lights_canvas5"></canvas>
                <h3>スポットライト光源</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="lights_canvas6"></canvas>
                <h3>スポットライト光源 (ヘルパー付き)</h3>
            </b-col>
            <b-col cols="4">
                <canvas id="lights_canvas7"></canvas>
                <h3>矩形光源</h3>
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
        init7();
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

function init4() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas4'),
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

    // 点光源を作成
    // new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
    const light = new THREE.PointLight(0xffffff, 2, 50, 1.0);
    scene.add(light);

    // 照明を可視化するヘルパー
    const lightHelper = new THREE.PointLightHelper(light);
    scene.add(lightHelper);

    tick();

    function tick() {
        renderer.render(scene, camera);

        // 照明の位置を更新 
        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        light.lookAt(new THREE.Vector3(0, 0, 0));   

        requestAnimationFrame(tick);
    }
 
}

function init5() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas5'),
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

    // スポットライト光源を作成
    // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
    const light = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 4, 10, 0.5);
    scene.add(light);

    tick();

    function tick() {
        renderer.render(scene, camera);

        // 照明の位置を更新 
        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        light.lookAt(new THREE.Vector3(0, 0, 0));   

        requestAnimationFrame(tick);
    }
 
}

function init6() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas6'),
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

    // スポットライト光源を作成
    // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
    const light = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 4, 10, 0.5);
    scene.add(light);

    // 照明を可視化するヘルパー
    const lightHelper = new THREE.SpotLightHelper(light);
    scene.add(lightHelper);

    tick();

    function tick() {
        renderer.render(scene, camera);

        // 照明の位置を更新 
        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        light.lookAt(new THREE.Vector3(0, 0, 0));   

        lightHelper.update();       

        requestAnimationFrame(tick);
    }
 
}

function init7() {
    const width = 300;
    const height = 180;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#lights_canvas7'),
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

    // スポットライト光源を作成
    // new THREE.RectAreaLight(色, 光の強さ, 幅, 高さ)
const light = new THREE.RectAreaLight(0xFFFFFF, 5.0, 10, 10);
    scene.add(light);

    tick();

    function tick() {
        renderer.render(scene, camera);

        // 照明の位置を更新 
        const t = Date.now() / 500;
        const r = 10.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);
        light.lookAt(new THREE.Vector3(0, 0, 0));   

        requestAnimationFrame(tick);
    }
 
}

</script>
<style scoped>
#container {
    margin: 3rem;
}
</style>