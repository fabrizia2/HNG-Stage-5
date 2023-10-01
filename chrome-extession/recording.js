const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" }
    });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        const completeBlobUrl = URL.createObjectURL(completeBlob);
        const video = document.getElementById("recordedVideo");
        video.src = completeBlobUrl;
        video.controls = true;
    };
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 10 * 1000);
};

startRecording();
