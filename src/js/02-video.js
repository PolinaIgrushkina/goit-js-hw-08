import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//Создание переменной для ключа в localStorage
const timeKey = 'videoplayer-current-time';

//Функция сохранения в локальное хранилище, деструктуризировали секунды из параметра data
function durationSaveToStorage({ seconds }) {
  localStorage.setItem(timeKey, seconds);
};

//При перезагрузке страницы перезагружается плеер
window.addEventListener('load', newStart);

player.on('timeupdate', Throttle(durationSaveToStorage, 1000));

//Функция, которая ловит событие load (перезагрузка страницы), если в локальном хранилище есть запись, возвращает это время
function newStart() {
  if (!localStorage.getItem(timeKey)) {
    return;
  }
  const currentVideoTime = localStorage.getItem(timeKey);
  player
    .setCurrentTime(currentVideoTime ?? 0)
    .then(() => {})
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
};