const video = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');
const outputData = document.getElementById('outputData');

// Update button and make it clickable once a QR code is scanned
function updateButtonState(qrCode) {
    const sendButton = document.getElementById('sendButton');
    if (qrCode) {
        sendButton.disabled = false;  // Enable the button when a QR code is detected
    } else {
        sendButton.disabled = true;
    }
}

// Function to start the camera and handle QR scanning
function startQRScanner() {
    // Check if getUserMedia is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request camera access (rear camera with 'facingMode: environment')
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'  // Request rear camera
            }
        })
        .then(function(stream) {
            video.srcObject = stream;  // Set video source to camera stream
            video.setAttribute('playsinline', true);  // Ensure it plays inline for mobile browsers
            video.play();
            requestAnimationFrame(scanQRCode);  // Start scanning QR codes
        })
        .catch(function(error) {
            console.error("Camera access denied or error occurred: ", error);
            alert("Error accessing the camera: " + error.message);
        });
    } else {
        alert("Your browser doesn't support camera access.");
    }
}

// Function to scan QR codes from the video stream
function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas dimensions to match the video stream
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;

        // Draw video frame to the canvas
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

        // Extract image data from the canvas
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);

        // Try to decode the QR code from the current frame
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        if (qrCode) {
            // If a QR code is detected, output the result
            outputData.value = qrCode.data;
            updateButtonState(qrCode.data);  // Enable the button

            // Optionally draw a bounding box around the detected QR code
            canvas.beginPath();
            canvas.moveTo(qrCode.location.topLeftCorner.x, qrCode.location.topLeftCorner.y);
            canvas.lineTo(qrCode.location.topRightCorner.x, qrCode.location.topRightCorner.y);
            canvas.lineTo(qrCode.location.bottomRightCorner.x, qrCode.location.bottomRightCorner.y);
            canvas.lineTo(qrCode.location.bottomLeftCorner.x, qrCode.location.bottomLeftCorner.y);
            canvas.closePath();
            canvas.lineWidth = 4;
            canvas.strokeStyle = "red";
            canvas.stroke();
        }
    }

    // Continue scanning for QR codes in the next video frame
    requestAnimationFrame(scanQRCode);
}

// Start the QR code scanner when the page loads
window.onload = function() {
    startQRScanner();
};
