# Projektdokumentation

Diese Dokumentation behandelt die wesentlichen Komponenten der Webanwendung. Sie enthält eine Beschreibung der verwendeten HTML-Struktur, der Architektur sowie der Funktionalitäten und das Design des Lernprogramms.

Hinweise zur Entwicklung des Lernprogramms
> - Entwicklungsumgebung: PHPStorm
> - Verwendete Browser: Firefox (mit Entwicklertools), gelegentlich Google Chrome
> - URL zu Webanwendung: https://www.informatik.htw-dresden.de/~s83797/Lernprogramm/
> - Verzeichnis der Webanwendung: /home/rex/fi3/iw21/s83797/public_html/Lernprogramm

## Struktur und Aufbau des Lernprogramms
Der Aufbau des Lernprogramms besteht aus folgenden Hauptelementen:

1. `<html>`: Dieses ist das Wurzelelement der HTML-Seite und sie umfasst den gesamten Inhalt des Lernprogramms. Es kennzeichnet den Beginn des HTML-Dokuemnts.
2. `<head>`: Hier befinden sich die Metadaten und die Verweise auf externe Ressourcen, die für die Darstellung des Lernprogramms benötigt werden. Dazu gehören zum Beispiel die Dateien `stylesheet.css`, `mvp.js`, das `manifest.webmanifest` und auch die Registrierung des Service Workers.
3. `<body>`: Dieses Element enthält den sichtbaren Teil der HTML-Seite, welches im Browser dargestellt wird. Es enthält den `<header>`, `<main>` und `<footer>`.

   - `<header>`: Der Header enthält das Logo der Hochschule und den Titel der Webanwendung "Lernprogramm".
   - `<main>`: Der Hauptbereich der Anwendung enthält den Inhalt des Lenprogramms. Die `<main>` besteht aus drei Hauptkomponenten:
   
     - `<nav>`: Die Navigation stellt eine Liste der Lernbereiche dar, welche als Radio-Buttons implementiert wurden.
     - `<article>`: Der Hauptbereich enthält den Container, worin die Aufgabenstellungen und die vier Antwortmöglichkeiten angezeigt werden, wie auch den Fortschrittsbalken und die aktuelle Anzahl der richtig und falsch beantwortetetn Aufgaben.
     - `<aside>`: Die Sidebar dient hier als Anzeige des aktuellen Lernstands. Sie beinhaltet die Erfolgsquoten des Benutzers im jeweiligen Lernbereich. Die Erfolgsquoten werden in Prozent dargestellt.

   - `<footer>`: Der Footer enthält die Nebeninformationen wie das aktuelle Semester, das Modul und den Namen des Autors der Webanwendung.

