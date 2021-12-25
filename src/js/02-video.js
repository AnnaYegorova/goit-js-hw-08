import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';
player.on('play', function () {});
player.on('timeupdate', function (duration) {
  const currentTime = localStorage.setItem(STORAGE_KEY, JSON.stringify(duration));
  throttle(currentTime, 1000);
  console.log('currentTime', JSON.parse(currentTime));
});

const secondsFromLocaleStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)).seconds;
console.log(secondsFromLocaleStorage);
player
  .setCurrentTime(secondsFromLocaleStorage)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
