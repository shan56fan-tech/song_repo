const bgMusic = document.getElementById('bg-music');

// Screen navigation
function goToScreen(screenNumber) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  if (screenNumber === 2) {
    document.getElementById('card-screen-1').classList.add('active');
  } else if (screenNumber === 3) {
    document.getElementById('card-screen-2').classList.add('active');
  } else if (screenNumber === 4) {
    document.getElementById('lyrics-screen').classList.add('active');
  }
}

/* 
  Timestamps updated: Line 4 delayed to 14.3s to extend Line 3, 
  and subsequent timestamps adjusted for smooth ending sync.
*/
const lyricsTimestamps = [
  { time: 0.2,  text: "When all I dream of<br>is your eyes" },
  { time: 4.8,  text: "All I long for<br>is your touch" },
  { time: 9.0,  text: "And, darlin', something<br>tells me that's enough" },
  { time: 14.3, text: "You can say that<br>I'm a fool" },
  { time: 18.3, text: "And I don't know<br>very much" },
  { time: 22.0, text: "But I think<br>they call this love" }
];

let lyricsActive = false;
let currentLyricIndex = -1;

// Triggers music and lyric sync on Screen 4
function startLyricsShow() {
  goToScreen(4);
  
  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(err => console.log("Audio play error:", err));
  }

  lyricsActive = true;
  currentLyricIndex = -1;
  requestAnimationFrame(checkLyricsSync);
}

function checkLyricsSync() {
  if (!lyricsActive || !bgMusic) return;

  const currentTime = bgMusic.currentTime;
  const lyricTextElement = document.getElementById('lyric-text');

  let matchedIndex = -1;
  for (let i = 0; i < lyricsTimestamps.length; i++) {
    if (currentTime >= lyricsTimestamps[i].time) {
      matchedIndex = i;
    }
  }

  if (matchedIndex !== currentLyricIndex && matchedIndex !== -1) {
    currentLyricIndex = matchedIndex;
    lyricTextElement.classList.remove('show');

    setTimeout(() => {
      if (currentLyricIndex !== -1 && lyricsTimestamps[currentLyricIndex]) {
        lyricTextElement.innerHTML = lyricsTimestamps[currentLyricIndex].text;
        lyricTextElement.classList.add('show');
      }
    }, 120);
  }

  // Final cat reveal at 25.8 seconds
  if (currentTime >= 25.8) {
    lyricTextElement.classList.remove('show');
    setTimeout(() => {
      document.getElementById('final-card').classList.add('show');
    }, 500);
    lyricsActive = false;
    return;
  }

  requestAnimationFrame(checkLyricsSync);
}