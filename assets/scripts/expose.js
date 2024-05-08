// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const imageElement = document.querySelector('#expose img');
  const audioElement = document.querySelector('#expose audio');
  const playButton = document.querySelector('#expose button');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');

  // Map the horn types to their corresponding image and audio file paths
  const hornAssets = {
    "air-horn": {
      image: "assets/images/air-horn.svg",
      audio: "assets/audio/air-horn.mp3"
    },
    "car-horn": {
      image: "assets/images/car-horn.svg",
      audio: "assets/audio/car-horn.mp3"
    },
    "party-horn": {
      image: "assets/images/party-horn.svg",
      audio: "assets/audio/party-horn.mp3"
    }
  };

  // Listen for changes in the dropdown and update the image and audio source
  hornSelect.addEventListener('change', () => {
    const selectedHorn = hornSelect.value;

    // Update the image and audio sources based on the selected horn
    if (hornAssets[selectedHorn]) {
      imageElement.src = hornAssets[selectedHorn].image;
      audioElement.src = hornAssets[selectedHorn].audio;
    } else {
      // Default if no horn is selected
      imageElement.src = "assets/images/no-image.png";
      audioElement.src = "";
    }
  });

  // Event listener for "Play Sound" button
  playButton.addEventListener('click', () => {
    // Ensure a valid audio source is selected before attempting to play
    if (audioElement.src) {
      audioElement.play();
    } else {
      console.warn("No horn sound selected. Please select a horn to play.");
    }
  });

  volumeSlider.addEventListener('input', () => {
    const volumeValue = parseInt(volumeSlider.value, 10);

    // Update the audio volume (range: 0.0 to 1.0)
    audioElement.volume = volumeValue / 100;

    // Update the volume icon based on the slider value
    if (volumeValue === 0) {
      volumeIcon.src = "assets/icons/volume-level-0.svg";
      volumeIcon.alt = "Volume level 0";
    } else if (volumeValue < 33) {
      volumeIcon.src = "assets/icons/volume-level-1.svg";
      volumeIcon.alt = "Volume level 1";
    } else if (volumeValue < 67) {
      volumeIcon.src = "assets/icons/volume-level-2.svg";
      volumeIcon.alt = "Volume level 2";
    } else {
      volumeIcon.src = "assets/icons/volume-level-3.svg";
      volumeIcon.alt = "Volume level 3";
    }
  });
}