### Meta-Tags
- `<meta charset="UTF-8">`: Legt die Zeichenkodierung der Webanwendung fest, um auch Sonderzeichen richtig darstellen zu können.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`: Definiert die Darstellung auf unterschiedlichen Geräten.
- `<meta name="mobile-web-app-capable" content="yes"/>`: Ermöglicht der Webanwendung als Web-App auf mobilen Geräten darzustellen.
- `<meta name="ROBOTS" content="INDEX, FOLLOW"/>`: Gibt Anweisung der Suchmaschine zur Indexierung der Webseite.
- ` <link rel="manifest" href="manifest.webmanifest">`: Verlinkung des Manifests der Webanwendung.

### Stylesheets und Skripte
- `<link rel="stylesheet" href="stylesheet.css" type="text/css"/>`: Bindet die CSS-Datei ein.
- `<script src="scripts/mvp.js" type="text/javascript" defer></script>`: Bindet das JavaScript ein, welches die MVP-Architektur besitzt.

###  Navigation
- `<nav class="lernbereiche">`: Enthält die Auswahlmöglichkeit bzw. Navigation für die verschiedenen Lernbereiche des Lernprogramms.

### Hauptseite
- `<article id="hauptseite">`: Enthält den Hauptinhalt des Lernprogramms.
- `<h2 id="headline">`: Zeigt die Überschrift der Hauptseite an. Die Überschrift wechselt, je nach Auswahl des Lernbereichs.
- `<div id="task-container">`: Dient als Container für die Darstellung der Aufgaben und Antworten.
- `<div id="question">`: Hier werden die Aufgaben dem Benutzer angezeigt.
- `<div id="options" style="display: none">`: Hier werden die vier Antwortmöglichkeiten dem Benutzer in Form von Buttons dargestellt.

#### Fortschrittsanzeige
- `<div id="progress-container">`: Dient als Container für den Fortschrittsbalken.
- `<div id="progress-bar" style="display: none"></div>`: Zeigt den Fortschrittsbalken für den Aufgabenfortschritt des Benutzers in diesem Bereich an.

#### Ergebnisanzeige
- `<div id="ergebnis-anzeige">`: Dient als Container für die Anzeige der Ergebnisse des Benutzers an.
- `<span id="richtige-antworten"></span>`: Zeigt die Anzahl der richtigen Antworten an.
- `<span id="antwort-anzeige"></span>`: Zeigt die ausgewählte Antwort an, ob diese richtig oder falsch war.
- ` <span id="falsche-antworten"></span>`: Zeigt die Anzahl der falschen Antworten an.

### Erfolgsquote
- `<aside>`: Enthält die Erfolgsquoten für die Lernbereiche in der Sidebar.
- `<div class="erfolgsquote-container">`: Dient als Container für die gesamten Erfolgsquoten je Lernbereich.
- `<div class="erfolgsquote-item">`: Beschreibt einen einzelnen Lernbereich und dessen Erfolgsquote.
- `<span class="lernbereich">Mathematik</span>`: Zeigt den Namen des Lernbereichs "Mathematik" an.
- `<span id="math-quote" class="erfolgsquote">0%</span>`: Zeigt die Erfolgsquote für den Lernbereich "Mathematik" an. Wenn nichts aktualisiert wurde, wird standardmäßig "0%" angezeigt.

### Footer
- `<footer style="display: flex; align-items: center">`: Enthält die Informationen zum Lernprogramm und zum Autor, welche zentriert dargestellt werden.

----

## Architektur
Im Rahmen dieses Projektes wurde die Model-View-Presenter (MVP)-Architektur gemäß Empfehlung des Dozenten eingesetzt, um eine klare Trennung zwischen Daten, Logik und Darstellung zu schaffen. Die Verwendung dieser Architektur ermöglicht eine effektive Strukturierung der Webanwendung und erleichtert die Wartung und Erweiterung des Codes.


### Model 
Die Klasse "Model" ist die zentrale Klasse, die die Datenverwaltung im Lernprogramm übernimmt. Sie ist verantwortlich für die Verwaltung der Aufgaben, des aktuellen Aufgabenindex sowie der Anzahl der richtigen und falschen Antworten. Das Model repräsentiert die Daten und den Zustand der Anwendung. Es reagiert nicht auf Benutzerinteraktionen, sondern kann von anderen Komponenten wie dem Presenter aktualisiert und abgerufen werden.

`initialize()`: In dieser Methode werden die Daten für das Lernprogramm initialisiert.

- `questionSet`: Die komplette Aufgabensammlung einer Kategorie wird hier als Parameter übergeben.
- `index`: Der Index der Aufgabensammlung, die während der Beantwortung der Fragen hochgezählt wird. Zu Beginn wird der Index auf 0 gesetzt.
- `correctAnswer`: Die Anzahl der richtigen Antworten des Benutzers. Initialisiert wird sie zu Beginn jeder Runde mit 0.
- `incorrectAnswer`: Die Anzahl der falschen Antworten des Benutzers. Initialisiert wird sie zu Beginn jeder Runde mit 0.
- `shuffleQuestions()`: Methode wird aufgerufen, um die Fragen der Aufgabensammlung in `questionSet` zu mischen.

```
    initialize(questionSet, index, correctAnswer, incorrectAnswer) {
        this.questionSet = questionSet;               
        this.index = index;                           
        this.correctAnswers = correctAnswer;          
        this.incorrectAnswers = incorrectAnswer;      
        this.shuffleQuestions();
    }
