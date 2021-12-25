import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

readFromLS();
player.on('play', onPlay);
function onPlay() {
  console.log('play vimeo');
}
player.on('timeupdate', throttle(onTimeUpdate, 1000));
function onTimeUpdate(seconds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seconds));
}

function readFromLS() {
  const secondsFromLocaleStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(secondsFromLocaleStorage);
  if (!secondsFromLocaleStorage) {
    return;
  }
  player.setCurrentTime(secondsFromLocaleStorage.seconds);
}
