"use strict";

// Radio-Buttons im Lernbereich
const mathRadioButton = document.getElementById('mathe');
const internetRadioButton = document.getElementById('internet');
const allgemeinRadioButton = document.getElementById('allgemein');
const ajaxRadioButton = document.getElementById('ajax');
const spanischRadioButton = document.getElementById('spanisch');

// Überschrift
const header = document.getElementById('headline');

// Alle Antwort-Buttons
const allButtons = document.querySelectorAll('#options > *');

// ------------------------------------------------------------------------------------------------------------------
// Aufgabenbereiche mit Aufgaben festlegen
const questionsMath = [
    {"text":"Was ist das Ergebnis von: $$x^2+x^2$$ = ?", "options":["$$2x^2$$","$$x^4$$","$$x^8$$","$$2x^4$$"]},
    {"text":"Was ist das Ergebnis von: $$x^2*x^2$$ = ?", "options":["$$x^4$$","$$x^2$$","$$2x^2$$","$$4x$$"]},
    {"text":"Was ist die Lösung dieser Gleichung: $$2x^2-5x+2$$ = 0 ?", "options":["$$x=1$$","$$x=-\\frac{1}{2}$$","$$x=2$$","$$x=\\frac{1}{4}$$"]},
    {"text":"Was ist die Ableitung von: $$f(x)=sin(x)+cos(x)$$ ?", "options":["$$f'(x)=cos(x)-sin(x)$$","$$f'(x)=sin(x)+cos(x)$$","$$f'(x)=sin(x)-cos(x)$$","$$f'(x)=-sin(x)-cos(x)$$"]},
    {"text":"Was ist der Grenzwert von: $$\\lim_{x \\to 0}$$ $$\\frac{sin(x)}{x}$$ ?", "options":["$$1$$","$$0$$","$$\\frac{1}{2}$$","$$-\\frac{1}{2}$$"]},
    {"text":"Welche ist die Determinante von: $$\\begin{bmatrix}2&-1&3&4\\end{bmatrix}$$ ?", "options":["$$11$$","$$9$$","$$7$$","$$5$$"]},
    {"text":"Welches ist die Ableitung dieser Funktion: $$f(x)=e^x\\cdot\\cos(x)$$ ?", "options":["$$f'(x)=e^x\\cdot\\cos(x)-e^x\\cdot\\sin(x)$$","$$f'(x)=e^x\\cdot\\cos(x)+e^x\\cdot\\sin(x)$$","$$f'(x)=e^x\\cdot\\sin(x)$$","$$f'(x)=e^x\\cdot\\cos(x)-e^x\\cdot\\sin(x)$$"]},
    {"text":"Was ist die Summe dieser Reihe: $$\\sum_{n=1}^{\\infty}\\frac{1}{2^n}$$ ?", "options":["1","2","$$\\frac{1}{2}$$","$$\\frac{2}{3}$$"]},
    {"text":"Was ist die Lösungsmenge dieser Gleichung: $$\\sqrt{x+3}-2=0$$ ?", "options":["$$x=1$$","$$x=2$$","$$x=4$$","$$x=7$$"]},
    {"text":"Welches ist die Koordinate des Tiefpunktes dieser Funktion: $$f(x)=e^x-3x^2$$ ?", "options":["$$(0,1)$$","$$(1,-1)$$","$$(0,-3)$$","$$(1,-3)$$"]},
    {"text":"Bestimme die Lösungsmenge dieser Gleichung: $$\\log_2(x)$$ = 3", "options":["$$\\{8\\}$$","$$\\{ \\frac{1}{8}\\}$$","$$\\{ \\frac{1}{2}\\}$$","$$\\{2^3\\}$$"]},
    {"text":"Welches Volumen hat eine Kugel mit einem Radius von $$10cm$$ ?", "options":["$$1000\\pi cm^3$$","$$300\\pi cm^3$$","$$400\\pi cm^3$$","$$100\\pi cm^3$$"]},
    {"text":"Was ist der Umfang eines gleichseitigen Dreiecks mit einer Seitenlänge von $$12cm$$ ?", "options":["$$12\\pi cm$$","$$4\\pi cm$$","$$6\\pi cm$$","$$36\\pi cm$$"]},
    {"text":"Was ist das bestimmte Integral von: $$\\int_{{0}}^{{2}}(x^2+3x)dx$$ ?", "options":["$$5$$","$$7$$","$$9$$","$$11$$"]},
    {"text":"Was ist Logarithmus von 100 zur Basis 10?", "options":["$$2$$","$$1$$","$$10$$","$$100$$"]}
];

