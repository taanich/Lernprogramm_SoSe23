"use strict";

// Radio-Buttons im Lernbereich
const mathRadioButton = document.getElementById('mathe');
const internetRadioButton = document.getElementById('internet');
const allgemeinRadioButton = document.getElementById('allgemein');
const ajaxRadioButton = document.getElementById('ajax');

// Überschrift
const header = document.getElementById('headline');
// Alle Antwort-Buttons
const allButtons = document.querySelectorAll('#options > *');

// Erfolgsquoten
// [TODO]

// Aufgabenbereiche festlegen
let questionsMath;
let questionsInternet;
let questionsAllgemein;
let questionsAjax;

// ------------------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function (){
    let model = new Model();
    let presenter = new Presenter();
    let view = new View(presenter);
    presenter.setModelAndView(model, view);

    // Aufgaben aus JSON Datei holen
    fetch('aufgaben.json')
        .then(response => response.json())
        .then(data => {
            questionsMath = data["teil-mathe"];
            console.log("Mathematik");
            console.log(questionsMath);

            questionsInternet = data["teil-internettechnologien"];
            console.log("Internet Technologie");
            console.log(questionsInternet);

            questionsAllgemein = data["teil-allgemein"];
            console.log("Allgemeinwissen");
            console.log(questionsAllgemein);

            questionsAjax = getQuiz();      // Ajax Funktion

            // Radio-Buttons initialisieren
            mathRadioButton.addEventListener('click', function() {
                header.textContent = 'Mathematik';
                model.init(questionsMath, 0, 0, 0);
                presenter.start();
            });

            internetRadioButton.addEventListener('click', function() {
                header.textContent = 'Internet Technologie';
                model.init(questionsInternet, 0, 0, 0);
                presenter.start();
            });

            allgemeinRadioButton.addEventListener('click', function() {
                header.textContent = 'Allgemeinwissen';
                model.init(questionsAllgemein, 0, 0, 0);
                presenter.start();
            });

            ajaxRadioButton.addEventListener('click', function() {
                header.textContent = 'Ajax Aufgaben';
                model.init(questionsAjax, 0, 0, 0);
                presenter.start();
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der JSON-Datei:', error);
        });
});



// Model --------------------------------------------------------------------------------------------------------------------
class Model {
    init(set, index, correct, incorrect) {
        this.questions = set;               // Kompletter Fragenkatalog
        this.index = index;                 // Beginn bei Index 0
        this.correctAnswers = correct;      // Anzahl richtige Antworten
        this.incorrectAnswers = incorrect;  // Anzahl falsche Antworten
        this.shuffleQuestions();
    }

    // Fisher-Yates-Shuffle-Algorithmus
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    getTask() {
        console.log("Hole Aufgabe " + this.index + "...")
        const question = this.questions[this.index].a;

        if (this.questions === questionsMath)
            return katex.renderToString(question);
        else
            return question;
    }

    getOptions() {
        return this.questions[this.index].l;
    }

    incrementCorrect() {
        this.correctAnswers +=1;
    }

    incrementIncorrect() {
        this.incorrectAnswers +=1;
    }

    getLength(){
        return this.questions.length;
    }

    incrementIndex() {
        this.index +=1;
    }

    getIndex() {
        return this.index;
    }

}

// Presenter --------------------------------------------------------------------------------------------------------------------
class Presenter {
    setModelAndView(model, view){
        this.model = model;
        this.view = view;
    }

    start(){
        //Begin application
        options.style.display = 'flex';
        line.style.display = 'flex';

        console.log("Applikation beginnt...");
        this.displayQuestion(this.model.index); // Beginne bei Index o des Fragenkatalogs
        document.getElementById('result').innerHTML=""; // Anzeige der richtigen Antwort leeren
        this.updateProgressBar(); // Aktualisiere die Fortschrittsleiste
    }

    displayQuestion(){
        let question = document.getElementById('question');

        if(this.model.index < this.model.getLength()) {
            question.innerHTML= this.model.getTask();
            this.view.setButtons(this.model.getOptions());
        } else {
            question.innerHTML = "Du hast " + this.model.correctAnswers + " von " + this.model.getLength() + " Aufgaben richtig gelöst!";
            options.style.display = 'none';
            return;
        }
        this.updateProgressBar(); // Aktualisiere die Fortschrittsleiste
    }

    evaluate(answer){
        // console.log("answer: " + answer.value)
        if (answer.value === "1") {
            this.model.incrementCorrect();
            console.log("Antwort " + answer.attributes.getNamedItem('id').value + ' ist richtig!');
            console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
            console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
        } else {
            this.model.incrementIncorrect();
            console.log("Antwort " + answer.attributes.getNamedItem('id').value + ' ist falsch! ');
            console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
            console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
        }

        this.model.incrementIndex();
        this.displayQuestion();
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.display = 'flex';
        const progressPercentage = ((this.model.getIndex() + 1) / this.model.getLength()) * 100;
        progressBar.style.width = progressPercentage + '%';
    }
}


// View --------------------------------------------------------------------------------------------------------------------
class View {
    constructor(presenter) {
        this.presenter = presenter;
        this.setHandler();
        this.setButtons(0);
    }

    setHandler() {
        // use capture false -> use bubbling
        // bind this -> this is refering to object rather than event
        // allButtons[0].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[0].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[1].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[1].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[2].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[2].addEventListener('click', this.checkAnswer.bind(this), false);

        // allButtons[3].addEventListener('click', this.nextQuestion.bind(this), false);
        allButtons[3].addEventListener('click', this.checkAnswer.bind(this), false);

    }

    setButtons(i) {
        const correctAnswer = i[0];
        const randomIndex = Math.floor(Math.random() * allButtons.length);

        allButtons[0].textContent = i[randomIndex];
        allButtons[1].textContent = i[(randomIndex + 1) % allButtons.length];
        allButtons[2].textContent = i[(randomIndex + 2) % allButtons.length];
        allButtons[3].textContent = i[(randomIndex + 3) % allButtons.length];

        for (let j = 0; j < 4; j++) {
            if (allButtons[j].textContent === correctAnswer) {
                allButtons[j].value = 1;
                console.log("Button: " + allButtons[j].id + " ist die richtige Antwort mit " + correctAnswer);
                console.log(allButtons[j].value);
            }  else {
                allButtons[j].value = 0;
            }
        }
    }

    checkAnswer(event) {
        this.presenter.evaluate(event.target);
    }
}

// ------------------------------------------------------------------------------------------------------------------

function getQuiz() {
    let xhr = getXhr();
    sendXhr(xhr);

    function xhrHandler() {
        console.log("Status: " +xhr.readyState);
        if (xhr.readyState !== 4 ){
            return;
        }
        console.log("Status "+ xhr.readyState + " " + xhr.status);
        if (xhr.status === 200) {
            console.log("Success");
        }
    }

    function getXhr() {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else return false;
    }
    function sendXhr() {
        xhr.onreadystatechange = xhrHandler;
        xhr.open("GET", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + 2, true)
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('test@gmail.com:secret'));
        xhr.send(null);
        console.log("gesendet!");
    }
}