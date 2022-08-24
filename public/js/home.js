

var audio = " ";
for (var i = 1; i < 6; i++) {
  audio = "myAudio" + i
var audio = document.getElementById(audio);

}

function togglePlay(pos){
  for (var i = 1; i < 6; i++) {
    if (i==pos) {
      audio = "myAudio" + i
      continue
    }
    else {
      audio = "myAudio" + i
      audio = document.getElementById(audio)
      audio.pause()
      console.log(pos);
    }
  }
  audio = "myAudio" + pos
    audio = document.getElementById(audio)
    console.log(audio + "123");

  return audio.paused ? audio.play() : audio.pause();
}
