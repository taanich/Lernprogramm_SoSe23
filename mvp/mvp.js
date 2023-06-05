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
        this.selectedTasks = new Set();
        this.currentTask = null;
        this.totalQuestions = 0;
        this.taskCounts = {};
        this.data = null; // Variable zum Speichern der Aufgaben und Lösungen
    }

    async getTask(category) {
        console.log("Hole eine neue Aufgabe...");
        if (!this.data) {
            try {
                this.data = await this.fetchTasks();
                this.initializeTasks(category);
            } catch (error) {
                console.error("Fehler beim Laden der Aufgaben:", error);
                throw error;
            }
        } else {
            this.showRandomTask(category);
        }
        return this.currentTask;
    }

    async fetchTasks() {
        try {
            const response = await fetch("aufgaben.json");
            return response.json();
        } catch (error) {
            console.error("Fehler beim Laden der Aufgaben:", error);
            throw error;
        }
    }

    initializeTasks(category) {
        const tasks = this.data[category];
        this.taskCounts[category] = tasks.length;
        this.totalQuestions = tasks.length;
        console.log("Anzahl an geladenen Aufgaben: " + tasks.length);
        this.showRandomTask(category); // Aufgabe anzeigen
    }

    resetTasks() {
        this.selectedTasks.clear();
        this.currentTask = null;
    }

    showRandomTask(category) {
        const tasks = this.data[category];
        const remainingTasks = tasks.filter(task => !this.selectedTasks.has(task.a));

        if (remainingTasks.length === 0) {
            console.log("Alle Aufgaben wurden bereits genommen.");
            this.currentTask = null;
            return;
        }

        const randomTask = remainingTasks[Math.floor(Math.random() * remainingTasks.length)];
        this.selectedTasks.add(randomTask.a);
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
        this.m.totalQuestions = 0;
        this.correctCount = 0;
        this.v.resetProgressBar(); // Neue Methode hinzugefügt
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
        const categoryMap = {
            "math-start": "teil-mathe",
            "internet-start": "teil-internettechnologien",
            "allg-start": "teil-allgemein"
        };

        const addStartEventHandler = (buttonId, category) => {
            const startButton = document.getElementById(buttonId);
            if (startButton) {
                startButton.addEventListener("click", () => {
                    this.resetTasksAndStart(category);
                    console.log("Neu Starten...");
                }, false);
            }
        };

        for (const [buttonId, category] of Object.entries(categoryMap)) {
            addStartEventHandler(buttonId, category);
        }

        const weiterButton = document.getElementById("weiter-button");
        if (weiterButton) {
            weiterButton.addEventListener("click", () => {
                this.p.m.getTask(this.category)
                    .then((frag) => {
                        console.log("Erhaltene Aufgabe:", frag);
                        this.renderText(frag, this.category, this.p.m.totalQuestions);
                        // Weitere Logik oder Aktualisierung der Benutzeroberfläche bei Bedarf
                    })
                    .catch((error) => {
                        console.error("Fehler beim Abrufen der Aufgabe:", error);
                    });
            });
        }
    }

    resetTasksAndStart(category) {
        this.p.resetTasks();
        this.start(category);
        this.updateStatsChart(this.p.correctCount); // Hier die Methode aufrufen, um die Anzeige zu aktualisieren
    }

    resetProgressBar() {
        const progressBar = document.getElementById("progress-bar");
        progressBar.style.backgroundColor = "green";
        progressBar.style.width = "0%";
    }

    start(category) {
        this.category = category;
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
            this.renderNoTasksMessage(taskElement);
            this.clearAnswerButtons();
            return;
        }

        this.renderTask(frag, category, taskElement);
        this.renderAnswerButtons(frag, category);

        const progressBar = document.getElementById("progress-bar");
        this.initializeProgressBar(progressBar);

        this.addButtonHandlers(progressBar);
    }

    renderNoTasksMessage(taskElement) {
        const taskParagraph = document.createElement("p");
        taskParagraph.innerHTML = "Super! Du hast alle Aufgaben gelöst!";
        taskElement.appendChild(taskParagraph);
    }

    clearAnswerButtons() {
        const buttonsElement = document.getElementById("answers");
        buttonsElement.innerHTML = "";
    }

    renderTask(frag, category, taskElement) {
        const taskParagraph = document.createElement("p");
        const taskText = (category === "teil-mathe") ? "Ausgabe: " : "Aufgabe: ";
        taskParagraph.innerHTML = taskText + this.getTaskContent(frag, category);
        taskElement.appendChild(taskParagraph);
    }

    getTaskContent(frag, category) {
        return (category === "teil-mathe") ? katex.renderToString(frag.a, { throwOnError: false }) : frag.a;
    }

    renderAnswerButtons(frag, category) {
        const buttonsElement = document.getElementById("answers");
        buttonsElement.innerHTML = "";

        const answersWithIndices = frag.l.map((answer, index) => ({ answer, index }));
        const correctAnswerIndex = answersWithIndices.findIndex(entry => entry.index === 0);

        const shuffledAnswers = this.shuffleAnswers(answersWithIndices);
        shuffledAnswers.forEach(({ answer, index }) => {
            const button = document.createElement("button");
            const buttonText = (category === "teil-mathe") ? katex.renderToString(answer, { throwOnError: false }) : answer;

            button.innerHTML = buttonText;
            button.value = (index === correctAnswerIndex) ? "1" : "0";
            buttonsElement.appendChild(button);
            this.adjustButtonWidth(button);
        });
    }

    initializeProgressBar(progressBar) {
        if (progressBar.style.width === "0%") {
            progressBar.style.backgroundColor = "green";
            progressBar.style.width = "0%";
        }
    }

    addButtonHandlers(progressBar) {
        const buttonsElement = document.getElementById("answers");
        buttonsElement.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                this.handleAnswerSelection(button, progressBar);
                this.updateStatsChart(this.p.correctCount); // Hier die Methode aufrufen, um die Anzeige zu aktualisieren
            });
        });
    }

    handleAnswerSelection(button, progressBar) {
        const answerValue = button.value;
        if (answerValue === "1") {
            console.log("Richtige Antwort ausgewählt");
            this.p.increaseCorrectCount();
            this.updateProgressBarColor(progressBar, this.p.correctCount, this.p.m.totalQuestions);
        } else {
            console.log("Falsche Antwort ausgewählt");
        }

        if (!button.disabled) {
            button.disabled = true;
            this.updateStatsChart(this.p.correctCount);
        }
    }

    adjustButtonWidth(button) {
        const textWidth = button.scrollWidth;
        const textHeight = button.scrollHeight;
        button.style.width = textWidth + 'px';
        button.style.height = textHeight + 'px';
    }

    updateStatsChart(correctCount) {
        const progressBar = document.getElementById("progress-bar");
        const totalQuestions = this.p.m.totalQuestions; // Gesamtanzahl der Fragen vom Model erhalten
        const correctPercentage = (correctCount / totalQuestions) * 100;
        progressBar.style.width = correctPercentage + "%";
    }

    updateProgressBarColor(progressBar, correctCount, totalQuestions) {
        const correctPercentage = (correctCount / totalQuestions) * 100;
        if (correctPercentage === 100) {
            progressBar.style.backgroundColor = "green";
        } else if (correctPercentage >= 50) {
            progressBar.style.backgroundColor = "orange";
        } else {
            progressBar.style.backgroundColor = "red";
        }
    }
}
