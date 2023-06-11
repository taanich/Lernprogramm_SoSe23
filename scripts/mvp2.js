"use strict";

// Radio-Buttons im Lernbereich
const mathRadioButton = document.getElementById('mathe');
const internetRadioButton = document.getElementById('internet');
const allgemeinRadioButton = document.getElementById('allgemein');

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

    getAnswer() {
        return this.questions[this.index].correctAnswer;
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


    getTaskAll(i) {
        if (this.questions === questionsMath)
            return katex.renderToString(this.questions[i].a);
        else
            return this.questions[i].a;
    }

    getAnswerAll(i) {
        let corr = this.questions[i].correctAnswer;
        return this.questions[i].l[corr];
    }

    incrementIndex() {
        this.index +=1;
    }

    getIndex() {
        //console.log("Aufgabe: " + this.index);
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
    }

    displayQuestion(){
        let question = document.getElementById('question');
        question.innerHTML= this.model.getTask();
        this.view.setButtons(this.model.getOptions());
    }

    evaluate(answer){
        if(this.model.getIndex() < this.model.getLength()) {                    // Prüfen, ob aktueller Index kleiner als Gesamtlänge ist (Idee: statt Index den Counter prüfen)
            if (answer === this.model.getAnswer(this.model.getIndex())) {
                this.model.incrementCorrect();
                console.log("Antwort " + answer + ' ist richtig!');
                console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
                console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
            } else {
                this.model.incrementIncorrect();
                console.log("Antwort " + answer + ' ist falsch! ');
                console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
                console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
            }

           // this.setCorrectAnswers();

            if (this.model.getIndex() === this.model.getLength()) {     // Zum Schluss alle Aufgaben anzeigem
                for(let i = 0; i < this.model.getLength(); i++)
                    this.view.displayTaskAnswer(this.model.getTaskAll(i), this.model.getAnswerAll(i));
                return;
            }
            this.model.incrementIndex();

            this.displayQuestion();
        }
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
        //const randomIndex = Math.floor(Math.random() * allButtons.length);

        allButtons[0].textContent = i[0];
        allButtons[1].textContent = i[1];
        allButtons[2].textContent = i[2];
        allButtons[3].textContent = i[3];
    }

    checkAnswer(event) {
        this.presenter.evaluate(String(event.target.attributes.getNamedItem('id').value));          // Ereignisobjekt "event" enthält Informationen über das ausgelöste Ereignis und das Zielobjekt, auf das geklickt wurde
    }                                                                                                           // "event.target" gibt das Element zurück, auf das geklickt wurde, also den Antwortbutton
                                                                                                                // "attributes.getNamedItem('id')" wird das Attribut "id" des Antwort-Buttons abgerufen
                                                                                                                // "value" gibt den Wert des "id"-Attributs des Antwort-Buttons zurück (A, B, C, D) - Wert wird dann in String() umgewandelt → als Argument für "evaluate(answer)"
    displayTaskAnswer(q, a) {
        let result = document.getElementById('result');
        let question = document.createElement("div");
        let answer = document.createElement("div");

        question.style.marginTop = "5px";
        question.innerHTML ="Frage: " + q;
        answer.innerHTML ="Richtige Antwort: " + a;

        result.appendChild(question);
        result.appendChild(answer);
    }
}
