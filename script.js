const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");

const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const partSpeech = document.getElementById("partSpeech");
const definition = document.getElementById("definition");
const example = document.getElementById("example");
const synonyms = document.getElementById("synonyms");
const error = document.getElementById("error");
const results = document.getElementById("results");
const audioBtn = document.getElementById("audioBtn");

let audioLink = "";

form.addEventListener("submit", searchWord);

function searchWord(event) {

    event.preventDefault();

    const search = input.value.trim();

    if (search === "") {
        showError("Please enter a word.");
        return;
    }

    fetchWord(search);
}

function fetchWord(wordSearch) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`)

        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found");
            }

            return response.json();
        })

        .then(data => {
            displayWord(data[0]);
        })

        .catch(err => {
            showError(err.message);
        });
}

function displayWord(data) {

    error.textContent = "";

    results.style.display = "block";

    results.classList.add("highlight");

    word.textContent = data.word;

    phonetic.textContent = data.phonetic || "No pronunciation";

    partSpeech.textContent =
        "Part of Speech: " +
        (data.meanings[0].partOfSpeech || "Unavailbale");

    definition.textContent =
        "Definition: " +
        (data.meanings[0].definitions[0].definition);

    example.textContent =
        "Example: " +
        (data.meanings[0].definitions[0].example || "No example available");

    const syns = data.meanings[0].synonyms;

    if (syns.length > 0) {
        synonyms.textContent = "Synonyms: " + syns.join(", ");
    } else {
        synonyms.textContent = "No synonyms available.";
    }

    audioLink = "";

    data.phonetics.forEach(item => {

        if (item.audio && audioLink === "") {
            audioLink = item.audio;
        }

    });

    if (audioLink === "") {
        audioBtn.style.display = "none";
    } else {
        audioBtn.style.display = "inline-block";
    }

    // Removed old event listeners to prevent duplicates
    const newAudioBtn = audioBtn.cloneNode(true);
    audioBtn.parentNode.replaceChild(newAudioBtn, audioBtn);
    
    newAudioBtn.addEventListener("click", function() {

        if (audioLink !== "") {

            const audio = new Audio(audioLink);

            audio.play();

        }

    });
}

function showError(message) {

    results.style.display = "none";

    error.textContent = message;

}