let questionsInternet = [
    {"text":"Welche Authentifizierung bietet HTTP?", "options":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
    {"text":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen?", "options":["UDP","TCP","HTTP","Fast Retransmit"]},
    {"text":"Welche HTTP-Methode wird verwendet, um Daten an einen Server zu senden?", "options":["GET","POST","PUT","DELETE"]},
    {"text":"Welche Bedeutung hat der HTTP-Statuscode \"404\"?", "options":["Seite nicht gefunden","Zugriff verweigert","HyperText Transfer Protocol","Serverfehler"]},
    {"text":"Welche Rolle spielt das \"Hypertext Transfer Protocol Secure (HTTPS)\"?", "options":["Es verschlüsselt die Kommunikation zwischen Client und Server","Es verbessert die Geschwindigkeit der Webseite","Es ermöglichtden Zugriff auf externe APIs", "Es erlaubt das Caching von Ressourcen im Browser"]},
    {"text":"Was ist die Hauptfunktion des DNS?", "options":["Übersetzung von Domainnamen in IP-Adressen","Verschlüsselung von Datenübertragungen","Überprüfung der Website-Sicherheit","Verwaltung von E-Mail-Konten"]},
    {"text":"Welche Art von DNS Ressource Record wird verwendet, um den Mailserver für eine Domain anzugeben?", "options":["MX Eintrag","A Eintrag","CNAME Eintrag","NS Eintrag"]},
    {"text":"Was ist der Zweck von DNSSEC?", "options":["Gewährleistung der Integrität und Authentizität von DNS-Daten","Beschleunigung der DNS-Abfragen","Verschlüsselung der DNS-Kommunikation","Verhindern von DDos-Angriffen"]},
    {"text":"Welcher DNSSEC Resource Record wird verwendet, um die öffentlichen Schlüssel für die Signatur von DNS-Einträgen bereitzustellen?", "options":["DNSKEY Eintrag","DS Eintrag","RRSIG Eintrag","NSEC Eintrag"]},
    {"text":"Welche Rolle spielt ein Certificate Authority in einer PKI?", "options":["Ausstellung von Signierung von Zertifikaten","Überprüfung der Gültigkeit von Zertifikaten","Verschlüsselung von Datenübertragungen","Verwaltung der öffentlichen Schlüsseln"]},
    {"text":"Welche Art von Schlüsselpaar wird in einer PKA verwendet?", "options":["Public Key und Private Key","Symmetrischer Schlüssel und Asymmetrischer Schlüssel","RSA-Schlüssel und AES-Schlüssel","Session Key und Master Key"]},
    {"text":"Welches Protokoll wird normalerweise zum Versenden von E-Mails zwischen Mailservern verwendet?", "options":["POP3","SMTP","IMAP","HTTP"]},
    {"text":"Welche Art von Schlüssel wird normalerweise zum Signieren von E-Mails verwendet?", "options":["Public Key","Private Key","Symmetrischer Schlüssel","Session Key"]},
    {"text":"Welches Protokoll ermöglicht die Synchronisierung von E-Mails auf verschiedenen Geräten?", "options":["POP3","SMTP","IMAP","HTTP"]},
    {"text":"Was ist die Bedeutung der Abkürzung HTTP?", "options":["HyperText Transfer Protocol","HyperText Markup Language","HyperText Transport Protocol","HyperText Technology Protocol"]}
];

let questionsAllgemein = [
    {"text":"Was ist das Geburtsjahr von Karl der Große?", "options":["747","828","650","1150"]},
    {"text":"In welchem Jahr wurde die HTW Dresden gegründet?", "options":["1992","1998","1989","1987"]},
    {"text":"Welcher deutsche Schriftsteller und Dichter wurde in Dresden geboren?", "options":["Erich Kästner","Johann Wolfgang von Goethe","Heinrich Heine","Friedrich Schiller"]},
    {"text":"Welcher Planet ist der größte in unserem Sonnensystem?", "options":["Jupiter","Mars","Venus","Merkus"]},
    {"text":"Wie viele Kontinente gibt es auf der Erde?", "options":["7","5","6","4"]},
    {"text":"Welches berühmte Kunstwerk befindet sich in Dresden und zeigt eine Prozession von Fürsten?", "options":["Der Fürstenzug","Die Mona Lisa","Die David-Statue","Das Abendmahl"]},
    {"text":"Wer war der erste Präsident der Vereinigten Staaten?", "options":["George Washington","Abraham Lincoln","Thomas Jefferson","Benjamin Franklin"]},
    {"text":"Welcher berühmte Komponist war taub und komponierte dennoch Meisterwerke?", "options":["Ludwig van Beethoven","Wolfgang Amadeus Mozart","Johann Sebastian Bach","Franz Schubert"]},
    {"text":"Welches Land war das erste, das Frauen das aktive und passive Wahlrecht einführte?", "options":["Neuseeland","Deutschland","Kanada","Frankreich"]},
    {"text":"Welches ist das längste Fluss-System der Welt?", "options":["Nil","Amazonas","Mississippi-Missouri","Jangtse"]},
    {"text":"Welches ist das höchste Gebirge der Welt?", "options":["Himalaya","Anden","Alpen","Rocky Mountains"]},
    {"text":"Welches ist die meistgesprochene Sprache der Welt?", "options":["Manadrin-Chinesisch","Englisch","Spanisch","Hindi"]},
    {"text":"Welches berühmte Gebäude beherbergt unter anderem die Gemäldegalerie Alte Meister?", "options":["Zwinger","Brandenburger Tor","Schloss Neuschwanstein","Kölner Dom"]},
    {"text":"Welche weltberühmte Oper wurde von Richard Wagner in Dresden uraufgeführt?", "options":["Die Walküre","Die Zauberflöte","Carmen","Tristan und Isolde"]},
    {"text":"Welches chemische Element ist das leichteste?", "options":["Wasserstoff","Sauerstoff","Kohlenstoff","Stickstoff"]}

];

let questionsSpanisch = [
        {"text": "Was bedeutet \"Haus\" auf Spanisch?", "options": ["Casa", "Coche", "Perro", "Gato"]},
        {"text": "Wie sagt man \"Danke\" auf Spanisch?", "options": ["Gracias", "Amigo", "Hola", "Adiós"]},
        {"text": "Wie übersetzt man \"Apfel\" ins Spanische?", "options": ["Manzana", "Mesa", "Playa", "Sol"]},
        {"text": "Was bedeutet \"Schule\" auf Spanisch?", "options": ["Escuela", "Lápiz", "Flor", "Coche"]},
        {"text": "Wie sagt man \"Katze\" auf Spanisch?", "options": ["Gato", "Casa", "Perro", "Árbol"]},
        {"text": "Was bedeutet \"Wasser\" auf Spanisch?", "options": ["Agua", "Sol", "Flor", "Playa"]},
        {"text": "Wie übersetzt man \"Tisch\" ins Spanische?", "options": ["Mesa", "Perro", "Taza", "Coche"]},
        {"text": "Was bedeutet \"Buch\" auf Spanisch?", "options": ["Libro", "Casa", "Sol", "Manzana"]},
        {"text": "Wie sagt man \"Mutter\" auf Spanisch?", "options": ["Madre", "Amigo", "Padre", "Hola"]},
        {"text": "Was bedeutet \"Hund\" auf Spanisch?", "options": ["Perro", "Gato", "Coche", "Árbol"]},
        {"text": "Wie übersetzt man \"Stuhl\" ins Spanische?", "options": ["Silla", "Lápiz", "Flor", "Casa"]},
        {"text": "Was bedeutet \"Stift\" auf Spanisch?", "options": ["Lápiz", "Sol", "Coche", "Taza"]},
        {"text": "Wie sagt man \"Bruder\" auf Spanisch?", "options": ["Hermano", "Amigo", "Hola", "Padre"]},
        {"text": "Was bedeutet \"Blume\" auf Spanisch?", "options": ["Flor", "Árbol", "Perro", "Casa"]},
        {"text": "Wie übersetzt man \"Glas\" ins Spanische?", "options": ["Vaso", "Taza", "Sol", "Playa"]}
    ];

let questionsAjax = [];

// ------------------------------------------------------------------------------------------------------------------
// Radio Buttons initialisieren -------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function (){
    let model = new Model();
    let presenter = new Presenter();
    let view = new View(presenter);
    presenter.setModelAndView(model, view);

    getQuizFromServer();

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
        header.textContent = 'Persönlichkeiten';
        model.init(questionsAjax, 0, 0, 0);
        presenter.start();
    });

    spanischRadioButton.addEventListener('click', function() {
        header.textContent = 'Spanisch';
        model.init(questionsSpanisch, 0, 0, 0);
        presenter.start();
    });

    // Erfolgsquoten aus dem localStorage holen
    const lernbereiche = ['math', 'internet', 'allgemein', 'person', 'spnaisch'];
    lernbereiche.forEach((lernbereich) => {
        const quote = localStorage.getItem(`${lernbereich}-quote`);
        if (quote) {
            document.getElementById(`${lernbereich}-quote`).innerHTML = `${quote}%`;
        }
    })
});

