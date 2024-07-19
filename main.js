const imageCov = document.getElementById("background_cover");
const songTitle = document.getElementById("songtitle");
const songArtist = document.getElementById("songartist");
const songProgress = document.getElementById("songprogress");
const result = document.getElementById("progress");
const time = document.getElementById("actualtime");
const dur = document.getElementById("duration");

const previousButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const nextbutton = document.getElementById("next");

const songs = [
  {
    path: "song1.mp3",
    displayName: "A Thousand Years",
    cover: "img1.jpg",
    artist: "CHRISTINA PERRI",
  },
  {
    path: "song2.mp3",
    displayName: "Believer",
    cover: "img2.webp",
    artist: "IMAGINE DRAGONS",
  },
  {
    path: "song3.mp3",
    displayName: "Runaway",
    cover: "img3.jpg",
    artist: "AURORA",
  },
  {
    path: "song4.mp3",
    displayName: "Diamonds",
    cover: "img4.jpg",
    artist: "RIHANNA",
  },
];

const music = new Audio();

let songStart = 0;
let songPlaying = false;
function togglePlay() {
  if (songPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}
function playSong() {
  songPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "pause");
  music.play();
}
function pauseSong() {
  songPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("pause", "title");
  music.pause();
}
function loadSong(songs) {
  music.src = songs.path;
  songTitle.textContent = songs.displayName;
  songArtist.textContent = songs.artist;
  imageCov.src = songs.cover;
}
function changeSong(direction) {
  songStart = songStart + direction + (songs.length % songs.length);
  loadSong(songs[songStart]);
  playSong();
}
function setProg(e) {
  const width = songProgress.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
function updateProg() {
  const { duration, currentTime } = music;
  const ProgPercentage = (currentTime / duration) * 100;
  result.style.width = `${ProgPercentage}%`;

  const updateTime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  dur.textContent = `${updateTime(duration / 60)} : ${updateTime(
    duration % 60,
  )}`;
  time.textContent = `${updateTime(currentTime / 60)} : ${updateTime(
    currentTime % 60,
  )}`;
}
const buttonEv = () => {
  playButton.addEventListener("click", togglePlay);
  nextbutton.addEventListener("click", () => changeSong(1));
  previousButton.addEventListener("click", () => changeSong(-1));
  music.addEventListener("ended", () => changeSong(1));
  music.addEventListener("timeupdate", updateProg);
  songProgress.addEventListener("click", setProg);
};
document.addEventListener("DOMContentLoaded", buttonEv);
loadSong(songs[songStart]);