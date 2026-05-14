const songs = [

  {
    title: "Bairan",
    artist: "Banjaare",
    src: "songs/Bairan.mp3"
  },

  {
    title: "Guzaarishein",
    artist: "Sarmad",
    src: "songs/Guzaarishein.mp3"
  },

  {
    title: "HUM",
    artist: "Murtaza Qazilbash",
    src: "songs/HUM.mp3"
  }

];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(song){
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

loadSong(songs[songIndex]);

function playSong(){
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseSong(){
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

playBtn.addEventListener("click", () => {
  if(isPlaying){
    pauseSong();
  }else{
    playSong();
  }
});

function nextSong(){
  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

function prevSong(){
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", (e) => {

  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if(durationSeconds < 10){
    durationSeconds = `0${durationSeconds}`;
  }

  if(durationSeconds){
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if(currentSeconds < 10){
    currentSeconds = `0${currentSeconds}`;
  }

  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

});

progressContainer.addEventListener("click", (e) => {

  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function createPlaylist(){

  songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent = `${song.title} - ${song.artist}`;

    li.addEventListener("click", () => {

      songIndex = index;

      loadSong(songs[songIndex]);

      playSong();

      updatePlaylist();

    });

    playlist.appendChild(li);

  });

}

createPlaylist();

function updatePlaylist(){

  const items = document.querySelectorAll("#playlist li");

  items.forEach((item, index) => {

    item.classList.remove("active");

    if(index === songIndex){
      item.classList.add("active");
    }

  });

}

updatePlaylist();
