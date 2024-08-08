(function () {

    const IMAGE = "image.png";
    console.log('Hello, World!');
    const CIRCLE_DIAMETER = 4;

    function init() {
        const overlayCanvas = document.getElementById('overlay');
        const imageCanvas = document.getElementById('canvas');

        const overlayCtx = overlayCanvas.getContext('2d');
        const imageCtx = imageCanvas.getContext('2d');

        const images = [];
        for (let i = 0; i < 100; i++) {
            const newImage = new Image();
            newImage.src = IMAGE;
            images.push(newImage);
        }

        let nextSizeGenerator = getNextSizeGenerator();
        for (const image of images) {
            const size = nextSizeGenerator();
            image.src = IMAGE;
            image.onload = function () {
                imageCanvas.width = image.width;
                imageCanvas.height = image.height;
                overlayCanvas.width = image.width;
                overlayCanvas.height = image.height;
                imageCtx.drawImage(image, 0, 0);
                // drawBubble(100, 100, 100, 'red', overlayCtx);
                const imageData = imageCtx.getImageData(0, 0, image.width, image.height);
                // return
                for (let i = 0; i < image.width / CIRCLE_DIAMETER; i++) {
                    for (let j = 0; j < image.height / CIRCLE_DIAMETER; j++) {
                        y = j * CIRCLE_DIAMETER + CIRCLE_DIAMETER / 2;
                        x = i * CIRCLE_DIAMETER + CIRCLE_DIAMETER / 2;
                        const imgColor =  extractPixelColor(image.width, y, x, imageData.data);
                        let color = `rgb(${imgColor.red}, ${imgColor.green}, ${imgColor.blue})`
                        // console.log(color);
                        drawBubble(x, y, (Math.random() + size) * CIRCLE_DIAMETER / 2, color, overlayCtx);
                    }
                }
            }
        }
    }

    function getNextSizeGenerator() {
        const upperBound = 0.55;
        const lowerBound = 0.45;
        const velocity = 0.005;
        let size = 0.5;
        let direction = 1;
        return function () {
            size += direction * velocity;
            if (size >= upperBound || size <= lowerBound) {
                direction *= -1;
            }
            // console.log(size);
            return size;
        }
    }



    function extractPixelColor(cols, x, y, data) {
        let pixel = cols * x + y;
        let position = pixel * 4;
        return {
            red: data[position],
            green: data[position + 1],
            blue: data[position + 2],
            // alpha: data[position + 3],
        }
    }

    function drawImage(image, ctx) {
        ctx.drawImage(image, 0, 0);
        console.log('Image has been drawn!');
    }

    function drawBubble(x, y, radius, color, ctx) {
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        // console.log('Bubble has been drawn!');
    }

    window.addEventListener('load', function () {
        console.log('The page has been loaded!');
        init();
    });
})();