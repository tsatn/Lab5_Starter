// explore.js

// Ensure the init function is only bound once to the DOMContentLoaded event
document.removeEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', init);

function init() {
  const textInput = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const speakButton = document.getElementById('speak-button');
  let synth = window.speechSynthesis;
  let voices = [];

  function populateVoiceList() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = '';  // Clear existing options to avoid duplicates
      for(let voice of voices) {
          let option = document.createElement('option');
          option.textContent = voice.name + ' (' + voice.lang + ')';
          
          if(voice.default) {
              option.textContent += ' -- DEFAULT';
          }

          option.setAttribute('data-lang', voice.lang);
          option.setAttribute('data-name', voice.name);
          voiceSelect.appendChild(option);
      }
  }

  // This ensures the voice list is populated correctly across all browsers
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  // Populate the voice list immediately in case voices are already loaded
  populateVoiceList();

  speakButton.addEventListener('click', function() {
      let utterance = new SpeechSynthesisUtterance(textInput.value);
      let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      utterance.voice = voices.find(voice => voice.name === selectedOption);
      synth.speak(utterance);
  });
}

// // explore.js

// window.addEventListener('DOMContentLoaded', init);

// function init() {
//   const textInput = document.getElementById('text-to-speak');
//   const voiceSelect = document.getElementById('voice-select');
//   const speakButton = document.getElementById('speak-button');
//   let synth = window.speechSynthesis;
//   let voices = [];

//   function populateVoiceList() {
//       voices = synth.getVoices();
//       for(let voice of voices) {
//           let option = document.createElement('option');
//           option.textContent = voice.name + ' (' + voice.lang + ')';
          
//           if(voice.default) {
//               option.textContent += ' -- DEFAULT';
//           }

//           option.setAttribute('data-lang', voice.lang);
//           option.setAttribute('data-name', voice.name);
//           voiceSelect.appendChild(option);
//       }
//   }

//   populateVoiceList();
//   if (speechSynthesis.onvoiceschanged !== undefined) {
//       speechSynthesis.onvoiceschanged = populateVoiceList;
//   }

//   speakButton.addEventListener('click', function() {
//       let utterance = new SpeechSynthesisUtterance(textInput.value);
//       let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
//       for(let voice of voices) {
//           if(voice.name === selectedOption) {
//               utterance.voice = voice;
//           }
//       }
//       synth.speak(utterance);
//   });
// }

// window.addEventListener('DOMContentLoaded', init);
