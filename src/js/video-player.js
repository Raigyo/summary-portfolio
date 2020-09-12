// Player video

// Buttons references
let playPauseBtn = document.querySelector('.playpause');
let stopBtn = document.querySelector('.stop');
let rwdBtn = document.querySelector('.rwd');
let fwdBtn = document.querySelector('.fwd');
let timeLabel = document.querySelector('.time');
let totalTimeLabel = document.querySelector('.totaltime');
let fullScr = document.querySelector('.fullscreen');

// Player reference
let player = document.querySelector('video');
// remove native controls
player.removeAttribute('controls');

// Play / Pause
playPauseBtn.onclick = function () {
  if (player.paused) {
    player.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    player.pause();
    playPauseBtn.textContent = 'Play';
  }
};

// Stop ( = pause because stop doesn't really exists in HTMLMediaElements)
stopBtn.onclick = function () {
  player.pause();
  player.currentTime = 0;
  playPauseBtn.textContent = 'Play';
};

// Rewind and fast forward
rwdBtn.onclick = function () {
  player.currentTime -= 3;
};

fwdBtn.onclick = function () {
  player.currentTime += 3;
  if (player.currentTime >= player.duration || player.paused) {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = 'Play';
  }
};

// Display of time elapsed
player.ontimeupdate = function () {
  let minutes = Math.floor(player.currentTime / 60);
  let seconds = Math.floor(player.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  mediaTime = minuteValue + ':' + secondValue;
  timeLabel.textContent = mediaTime;
};

// Display total time
player.onloadeddata = function () {
  let minutes = Math.floor(player.duration / 60);
  let seconds = Math.floor(player.duration - minutes * 60);
  let totalMinuteValue;
  let totalSecondValue;

  if (minutes < 10) {
    totalMinuteValue = '0' + minutes;
  } else {
    totalMinuteValue = minutes;
  }

  if (seconds < 10) {
    totalSecondValue = '0' + seconds;
  } else {
    totalSecondValue = seconds;
  }

  mediaTime = totalMinuteValue + ':' + totalSecondValue;
  totalTimeLabel.textContent = mediaTime;
};

// Full screen
fullScr.addEventListener('click', toggleFullscreen);
// Create fullscreen video button
function toggleFullscreen() {
  if (video.requestFullScreen) {
    video.requestFullScreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  }
}
