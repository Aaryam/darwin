
const videoPlayer = document.getElementById('videoPlayer');
const videoScreen = document.getElementById('videoScreen');
const mediaControls = document.getElementById('mediaControls');
const controlsBtn = document.getElementById('controlsBtn');
const mediaSlider = document.getElementById('mediaSlider');
const durationText = document.getElementById('durationText');
const fullscreenBtn = document.getElementById('fullscreenBtn');

var isPaused = false;

videoScreen.src = localStorage.getItem('currentlyPlaying');

document.body.addEventListener('keydown', function (e) {
    if (e.key == 'k' || e.keyCode == 32) {
        togglePause();
        fadeMediaControls();
    }
    else if (e.keyCode == 39) {
        videoScreen.currentTime = videoScreen.currentTime + 5;
        fadeMediaControls();
    }
    else if (e.keyCode == 37) {
        videoScreen.currentTime = videoScreen.currentTime - 5;
        fadeMediaControls();
    }
});

controlsBtn.addEventListener('click', function () {
    togglePause();
});

fullscreenBtn.addEventListener('click', function () {
    openFullscreen();
});

mediaSlider.oninput = function () {
    durationText.innerText = secondsToTime(videoScreen.duration - videoScreen.currentTime);
    videoScreen.currentTime = (this.value <= videoScreen.duration) ? this.value : videoScreen.duration;
    fillSlider();
}

function secondsToTime(e) {
    var h = Math.floor(e / 3600).toString().padStart(2, '0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(e % 60).toString().padStart(2, '0');

    return h + ':' + m + ':' + s;
    //return `${h}:${m}:${s}`;
}

setInterval(function () {
    if (secondsToTime(videoScreen.duration - videoScreen.currentTime)!= durationText.innerText) {
        mediaSlider.value = videoScreen.currentTime;
        durationText.innerText = secondsToTime(videoScreen.duration - videoScreen.currentTime);

        fillSlider();
    }
}, 100);

function fillSlider() {
    var value = (mediaSlider.value - mediaSlider.min) / (mediaSlider.max - mediaSlider.min) * 100;
    mediaSlider.style.background = 'linear-gradient(to right, rgb(228, 193, 39) 0%, rgb(228, 193, 39) ' + value + '%, #fff ' + value + '%, white 100%)'
}

durationText.innerText = "00:00:00"

setInterval(function () {
    if (document.getElementById('mediaSlider').max != document.getElementById('videoScreen').duration) {
        document.getElementById('mediaSlider').max = document.getElementById('videoScreen').duration;
    }
    else {
        clearInterval(this);
    }
}, 100);

var fadeTimeout = null;

function fadeMediaControls () {
    if (mediaControls.classList.contains('hidden')) {
        mediaControls.classList.remove('hidden');
        document.documentElement.style.cursor = 'auto';
        fadeTimeout != null ? clearTimeout(fadeTimeout) : function () {

        }
    }
    else {
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(function () {
            mediaControls.classList.add('hidden');
            document.documentElement.style.cursor = 'none';
        }, 5000);
    }
}

document.body.addEventListener('mousemove', function (e) {
    fadeMediaControls();
});

function openFullscreen() {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
    }
}

document.body.addEventListener('keydown', function (e) {
    if (e.key == 'f') {
        openFullscreen();
    }
});

/* UTILITIES */

function togglePause() {
    if (isPaused) {
        videoScreen.play();
    }
    else {
        videoScreen.pause();
    }

    isPaused = !isPaused;

    isPaused ? controlsBtn.innerHTML = '<i class="material-icons">play_arrow</i>' : controlsBtn.innerHTML = '<i class="material-icons">pause</i>';
}