// --------------------------------------------------------------------------------------------------------------------------
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
        const question = this.questions[this.index].text;
        console.log("Hole Aufgabe: " + question + "...")

        if (this.questions === questionsMath)
            return renderKatexFormula(question);
        else
            return question;
    }

    getOptions() {
        console.log("Hole Lösungen: " + this.questions[this.index].options + "...");
        return this.questions[this.index].options;
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

// ------------------------------------------------------------------------------------------------------------------------------
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
        this.updateProgressBar(); // Aktualisiere die Fortschrittsleiste

        const antwortAnzeige = document.getElementById('antwort-anzeige');
        antwortAnzeige.innerHTML = "";
    }

    displayQuestion(){
        let question = document.getElementById('question');

        if(this.model.index < this.model.getLength()) {
            question.innerHTML= this.model.getTask();
            this.view.setButtons(this.model.getOptions());
        } else {
          this.displayFinalResult();
        }
        this.updateProgressBar(); // Aktualisiere die Fortschrittsleiste
    }

    async evaluate(answer){
        // console.log("answer: " + answer.value)
        if (this.model.questions === questionsAjax) {
            let questionId = this.model.questions[this.model.index].id;
            console.log("questionID: " + questionId);
            console.log("answerIndex: " + answer.value);

            try {
                const correctAnswer = await getAnswerFromServer(questionId, answer.value);
                console.log("Die korrekte Antwort vom Server lautet: " + correctAnswer);
                if (correctAnswer === true) {
                    this.correctAnswer(answer);
                } else {
                    this.incorrectAnswer(answer);
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Antwort vom Server:", error);
            }
        } else {
            if (answer.value === "0") {
                this.correctAnswer(answer);
            } else {
                this.incorrectAnswer(answer);
            }
        }
        this.model.incrementIndex();
        this.displayQuestion();
    }

    correctAnswer(answer) {
        const antwortAnzeige = document.getElementById('antwort-anzeige');
        this.model.incrementCorrect();
        console.log("Antwort " + answer.attributes.getNamedItem('id').value + ' ist richtig!');
        antwortAnzeige.innerHTML = "Antwort " + answer.attributes.getNamedItem('id').value + " ist richtig!";
        console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
        console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
    }

    incorrectAnswer(answer){
        const antwortAnzeige = document.getElementById('antwort-anzeige');
        this.model.incrementIncorrect();
        console.log("Antwort " + answer.attributes.getNamedItem('id').value + ' ist falsch! ');
        antwortAnzeige.innerHTML = "Antwort " + answer.attributes.getNamedItem('id').value + " ist falsch!";
        console.log("Richtige Antworten bisher: " + this.model.correctAnswers);
        console.log("Falsche Antworten bisher: " + this.model.incorrectAnswers);
    }

    updateProgressBar() {
        const progressTask = document.getElementById('aufgaben-fortschritt');
        progressTask.innerHTML = this.model.index + " von " + this.model.getLength() + " Aufgaben";

        const progressBar = document.getElementById('progress-bar');
        progressBar.style.display = 'flex';
        const progressPercentage = (this.model.getIndex() / this.model.getLength()) * 100;
        progressBar.style.width = progressPercentage + '%';

        const richtigeAntwortenAnzeige = document.getElementById('richtige-antworten');
        const falscheAntwortenAnzeige = document.getElementById('falsche-antworten');
        richtigeAntwortenAnzeige.innerHTML = "Richtige Antworten: " + this.model.correctAnswers;
        falscheAntwortenAnzeige.innerHTML = "Falsche Antworten: " + this.model.incorrectAnswers;
    }

    displayFinalResult() {
        const question = document.getElementById('question');
        const erfolgsquote = Math.round((this.model.correctAnswers / this.model.getLength()) * 100);

        if (this.model.questions === questionsMath) {
            this.updateErfolgsquote('math-quote', erfolgsquote);
        } else if (this.model.questions === questionsInternet) {
            this.updateErfolgsquote('internet-quote', erfolgsquote);
        } else if (this.model.questions === questionsAllgemein) {
            this.updateErfolgsquote('allgemein-quote', erfolgsquote);
        } else if (this.model.questions === questionsAjax) {
            this.updateErfolgsquote('person-quote', erfolgsquote);
        } else if (this.model.questions === questionsSpanisch) {
            this.updateErfolgsquote('spanisch-quote', erfolgsquote);
        }

        question.innerHTML = "Du hast " + this.model.correctAnswers + " von " + this.model.getLength() + " Aufgaben richtig gelöst!";
        options.style.display = 'none';
        line.style.display = 'none';
    }

    updateErfolgsquote(id, erfolgsquote) {
        const erfolgsquoteElement = document.getElementById(id);
        if (erfolgsquoteElement) {
            erfolgsquoteElement.innerHTML = erfolgsquote + "%";
            localStorage.setItem(id, erfolgsquote); // Erfolgsquote in localStorage speichern
        }
    }
}

