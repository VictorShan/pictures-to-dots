(function () {

    const IMAGE = "image.png";
    console.log('Hello, World!');
    const CIRCLE_DIAMETER = 12;

    async function init() {
        const overlayCanvas = document.getElementById('overlay');
        const imageCanvas = document.getElementById('canvas');

        const overlayCtx = overlayCanvas.getContext('2d');
        const imageCtx = imageCanvas.getContext('2d');

        let images = [];
        for (let i = 1; i < 269; i++) {
            let newImage = new Image();
            newImage.src = "images2/" + pad(i, 4) + ".png";
            images.push(newImage);
        }
        // images = [images[0]];
        let imageIndex = 0;
        await Promise.all(images.map(imageLoaded));
        for (const image of images) {
            // image.onload = function () {
                imageCanvas.width = image.width;
                imageCanvas.height = image.height;
                overlayCanvas.width = image.width;
                overlayCanvas.height = image.height;
                setTimeout(() => {
                    imageCtx.drawImage(image, 0, 0);
                    const imageData = imageCtx.getImageData(0, 0, image.width, image.height);
                    for (let j = 0; j < image.height / CIRCLE_DIAMETER; j++) {
                        for (let i = 0; i < image.width / CIRCLE_DIAMETER; i++) {
                            // setTimeout(() => {
                                y = j * CIRCLE_DIAMETER + CIRCLE_DIAMETER / 2;
                                x = i * CIRCLE_DIAMETER + CIRCLE_DIAMETER / 2;
                                const imgColor =  extractPixelColor(image.width, y, x, imageData.data);
                                let color = `rgb(${imgColor.red}, ${imgColor.green}, ${imgColor.blue})`
                                drawBubble(x, y, CIRCLE_DIAMETER / 2, color, overlayCtx);
                            // }, (j * image.width / CIRCLE_DIAMETER + i) * 50);
                        }
                    }
                }, imageIndex * (1000 / 24));
                imageIndex++;
            // }
        }
    }

    function imageLoaded(image) {
        return new Promise((resolve, reject) => {
            image.onload = function () {
                resolve();
            }
        });
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

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    window.addEventListener('load', function () {
        console.log('The page has been loaded!');
        init();
    });
})();