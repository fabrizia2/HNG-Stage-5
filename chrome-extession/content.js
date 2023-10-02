var recorder = null;
const chunks = [];

function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
                track.stop();
            }
        });

        // Send the recorded blob to the backend
        let recordedBlob = new Blob(chunks, { type: chunks[0].type });
        sendRecordingToBackend(recordedBlob);
    };

    recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };
}

function sendRecordingToBackend(blob) {
    const url = 'https://chrome-ext-ntna.onrender.com/upload';

    const formData = new FormData();
    formData.append('blob', blob, 'screen-recording.webm');

    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then((data) => {
        console.log('Recording successfully sent to the backend:', data);
    })
    .catch((error) => {
        console.error('Error sending recording to the backend:', error);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'request_recording') {
        console.log('requesting recording');

        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: {
                    width: 9999999999,
                    height: 9999999999,
                },
            })
            .then((stream) => {
                onAccessApproved(stream);
            });
    }

    if (message.action === 'stopvideo') {
        console.log('stopping video');
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log('no recorder');

        recorder.stop();
    }
});