// -------------------------------------------------------------------------------------------------------------------------
// View --------------------------------------------------------------------------------------------------------------------
class View {
    constructor(presenter) {
        this.presenter = presenter;
        this.setHandler();
    }

    setHandler() {
        allButtons[0].addEventListener('click', this.checkAnswer.bind(this), false);
        allButtons[1].addEventListener('click', this.checkAnswer.bind(this), false);
        allButtons[2].addEventListener('click', this.checkAnswer.bind(this), false);
        allButtons[3].addEventListener('click', this.checkAnswer.bind(this), false);
    }

    setButtons(opt) {
        //const correctAnswer = opt[0];
        const randomIndex = Math.floor(Math.random() * allButtons.length);

        if (this.presenter.model.questions === questionsMath) {
            allButtons[randomIndex].innerHTML = renderKatexFormula(opt[0]);
            allButtons[(randomIndex + 1) % allButtons.length].innerHTML = renderKatexFormula(opt[1]);
            allButtons[(randomIndex + 2) % allButtons.length].innerHTML = renderKatexFormula(opt[2]);
            allButtons[(randomIndex + 3) % allButtons.length].innerHTML = renderKatexFormula(opt[3]);
        } else {
            allButtons[randomIndex].innerHTML = opt[0];
            allButtons[(randomIndex + 1) % allButtons.length].innerHTML = opt[1];
            allButtons[(randomIndex + 2) % allButtons.length].innerHTML = opt[2];
            allButtons[(randomIndex + 3) % allButtons.length].innerHTML = opt[3];
        }


        allButtons[randomIndex].value = 0;
        allButtons[(randomIndex + 1) % allButtons.length].value = 1;
        allButtons[(randomIndex + 2) % allButtons.length].value = 2;
        allButtons[(randomIndex + 3) % allButtons.length].value = 3;


        /*
        if (this.presenter.model.questions === questionsAjax) {
            console.log("Ajax Aufgabe!");
            allButtons[randomIndex].value = 0;
            allButtons[(randomIndex + 1) % allButtons.length].value = 1;
            allButtons[(randomIndex + 2) % allButtons.length].value = 2;
            allButtons[(randomIndex + 3) % allButtons.length].value = 3;
        } else {
            console.log("Keine Ajax Aufgabe!");
            allButtons[randomIndex].value = 1;
            allButtons[(randomIndex + 1) % allButtons.length].value = 0;
            allButtons[(randomIndex + 2) % allButtons.length].value = 0;
            allButtons[(randomIndex + 3) % allButtons.length].value = 0;

            console.log("Button: " + allButtons[randomIndex].id + " hat die richtige Antwort");
            console.log(allButtons[randomIndex].value);
        }
        /*
         */
    }

