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

function searchWord(event){

    event.preventDefault();

    const search = input.value.trim();

    if (search===""){
        showError("Please enter a word.");
        return
    }

    fetchWord(search);
}

function fetchWord(){

}

function displayWord(){

}

function showError(){
    
}