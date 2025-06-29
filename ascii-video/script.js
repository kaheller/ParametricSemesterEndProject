
     window.onload = function() {
         const video = document.getElementById('video');
         const canvas = document.getElementById('canvas');
         const asciiArtContainer = document.getElementById('ascii-art');
         const ctx = canvas.getContext('2d');

         video.onplay = function() {
             const interval = setInterval(() => {
                 if (video.paused || video.ended) {
                     clearInterval(interval);
                     return;
                 }
                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                 generateAscii();
             }, 100);
         };

         function generateAscii() {
             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
             
             let asciiString = '';
             
             for(let i = 0; i < imageData.length; i += 4) {
                 const avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
                 asciiString += pixelToAscii(avg);
                 if ((i / 4 + 1) % canvas.width === 0) asciiString += '\n';
             }

             asciiArtContainer.textContent = asciiString;
         }

         function pixelToAscii(grayScale) {
             const asciiChars = ' .:-=+*#%@';
             return asciiChars[Math.floor((grayScale / 255) * (asciiChars.length - 1))];
         }
     };