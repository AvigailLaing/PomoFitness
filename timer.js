document.addEventListener("DOMContentLoaded", function () {
    const twentyFiveMinutes = 60 * 25;
    const fiveMinutes = 60 * 5;
    const display = document.getElementById("timer");
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");
    const skipButton = document.getElementById("skipButton");
    const exerciseBreakContainer = document.getElementById("exercise-break-container");
    const videoContainer = document.getElementById("video-container");
    const exerciseVideo = "https://drive.google.com/file/d/1bqeultxs-egZN4TnSqjJizbFjYl7RfNd/preview"; // Replace with the Google Drive URL of your exercise video
    let intervalId;
    let isPaused = false;
    let isSessionActive = false;
    let remainingTime = twentyFiveMinutes;
    const buttonSound = document.getElementById("button-sound");
  
    function playButtonSound() {
      buttonSound.currentTime = 0;
      buttonSound.play();
    }
  
    function startTimer(duration, display) {
      let timer = duration;
      let minutes, seconds;
  
      intervalId = setInterval(function () {
        if (isPaused) {
          return;
        }
  
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0) {
          clearInterval(intervalId);
          if (duration === twentyFiveMinutes) {
            display.textContent = "25:00";
            // Show "Are you ready to focus?" header
            exerciseBreakContainer.innerHTML = "<h2>Are you ready to focus?</h2>";
          } else if (duration === fiveMinutes) {
            display.textContent = "00:00";
            // Hide exercise video
            videoContainer.innerHTML = "";
            startTimer(twentyFiveMinutes, display);
            isSessionActive = false;
            isPaused = false;
          }
        }
      }, 1000);
    }
  
    function showExerciseVideo() {
      const videoElement = document.createElement("iframe");
      videoElement.src = exerciseVideo;
      videoElement.width = "640";
      videoElement.height = "360";
      videoContainer.appendChild(videoElement);
    }
  
    startButton.addEventListener("click", function () {
      if (!isSessionActive) {
        playButtonSound();
        isSessionActive = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        display.textContent = "25:00";
        startTimer(twentyFiveMinutes, display);
      }
    });
  
    pauseButton.addEventListener("click", function () {
      if (isSessionActive) {
        if (isPaused) {
          playButtonSound();
          isPaused = false;
          pauseButton.textContent = "Pause Session";
        } else {
          playButtonSound();
          isPaused = true;
          pauseButton.textContent = "Resume Session";
        }
      }
    });
  
    skipButton.addEventListener("click", function () {
      if (isSessionActive) {
        playButtonSound();
        clearInterval(intervalId);
        display.textContent = "05:00";
        document.querySelector("h1").textContent = "Are you ready to PomoFitness?";
        showExerciseVideo();
        startTimer(fiveMinutes, display);
      }
    });
  });
  