    // mit Ausgabe an Console - Kontrolle, ob Event auch Button ist!
    checkAnswer(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const buttonId = target.getAttribute('id');
            console.log('Button ID:', buttonId);
            this.presenter.evaluate(event.target);
        } else {
            console.log('Ungültiges Event-Target:', target);
        }
    }
}

// ------------------------------------------------------------------------------------------------------------------
// GET QUIZ ---------------------------------------------------------------------------------------------------------
function getQuizFromServer() {
    let questionIds = [];
    let xhr = getXhr();
    sendXhr(xhr);

    function xhrHandler() {
        console.log("Status: " +xhr.readyState);
        if (xhr.readyState !== 4 ){
            return;
        }

        console.log("Status "+ xhr.readyState + " " + xhr.status);
        if (xhr.status === 200) {
            const jsonObject = JSON.parse(xhr.responseText);
            console.log("JSON-Object");
            console.log(jsonObject);

            if (!questionIds.includes(jsonObject.id)) { // prüfen, ob id bereits vorhanden
                questionIds.push(jsonObject.id);

                questionsAjax.push({
                    "id": jsonObject.id,
                    "text": jsonObject.text,
                    "options": jsonObject.options,
                });

                if (questionsAjax.length === 15) {
                    console.log("Alle Fragen wurden erfolgreich abgerufen:");
                    console.log(questionsAjax);
                } else {
                    sendXhr(); // Neue Anfrage senden, bis 15 Fragen erhalten wurden
                }

                console.log("Success!");
            }
        }
    }

    function getXhr() {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else return false;
    }

    function sendXhr() {
        let i;
        do {
            i = Math.floor(Math.random() * (33 - 2 + 1)) + 2;
        } while (questionIds.includes(i)); // Prüfung auf doppelte Werte

        xhr.onreadystatechange = xhrHandler;
        xhr.open("GET", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + i, true)
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('test@gmail.com:secret'));
        xhr.send(null);
        console.log("Anfrage gesendet!");
    }
}

