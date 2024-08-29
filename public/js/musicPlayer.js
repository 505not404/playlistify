const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play"); 

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const songCurrentTime = document.getElementById("current-time"); 
const songDuration = document.getElementById("song-duration");
const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title"); 
const songArtist = document.getElementById("song-artist"); 

//set autoplay
let isAutoPlay = 0; 

// Song titles
const cards = document.getElementsByClassName("reccomendation-card"); 

// Keep track of song
let cardIndex = 0;
//keep playState
let isPlaying = false; 

loadSong(cards[cardIndex]);

//loadSong
function loadSong(card) 
{
  let song = card.querySelector(".songPlayButton");
  try
  {
    songDuration.innerText = '00:29'; 
    audio.volume = 0.5;
    console.log(card.querySelector(".card-song-artist").innerText); 
    audio.src = song.value;
    // songArtist.style.color = "red";
    songArtist.innerText = card.querySelector(".card-song-artist").innerText; 
    songTitle.innerText = card.querySelector(".card-song-name").innerText; 
    albumCover.src = card.querySelector(".album-image").src;
  }
  catch
  {
    nextSong(); 
  } 
  // console.log(song.id);
}

//play the song
function playSong()
{
  isAutoPlay = 1; 
  isPlaying = true; 
  playBtn.style.color = "#1ed760";
  audio.play();
}

function pauseSong()
{
  isAutoPlay = 0; 
  isPlaying = false; 
  playBtn.style.color = "white"; 
  audio.pause(); 
}

// Previous song
function prevSong() 
{
  cardIndex--;

  if (cardIndex < 0) {
    cardIndex = 0; 
  }

  loadSong(cards[cardIndex]);
  if(isAutoPlay == 1)playSong();
}

// Next song
function nextSong() 
{
  cardIndex++;

  if (cardIndex > cards.length - 1) {
    cardIndex = cards.length - 1;
  }

  loadSong(cards[cardIndex]);
  if(isAutoPlay == 1)playSong();
}

//progress bar
// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  songCurrentTime.innerText = "00:" + Math.floor(currentTime);  
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//add listener
//addListener for songPlayButton
function addPlayButtonListener()
{
  let songPlayButton = document.querySelectorAll(".songPlayButton"); 
  songPlayButton.forEach(playButton => 
  {
     playButton.addEventListener('click', function checkIndex(event)
     {
      console.log(playButton.value);
      cardIndex = playButton.id; 
      loadSong(cards[cardIndex]);
      playSong(); 
     });
   })
}

//addListener for playButton
function playButtonListener()
{
  playBtn.addEventListener("click", function checkPlaying()
  {
    // console.log("yah");
    if(isPlaying)
    {
      pauseSong(); 
    }
    else
    {
      playSong();
    }
  })
}

playButtonListener(); 
addPlayButtonListener(); 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('ended', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);
// Time of song
// audio.addEventListener('timeupdate',DurTime);