```


`shuffleQuestions()`: Diese Methode verwendet den Fisher-Yates-Shuffle-Algorithmus, um die Fragen in der Aufgabensammlung zu mischen, sodass bei wiederholtem durchlaufen der Aufgabensammlung die Fragen unterschiedlich gestellt werden. Der Algorithmus wurde auf Empfehlung von ChatGPT implementiert, nachdem eine Möglichkeit zum Mischen der Fragen angefragt wurde.

- Die Methode durchläuft die Aufgabensammlung vom letzten bis zur ersten Frage.
- Eine Frage wird zufällig im Bereich von 0 bis zum aktuellen Index ausgewählt.
- Die ausgewählte Frage wird mit der Frage des aktuellen Index ausgetauscht.
- Die vorherigen Schritte werden für jede Frage in der Aufgabensammlung durchlaufen, sodass die Aufgabensammlung zum Schluss durchgemischt ist. 

```
shuffleQuestions() {
        for (let i = this.questionSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questionSet[i], this.questionSet[j]] = [this.questionSet[j], this.questionSet[i]];
        }
    }
```

`getTask()`: Diese Methode liefert die Aufgabe aus der Aufgabensammlung mit dem aktuellen Index. Sollte der Benutzer sich im Mathematik-Lernbereich befinden, werden die Aufgaben mittels der Funktion `renderKatexFormula()` gerendert, die Ausdrücke in mathematische Formeln umzuwandeln.

`getOptions()`: Diese Methode gibt alle vier Antwortmöglichkeiten der jeweiligen aktuellen Aufgabenstellung zurück. Ebenso wie in der Methode `getTask()` werden die Antwortmöglichkeiten mit der Funktion `renderKatexFormula()` gerendert, wenn sich der Benutzer im Lernbereich "Mathematik" befindet.

`incrementCorrect()`: Die Anzahl der richtigen Antworten werden mit dieser Methode erhöht.

`incrementIncorrect()`: Die Anzahl der falschen Antworten werden mit dieser Methode erhöht.

`incrementIndex()`: Der Index der Aufgabensammlung wird mit dieser Methode erhöht, sodass die nächste Aufgabenstellung angezeigt wird.


###  Presenter

Die Klasse "Presenter" übernimmt die Vermittlung zwischen Model und View. Er stellt die Funktionalität bereit, um das Lernprorgamm zu steuern. Der Presenter ist verantwortlich für das Anzeigen von Fragen das Auswerten der Benutzerantworten, die Darstellung des Fortschritts und des Ergebnisses. Er reagiert auf Benutzerinteraktionen und sorgt dafür, dass das Model und die View aktualisiert werden, um Änderungen widerzuspiegeln.
Der Presenter enthält Anwendungslogik und sorgt für eine lose Kopplung zwischen Model und View. 

`setModelAndView()`: Da der Presenter mit dem Model und der View interagiert, werden beide in dieser Methode initialisiert.

`start()`: Das Lernprogramm startet mit dieser Methode, sobald auf eines der Lernbereiche geklickt wird.
- `flex`: Sie ändert die Anzeige der Antwort-Buttons und der horizontalen Linie, indem sie die Eigenschaft `display` auf `flex` gesetzt wird, da sie zuvor mit `none` ausgeschaltet wurde.
- `displayQuestions()`: Die Methode wird aufgerufen, um die aktuelle Aufgabe darzustellen.
- `updateProgressBar()`: Die Methode wird aufgerufen, um den aktuellen Fortschritt der Aufgabenbearbeitung, wie auch der bisher richtig und falsch beantworteten Fragen anzuzeigen. Da dies mit `start()` aufgerufen wird, wird jeweils der Wert 0 initial anzeigt, für den Beginn der neuen Lernrunde.
- `antwort-anzeige`: In diesem `<span>` wird ausgegeben, ob die gewählte Antwort richtig oder falsch war. Da sie mit `start()` initialisiert wird, erscheint zunächst ein leerer String `""`.

```
    start(){
        options.style.display = 'flex';
        line.style.display = 'flex';

        console.log("Runde beginnt...");
        this.displayQuestion();
        this.updateProgressBar();

        const antwortAnzeige = document.getElementById('antwort-anzeige');
        antwortAnzeige.innerHTML = "";
    }