// ------------------------------------------------------------------------------------------------------------------
// POST QUIZ --------------------------------------------------------------------------------------------------------
function getAnswerFromServer(id, answer) {
    return new Promise((resolve, reject) => {
        let xhr = getXhr();
        sendXhr(xhr);

        function xhrHandler() {
            console.log("Status: " + xhr.readyState);
            if (xhr.readyState !== 4) {
                return;
            }

            console.log("Status " + xhr.readyState + " " + xhr.status);
            if (xhr.status === 200) {
                const jsonObject = JSON.parse(xhr.responseText);
                console.log("JSON-Object");
                console.log(jsonObject);
                const correctAnswer = jsonObject.success;
                resolve(correctAnswer); // Auflösen der Promise mit dem Wert
            } else {
                reject(new Error("Fehler beim Abrufen der Antwort vom Server")); // Ablehnen der Promise mit einem Fehler
            }
        }

        function getXhr() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                reject(new Error("XMLHttpRequest wird nicht unterstützt"));
            }
        }

        function sendXhr(xhr) {
            xhr.onreadystatechange = xhrHandler;
            xhr.open( "POST", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + id + "/solve", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa("test@gmail.com:secret")
            );
            xhr.send(JSON.stringify([answer]));
            console.log("Request send");
        }
    });
}

// ----------------------------------------------------------------------------------------------------------------------
// Katex Rendern --------------------------------------------------------------------------------------------------------
function renderKatexFormula(formula) {
    const regex = /\$\$(.*?)\$\$/g; // Regex-Muster für $$-Tags
    return formula.replace(regex, (match, p1) => {
        try {
            return katex.renderToString(p1, { throwOnError: false }); //displayMode: true für Zeilenumruch für jedes $$
        } catch (error) {
            console.error("Fehler beim Rendern der Formel:", error);
            return match; // Falls ein Fehler auftritt, beibehalten wir den ursprünglichen Tag
        }
    });
}

// ----------------------------------------------------------------------------------------------------------------------
// Callback - Funktion
/*
function handleAnswerFromServer(correctAnswer){
    console.log("Die korrekte Antwort vom Server lautet: " + correctAnswer);
    return correctAnswer;
}
*/