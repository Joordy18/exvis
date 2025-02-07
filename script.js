document.addEventListener('DOMContentLoaded', () => {
    const currentImage = document.getElementById('current-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const stopButton = document.getElementById('stop');
    const startButton = document.getElementById('start');
    let currentIndex = 0;
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
    let zoomLevel = 1;
    const minZoom = 1;
    const maxZoom = 2;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            currentImage.src = images[currentIndex];
        });
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        currentImage.src = images[currentIndex];
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        currentImage.src = images[currentIndex];
    });

    currentImage.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (event.deltaY < 0 && zoomLevel < maxZoom) {
            zoomLevel += 0.1;
        } else if (event.deltaY > 0 && zoomLevel > minZoom) {
            zoomLevel -= 0.1;
        }
        currentImage.style.transform = `scale(${zoomLevel})`;
    });

    let slideshowInterval;
    const startSlideshow = () => {
        slideshowInterval = setInterval(() => {
            nextButton.click();
        }, 3000);
    };

    const stopSlideshow = () => {
        clearInterval(slideshowInterval);
    };

    stopButton.addEventListener('click', stopSlideshow);
    startButton.addEventListener('click', startSlideshow);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                prevButton.click();
                break;
            case 'ArrowRight':
                nextButton.click();
                break;
            case 'Escape':
                zoomLevel = 1;
                currentImage.style.transform = `scale(${zoomLevel})`;
                break;
        }
    });
});