```

`displayQuestion()`: Diese Methode ist verantwortlich für die Anzeige der Fragen.
- `question`: Das HTML-Element wird mit der Id `question` geholt, um darin die Aufgabenstellung anzuzeigen.
- Es wird anschließend geprüft, ob der aktuelle Index innerhalb des gültigen Bereichs der Aufgabensammlung liegt. Ist dies der Fall:

    - `getTask()` wird aufgerufen, um die Fragen aus der Aufgabensammlung zu erhalten und den Inhalt im `question`-Element dargestellt.
    - `getOptions()` wird aufgerufen, um die Antwortmöglichkeiten zu der Aufgabensammlung zu holen und diese auf die Antwort-Buttons mit `setButtons()` zu initialisieren.
    
- Wenn der Index außerhalb des gültigen Bereichs liegt, wurden alle Fragen beantwortet. Dabei wird die Methode `displayFinalResult()` aufgerufen, um das Endergebnis des Benutzers anzuzeigen.
- Nach jeder Runde wird der Fortschritt der Aufgabenbearbeitung mit der Methode `updateProgressBar()` aktualisiert.

```
  displayQuestion(){
        let question = document.getElementById('question');
        if(this.model.index < this.model.questionSet.length) {
            question.innerHTML= this.model.getTask();
            this.view.setButtons(this.model.getOptions());
        } else {
          this.displayFinalResult();
        }
        this.updateProgressBar();
    }
