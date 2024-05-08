// explore.js
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
      voiceSelect.innerHTML = '';  
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

  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  populateVoiceList();

  speakButton.addEventListener('click', function() {
      let utterance = new SpeechSynthesisUtterance(textInput.value);
      let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      utterance.voice = voices.find(voice => voice.name === selectedOption);
      synth.speak(utterance);
  });
}
