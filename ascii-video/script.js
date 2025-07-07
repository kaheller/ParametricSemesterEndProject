window.onload = function() {
    // Create a hidden video element and load your video file
    const video = document.createElement('video');
    video.src = 'video/hand.mp4'; // Specify your video path
    video.muted = true;
    video.loop = true;
    video.playbackRate = 0.5; // Start at slower playback speed

    // Create a canvas for video processing
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // ASCII art elements
    const asciiArtContainer = document.getElementById('ascii-art');

    // Request microphone access and handle audio input
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);

            microphone.connect(analyser);
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            function adjustPlaybackSpeed() {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
                video.playbackRate = Math.min(3, Math.max(0.5, average / 128)); // Adjust speed based on volume
            }

            video.addEventListener('play', function() {
                const interval = setInterval(() => {
                    if (video.paused || video.ended) {
                        clearInterval(interval);
                        return;
                    }
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    generateAscii();
                    adjustPlaybackSpeed();
                }, 100); // Adjust interval for preferred frame rate
            });

            // Start video playback
            video.play();
        })
        .catch(error => console.error('Microphone access error:', error));

    function generateAscii() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let asciiString = '';

        for (let i = 0; i < imageData.length; i += 4) {
            const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
            asciiString += pixelToAscii(brightness);
            if ((i / 4 + 1) % canvas.width === 0) asciiString += '\n';
        }

        asciiArtContainer.textContent = asciiString;
    }

    function pixelToAscii(grayScale) {
        const asciiChars = ' .:-=+*#%@';
        return asciiChars[Math.floor((grayScale / 255) * (asciiChars.length - 1))];
    }
};