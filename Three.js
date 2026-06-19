function recordCanvas(canvas, durationMs) {
    // Canvasからストリーム（映像データ）を取得。引数はフレームレート（30fps）
    const stream = canvas.captureStream(30); 
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9' // Chrome/Firefox等で動く高画質コーデック
    });

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        
        // ダウンロードリンクを自動生成してクリック
        const a = document.createElement('a');
        a.href = videoURL;
        a.download = 'slide_video.webm';
        a.click();
    };

    // 録画開始
    mediaRecorder.start();
    
    // スライドショーが終わる時間（例: 10秒後）に停止
    setTimeout(() => {
        mediaRecorder.stop();
    }, durationMs);
}
