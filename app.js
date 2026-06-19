const uploadInput = document.getElementById('image-upload');
let textures = [];

// 1. 画像アップロード時の処理
uploadInput.addEventListener('change', (e) => {
    const files = e.target.files;
    const loader = new THREE.TextureLoader();
    textures = [];

    Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        loader.load(url, (texture) => {
            textures.push(texture);
            if (textures.length === files.length) {
                document.getElementById('start-btn').disabled = false;
                
                // 画像がすべて読み込まれたら、ここで initThree を実行する
                initThree(); 
            }
        });
    });
});

// 2. エラーになっていた「initThree」関数をここに定義する
function initThree() {
    // すでにCanvasがある場合は二重に作らないように中身をクリアする
    const container = document.getElementById('canvas-container');
    container.innerHTML = '';

    // シーン・カメラ・レンダラーの作成
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 640 / 360, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(640, 360);
    container.appendChild(renderer.domElement);

    // 1枚目の画像を貼り付けるプレーン（板）を作成
    const geometry = new THREE.PlaneGeometry(5, 3);
    // とりあえず最初の1枚目を表示
    const material = new THREE.MeshBasicMaterial({ map: textures[0] }); 
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // アニメーションループ（ここで動かす）
    function animate() {
        requestAnimationFrame(animate);

        // テスト用に画像を少しずつ回転・ズームさせてみる
        mesh.rotation.y += 0.005; 
        
        renderer.render(scene, camera);
    }
    
    animate();
}
