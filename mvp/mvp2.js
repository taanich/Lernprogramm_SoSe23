"use strict";

document.addEventListener('DOMContentLoaded', function () {
    let m = new Model();
    let p = new Presenter();
    let v = new View(p);
    p.setModelAndView(m, v);
});

// Model -------------------------------------------------------------------------------------------------------------
class Model {
    constructor() {
        // Array an Aufgaben
        this.selectedTasks = new Set(); // Set, um bereits ausgewählte Aufgaben zu speichern
        this.currentTask = null; // Aktuelle Aufgabe
        this.totalQuestions = 0; // Gesamtanzahl der Fragen
        this.taskCounts = {}; // Anzahl der Aufgaben pro Kategorie
    }

    // Holt eine Frage aus dem Array, zufällig ausgewählt oder vom Server
    getTask(category) {
        console.log("Hole eine neue Aufgabe...");
        return fetch("aufgaben.json")
            .then((response) => response.json())
            .then((data) => {
                // Aufgaben und Lösungen anzeigen
                this.showTask(data, category);
                return this.currentTask; // Rückgabe der ausgewählten Aufgabe
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Aufgaben:", error);
            });
    }

    // Methode, um die Anzahl der Aufgaben in der JSON-Datei für eine Kategorie zu erhalten
    // Methode, um die Anzahl der Aufgaben in der JSON-Datei für eine Kategorie zu erhalten
    async getTaskCount(category) {
        if (this.taskCounts[category] !== undefined) {
            // Falls die Anzahl der Aufgaben für die Kategorie bereits bekannt ist,
            // geben wir den gespeicherten Wert zurück
            return this.taskCounts[category];
        } else {
            // Ansonsten laden wir die JSON-Datei und ermitteln die Anzahl der Aufgaben
            try {
                const response = await fetch("aufgaben.json");
                const data = await response.json();
                const tasks = data[category];
                const taskCount = tasks.length;
                //this.taskCounts[category] = taskCount; // Speichern der Anzahl der Aufgaben für die Kategorie
                this.totalQuestions = taskCount; // Setzen von totalQuestions auf die Anzahl der Aufgaben
                console.log("Anzahl an geladenen Aufgaben: " + taskCount);
                return taskCount;
            } catch (error) {
                console.error("Fehler beim Laden der Aufgaben:", error);
                throw error;
            }
        }
    }


    resetTasks() {
        this.selectedTasks.clear(); // Zurücksetzen der ausgewählten Aufgaben
    }

    showTask(data, category) {
        const tasks = data[category];

        // Filtere die verbleibenden Aufgaben, um bereits ausgewählte Aufgaben auszuschließen
        const remainingTasks = tasks.filter(task => !this.selectedTasks.has(task.a));

        // Überprüfe, ob alle Aufgaben bereits ausgewählt wurden
        if (remainingTasks.length === 0) {
            console.log("Alle Aufgaben wurden bereits genommen.");
            this.currentTask = null;
            return;
        }

        // Wähle eine zufällige Aufgabe aus den verbleibenden Aufgaben aus
        const randomTask = remainingTasks[Math.floor(Math.random() * remainingTasks.length)];

        // Füge die ausgewählte Aufgabe dem Set der bereits ausgewählten Aufgaben hinzu
        this.selectedTasks.add(randomTask.a);

        // Erhöhe die Gesamtanzahl der Fragen
        this.totalQuestions = this.getTaskCount(category);

        // Gib die ausgewählte Aufgabe zurück
        this.currentTask = randomTask;
        console.log("Aktuelle Aufgabe:", this.currentTask);
    }


    checkAnswer() {
        // TODO
    }
}

// Presenter ---------------------------------------------------------------------------------------------------------
class Presenter {
    constructor() {
        this.anr = 0;
        this.m = null;
        this.v = null;
        this.correctCount = 0; // Variable für die richtigen Antworten
    }

    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    async setTask(category) {
        let frag = await this.m.getTask(category);
        console.log("Erhaltene Aufgabe:", frag);
        this.v.renderText(frag, category, this.m.totalQuestions, this.correctCount); // Über gebe die Anzahl der Fragen für View
    }

    resetTasks() {
        this.m.resetTasks();
        this.m.totalQuestions = 0; // Gesamtanzahl zurücksetzen
        this.correctCount = 0; // Zurücksetzen der korrekten Antworten
    }

    increaseCorrectCount() {
        this.correctCount++; // Anzahl der richtigen Antworten erhöhen
    }
}

// View --------------------------------------------------------------------------------------------------------------

class View {
    constructor(p) {
        this.p = p;  // Presenter
        this.setHandler();
        // Binden der updateStatsChart-Methode an die aktuelle Instanz
        this.updateStatsChart = this.updateStatsChart.bind(this);
    }

