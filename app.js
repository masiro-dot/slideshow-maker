// app.js の一部（概念）
const uploadInput = document.getElementById('image-upload');
let textures = [];

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
                initThree(); // Three.jsの初期化へ
            }
        });
    });
});