```

`evaluate(answerButton)`: Diese Methode dient dazu, um die Benutzerantwort auswerten zu können.

- Es wird zunächst geprüft, ob es sich um eine dynamische Frage handelt. Bei einer dynamischen Frage wird mithilfe der Methode `getAnswerFromServer(questionId, answerButton,value)` die Antwort vom Server abgerufen. Dabei wird die Id der Aufgabe und der hinterlegte Wert des Buttons als Parameter übergeben.
- Anschließend wird geprüft, ob die erhaltene Antwort vom Server ein "true". Ist dies der Fall, wird die Methode `correctAnswer(answerButton)` mit dem Button-Event übergeben. Andernfalls wird die Methode `incorrectAnswer()` aufgerufen. 
- Dieselbe Überprüfung wird auch bei nicht dynamischen Fragen durchgeführt, wobei überprüft wird, ob der hinterlegte Wert des Buttons "0" ist, um die richtige Antwort zu bestimmen.
- Nachdem die Aktionen ausgeführt wurden, wird die nächste Aufgabe aus der Aufgabensammlung mit `incrementIndex()` ausgewählt und mittelns `displayQuestion()` angezeigt.

Die Verwendung von `async` und `await` ermöglicht das Warten auf das Ergebnis einer asynchronen Operation. In diesem Fall ist es das Abrufen der Antwort vom Server. Dies wird benötigt, um zu gewährleisten, dass der Code synchron abläuft und auf das Ergebnis der asynchronen Operation gewartet wird, bevor die nächste Aktion fortgesetzt wird. Dadurch werden Überschneidungen oder Konflikte mit Klick-Events vermieden.  
```
    async evaluate(answerButton) {    
        if (this.model.questionSet === questionsAjax) {
            let questionId = this.model.questionSet[this.model.index].id;
            console.log("questionId: " + questionId);
            console.log("answerIndex: " + answerButton.value);

            try {
                const correctAnswer = await getAnswerFromServer(questionId, answerButton.value);
                console.log("Antwort vom Server: " + correctAnswer);

                if (correctAnswer === true) {
                    this.correctAnswer(answerButton);
                } else {
                    this.incorrectAnswer(answerButton);
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Antwort vom Server:", error);
            }
        } else {
            if (answerButton.value === "0") {
                this.correctAnswer(answerButton);
            } else {
                this.incorrectAnswer(answerButton);
            }
        }
        this.model.incrementIndex();
        this.displayQuestion();
    }
```

`correctAnswer(answerButton)`: Die Methode wird aufgerufen, wenn die ausgewählte Antwort vom Benutzer richtig ist. Dabei wird die Anzahl der richtigen Antworten mit `incrementCorrect()` um eins erhöht. Es wird ebenso die Meldung dem Benutzer ausgegeben, dass die gewählte Antwort richtig ist.

`incorrectAnswer(answerButton)`: Die Methode wird aufgerufen, wenn die ausgewählte Antwort vom Benutzer falsch ist. Dabei wird die Anzahl der falschen Antworten mit `incrementIncorret()` um eins erhöht.

`updateProgressBar()`: Hier wird die Anzeige des Fortschrittsbalkens und der Statistik für richtige und flasche Antworten aktualisiert. 

`displayFinalResult()`: Diese Methode wird aufgerufen, sobald alle Aufgaben aus der Aufgabensammlung beantwortet wurden. Sie zeigt das Endergebnis des Benutzers an, viele Aufgaben er richtig beantwortet hat.

- Basierend auf den Lernbereich, welcher der Benutzer ausgewählt hat, wird entsprechend auch die Erfolgsquote berechnet und über die Methode `updateErfolsquote(id, successrat)` mit der id des zugehörigen `<span>`, wie auch die berechnete Erfolgsquote aktualisiert.
- Die Buttons für die Antwortmöglichkeiten, wie auch die horizontale Trennlinie, werden wieder mit `display = 'none'` wieder deaktiviert.

`updateErfoldquote(id, successrate)`: Die Methode aktualisiert die Anzeige der Erfolgsquote im Bereich `<aside>`. Gleichzeitig wird die Erfolgsquote im `localStorage` gespeichert, um den aktuellen Stand beizubehalten, wenn die Seite neu geladen wird.

### View
Die Klasse "View" dient dazu, um die Darstellung der Benutzeroberfläche zu verwalten. Sie zeigt dem Benutzer die Informationen aus dem Model an und leitet Benutzerinteraktionen an den Presenter weiter. Die View enthält keine Geschäftslogik. 

`constructor`: Da die View mit dem Presenter interagiert, wird der Presenter auch in der View initialisiert. Auch werden die Buttons für die Antwortmöglichkeiten mit je einem Event-Handler durch `setHandler()` initialisiert.

`setHandler()`: Die Methode weist jedem Antwort-Button einen Event-Handler zu, welcher beim Klicken eines der Buttons die `checkAnwer()` Methode aufruft.

- `.bind(this)`: Wird verwendet, um sicherzustellen, dass der Wert von `'this''` in einer Funktion mit Kontext auf ein bestimmtes Objekt festgelegt wird.
- `false`: Gibt an, dass der Event-Handler während der Bubbling-Phase ausgeführt werden soll. Das Klick-Event wird zuerst auf dem Button selbst behandelt und dann an die übergeordneten Elemente propagiert.

`setButtons(opt)`: Diese Methode ordnet die Antwortmöglichkeiten zufällig auf den Buttons an. Dabei werden die Antwortmöglichkeiten aus den Indexen der Aufgabensammlung vom Server als Werte den Buttons zugewiesen. Diese Werte werden später für die Abfrage der richtigen Antworten verwendet, um sicherzustellen, dass sie nicht durch das Mischen der Buttons verloren gehen. Bei lokalen Aufgaben befindet sich die richtige Antwort an erster Stelle der Antwortmöglichkeiten, weshalb der Wert "0" dem Button zugeordnet wird, der die richtige Antwort enthält. 

`checkAnswer(event)`: Die Methode überprüft, ob das ausgelöste Event von einem Button stammt. Wenn das Ereignis von einem Button stammt, wird die Methode `evaluate(event.target)` des Presenters aufgerufen, um die Auswahl der Antwort des Benutzers zu überprüfen. Wenn das Ereignis nicht von einem Button stammt, wird eine entsprechende Meldung mit dem ungültigen Event-Ziel (Target) ausgegeben.

```
    checkAnswer(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') { // Kontrolle, ob Event auch Button ist!
            const buttonId = target.getAttribute('id');
            console.log('Button Id:', buttonId);
            this.presenter.evaluate(event.target);
        } else {
            console.log('Ungültiges Event-Target:', target);
        }
    }
```

----

## Design 

Das Design des Lernprogramms wurde wie folgt gestaltet:

### Farben und Schriftart

- Die Hauptfarbe `--main-color` ist weiß, während Orange `--orange-color` und `--grey-color` als zusätzliche Farben definiert sind.
- Die Schriftart würde in dem Lernprogramm mit `Arial` festegelt.
```
:root {
    --main-color: white;
    --orange-color: #ec6608;
    --white-color: #eaeaea;
    --grey-color: #333333;
}

body {
    background-color: var(--main-color) ;
    font-family: "Arial";
}
```

### Rahmen und Abstände

- `<header>`, `<article>`, `<nav>`, `<aside>` und `<footer>` haben einen Rand, einen Innenabstand und abgerundete Ecken.
- Der Rand beträgt 0.5em, der Innenabstand 0.75em und die abgerundeten Ecken haben einen Radius von 0.5em.

```
header, article, nav, aside, footer {
    margin: 0.5em;
    padding: 0.75em;
    border-radius: 0.5em;
}
```

### Überschriften

- Die Überschriften `<h2>` in den Bereichen `<nav`, `<article` und `<aside>` haben eine Schriftgröße von 20px, sind fettgedruckt und haben einen Abstand von 14px nach unten.
```
h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 14px;
}
```

### Links

- Links `<a>`haben eine schwarze Farbe und keine Unterstreichung.
```
a {color: black; text-decoration: none}
```

### Radiobuttons in der Navigation

- Die Radiobuttons und Labels in der Navigation sind in einem flexiblen Container angeordnet.
- Das ausgewählte Label für den aktiven Radiobutton wird fettgedruckt dargestellt. 
- Beim überfahrend mit der Maus ändert sich die Hintergrundfarbe des Radiobuttons in Orange.
```
.radio {
    display: flex;
    align-items: center;
    margin: 10px;
}

/* Styling für den Radiobutton */
.radio input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #ccc;
    outline: none;
    margin-right: 5px;
    transition: background-color 0.3s, border-color 0.3s;
}

/* Styling für das Label */
.radio label {
    font-size: 14px;
    color: var(--white-color);
}

/* Styling für den ausgewählten Radiobutton */
.radio input[type="radio"]:checked {
    background-color: var(--orange-color);
    border-color: var(--orange-color);
}

/* Styling für das Label des ausgewählten Radiobuttons */
.radio input[type="radio"]:checked + label {
    font-weight: bold;
}

/* Styling beim Überfahren mit dem Mauszeiger */
.radio input[type="radio"]:hover {
    background-color: var(--orange-color);
    border-color: var(--orange-color);
    cursor: pointer;
}
```

### Allgemeiner Button-Stil

- Der Container für die Antwortmöglichkeiten hat ein flexibles Layout.
- Die Buttons werden zentriert angezeigt.
- Sie haben abgerundete Ecken, einen grauen Hintergrund und eine schwarze Schrift.
- Beim Überfahren mit der Maus ändert sich die Hintergrundfarbe der Buttons in Orange und die Schriftfarbe in Weiß.
- (`.katex` - muss hier mit `pointer-event` ausgeschaltet werden, sodass es bei der Benutzung der Buttons nicht zu Überschneidungen und Fehlermeldungen beim Event-Handling kommt.) 

```
#options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.option-button {
    flex: 1 0 50%;
    margin: 5px;
}

/* Styling für die Buttons */
button {
    flex-grow: 1;
    padding: 15px;
    border: none;
    border-radius: 5px;
    background-color: #e8e8e8;
    color: #000000;
    font-size: 16px;
    margin-bottom: 10px;
    margin-right: 10px;
    transition: background-color 0.3s;
}

.katex {
    pointer-events: none; /* Sonst Fehlermeldung beim klicken des Antwortbuttons! */
}

.katex-display {
    pointer-events: none; /* Sonst Fehlermeldung beim klicken des Antwortbuttons! */
}

/* Styling beim Überfahren mit dem Mauszeiger */
button:hover {
    background-color: #ff5722;
    color: var(--white-color);
    cursor: pointer;
}
```

### Anzeige der Aufgaben

- Die Aufgaben werden zentriert angezeigt und haben einen Abstand von 15px.
- Der Fortschrittsbalken wird mit der Farbe Orange belegt und hat eine Höhe von 10px.
- Die Anzeige "X von X Aufgaben" wird in einem flexiblen Container dargestellt.
```
#question {
    margin: 15px;
    text-align: center;
    white-space: pre-wrap;
}

/* -- Progressbar -- */
#progress-container {
    display: flex;
    justify-content: stretch;
    margin-top: 20px;
}

#progress-bar {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: var(--orange-color);
    transition: width 0.3s ease-in-out;
}

/* -- Anzeige: X von X Aufgaben -- */
#aufgaben-fortschritt {
    display: flex;
    justify-content: center;
    margin: 15px;
}
```

### Anzeige der Ergebnisse 
 
 - Die Anzeige der richtigen und falschen Antworten ist zentriert. Durch `justify-content: space-between` erhalten die Elemente einen gleichmäßigen Abstand zwischen einander.
```
#ergebnis-anzeige {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 15px;
}

#ergebnis-anzeige span {
    font-size: 16px;
    color: #333;
}
```

### Anzeige der Erfolgsquote

- Die Erfolgsquoten werden in einer Spalte angezeigt.
- Jeder Lernbereich hat eine Zeile, die den Lernbereichsnamen und die Erfolgsquote enthält.
```
.erfolgsquote-container {
    display: flex; 
    flex-direction: column;
}

.erfolgsquote-item {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
    color: var(--grey-color);
}

.lernbereich {
    font-weight: bold;
    font-size: 15px;
}

.erfolgsquote {
    font-size: 15px;
}
```

### Footer

- Die Elemente des `<footers>` werden durch `justify-content: space-between;` mit gleichmäßigem Abstand zueinander dargestellt.
- Hat die Hintergrundfarbe Orange.
- Mit `align-items: center;` werden die Inhalte zentriert dargestellt.
```
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ee9e6e;
    font-weight: bold;
    text-align: center;
    padding: 18px;
}
```

### Responsive Design

- Das Layout von `<nav>`, `<article>` und `<aside>` passt sich an kleiner Bildschirme an.
- Auf kleineren Bildschirme (max-width < 1080px) wird das Layout von horizontal auf vertikal geändert. 
- Die Reihenfolge der Darstellung entspricht `<nav>`, `<article>` und `<aside`.
- `@media`: Die Media Query ermöglicht das Styling der Webanwendung auf die Eigenschaften des Anzeigegerätes anzupassen. 
```
main {
    display: flex;
    flex-direction: row; /* Ändere die Richtung auf vertikal */
}

nav {
    background-color: #5b5a5a;
    padding: 10px;
    order: 1;
    flex: 1 1 1em;
}

article {
    background-color: #cccccc;
    order: 2;
    flex: 3 3 3%;
    overflow: auto; /* Fügt bei Bedarf einen Scrollbalken hinzu */
}

#task {
    word-wrap: break-word;
    max-width: 100%;
    overflow-wrap: break-word;
}

aside {
    background-color: #e8e8e8;
    order: 3;
    flex: 1 1 1em;
}

/* Media Query für kleinere Bildschirme */
@media (max-width: 1080px) {
    main {
        flex-direction: column;
    }
}
```