    setHandler() {
        let category = null;

        const mathStart = document.getElementById("math-start");
        if (mathStart) {
            mathStart.addEventListener("click", () => {
                this.resetTasksAndStart("teil-mathe");
                console.log("Neu Starten...");
                category = "teil-mathe";
            }, false);
        }

        const internetStart = document.getElementById("internet-start");
        if (internetStart) {
            internetStart.addEventListener("click", () => {
                this.resetTasksAndStart("teil-internettechnologien");
                console.log("Neu Starten...");
                category = "teil-internettechnologien";
            }, false);
        }

        const allgStart = document.getElementById("allg-start");
        if (allgStart) {
            allgStart.addEventListener("click", () => {
                this.resetTasksAndStart("teil-allgemein");
                console.log("Neu Starten...");
                category = "teil-allgemein";
            }, false);
        }

        /*
        const gradesStart = document.getElementById("grades-start");
        if (gradesStart) {
          gradesStart.addEventListener("click", () => this.start("teil-noten"), false);
        }
        */

        const weiterButton = document.getElementById("weiter-button");
        weiterButton.addEventListener("click", () => {
            this.p.m.getTask(category)
                .then((frag) => {
                    console.log("Erhaltene Aufgabe:", frag);
                    this.renderText(frag, category, this.p.m.totalQuestions);
                    // Weitere Logik oder Aktualisierung der Benutzeroberfläche bei Bedarf
                })
                .catch((error) => {
                    console.error("Fehler beim Abrufen der Aufgabe:", error);
                });
        });
    }

    resetTasksAndStart(category){
        this.p.resetTasks();
        this.start(category);
    }

    start(category) {
        this.p.setTask(category);
    }

    // Fisher-Yates-Shuffle-Algorithmus
    shuffleAnswers(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    renderText(frag, category, totalQuestions, correctCount) {
        const taskElement = document.getElementById("task");
        taskElement.innerHTML = ""; // Löschen des vorherigen Inhalts

        if (!frag) {
            const taskParagraph = document.createElement("p");
            taskParagraph.innerHTML = "Alle Aufgaben wurden bereits genommen.";
            taskElement.appendChild(taskParagraph);

            const buttonsElement = document.getElementById("answers");
            buttonsElement.innerHTML = ""; // Löschen der Antwort-Buttons

            return;
        }

        if (category === "teil-mathe") {
            // Aufgabe mit KaTeX rendern
            const taskParagraph = document.createElement("p");
            const taskExpression = katex.renderToString(frag.a, { throwOnError: false });
            taskParagraph.innerHTML = "Ausgabe: " + taskExpression;
            taskElement.appendChild(taskParagraph);
        } else {
            const taskParagraph = document.createElement("p");
            taskParagraph.innerHTML = "Aufgabe: " + frag.a;
            taskElement.appendChild(taskParagraph);
        }

        const buttonsElement = document.getElementById("answers");
        buttonsElement.innerHTML = "";

        const answersWithIndices = frag.l.map((answer, index) => ({ answer, index }));
        const correctAnswerIndex = answersWithIndices.findIndex(entry => entry.index === 0); // Index der richtigen Antwort speichern

        if (category === "teil-mathe") {
            //const answersWithIndices = frag.l.map((answer, index) => ({ answer, index }));
            //const correctAnswerIndex = answersWithIndices.findIndex(entry => entry.index === 0); // Index der richtigen Antwort speichern

            const shuffledAnswers = this.shuffleAnswers(answersWithIndices);
            shuffledAnswers.forEach(({ answer, index }) => {
                const button = document.createElement("button");
                const solutionExpression = katex.renderToString(answer, { throwOnError: false });
                button.innerHTML = solutionExpression;
                button.value = (index === correctAnswerIndex) ? "1" : "0"; // Wert 1 für richtige Antwort, Wert 0 für falsche Antworten
                buttonsElement.appendChild(button);
                adjustButtonWidth(button);
            });
        } else {
            //const answersWithIndices = frag.l.map((answer, index) => ({ answer, index }));
            //const correctAnswerIndex = answersWithIndices.findIndex(entry => entry.index === 0); // Index der richtigen Antwort speichern

            const shuffledAnswers = this.shuffleAnswers(answersWithIndices);
            shuffledAnswers.forEach(({ answer, index }) => {
                const button = document.createElement("button");
                button.innerHTML = answer;
                button.value = (index === correctAnswerIndex) ? "1" : "0"; // Wert 1 für richtige Antwort, Wert 0 für falsche Antworten
                buttonsElement.appendChild(button);
                adjustButtonWidth(button);
            });
        }

        let incorrectCount = 0;

        let progressBar = document.getElementById("progress-bar");
        progressBar.style.backgroundColor = "green";
        progressBar.style.width = "0%";

        // Button-Handler hinzufügen
        buttonsElement.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const answerValue = button.value;
                if (answerValue === "1") {
                    console.log("Richtige Antwort ausgewählt");
                    this.p.increaseCorrectCount();
                } else {
                    console.log("Falsche Antwort ausgewählt");
                    incorrectCount++;
                }

                // Nur die erste richtige Antwort zählt
                if (!button.disabled) {
                    button.disabled = true; // Deaktiviere den Button, um weitere Klicks zu verhindern
                    this.updateStatsChart(this.p.correctCount); // Aktualisiere das Diagramm
                }

            });
        });

        function adjustButtonWidth(button) {
            const textWidth = button.scrollWidth;
            const textHeight = button.scrollHeight;
            button.style.width = textWidth + 'px';  // Anpassung der Breite
            button.style.height = textHeight + 'px'; // Anpassung der Höhe
        }
    }

    updateStatsChart(correctCount) {
        const progressBar = document.getElementById("progress-bar");
        const totalQuestions = this.p.m.totalQuestions; // Gesamtanzahl der Fragen vom Model erhalten
        const correctPercentage = (correctCount / totalQuestions) * 100;
        progressBar.style.width = correctPercentage + "%";
    }
}