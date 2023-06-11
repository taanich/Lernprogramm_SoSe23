"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const m = new Model();
    const p = new Presenter();
    const v = new View(p);
    p.setModelAndView(m, v);

    const categories = ['math', 'internet', 'allgemein', 'spanisch'];

    categories.forEach((category, index) => {
        const erfolgsquote = localStorage.getItem(`${category}Erfolgsquote`);
        if (erfolgsquote) {
            document.querySelector(`.erfolgsquote-liste li:nth-child(${index + 1}) .erfolgsquote`).textContent = `${erfolgsquote}%`;
        }
    });
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

}

// Presenter ---------------------------------------------------------------------------------------------------------
class Presenter {
    constructor() {
        this.m = null;
        this.v = null;
        this.correctCount = 0; // Variable für die richtigen Antworten
        this.incorrectCount = 0; // Variable für die falschen Antworten
    }

    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    async setTask(category) {
        let frag = await this.m.getTask(category);
        console.log("Erhaltene Aufgabe:", frag);
        this.v.renderText(frag, category, this.m.totalQuestions, this.correctCount, this.incorrectCount); // Über gebe die Anzahl der Fragen für View
        this.v.enableAnswerButtons(); // Aktiviere die Answer-Buttons
    }

    resetTasks() {
        this.m.resetTasks();
        this.correctCount = 0;
        this.incorrectCount = 0;
    }

    increaseCorrectCount() {
        this.correctCount++; // Anzahl der richtigen Antworten erhöhen
    }

    increaseIncorrectCount() {
        this.incorrectCount++; // Anzahl der falschen Antworten erhöhen
    }
}

// View --------------------------------------------------------------------------------------------------------------
class View {
    constructor(p) {
        this.p = p;  // Presenter
        this.setHandler();
        this.disableAnswerButtons(); // Deaktiviere die Answer-Buttons beim Initialisieren der View
    }

    setHandler() {
        const categoryMap = {
            "math-start": "teil-mathe",
            "internet-start": "teil-internettechnologien",
            "allgemein-start": "teil-allgemein",
            "spanisch-start": "teil-spanisch",
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
    }

    resetTasksAndStart(category) {
        this.p.resetTasks();
        this.clearStatistics(); // Neue Methode hinzufügen, um die Statistik zu leeren
        this.start(category);
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

    renderText(frag, category, totalQuestions, correctCount, incorrectCount) {
        const taskElement = document.getElementById("task");
        taskElement.innerHTML = ""; // Löschen des vorherigen Inhalts

        this.renderTask(frag, category, taskElement);
        this.renderAnswerButtons(frag, category);

        this.addButtonHandlers();

        // In der View-Klasse
        this.updateProgress(correctCount, incorrectCount, totalQuestions);
        this.renderCurrentTask(totalQuestions, this.p.m.selectedTasks.size);

        const answeredQuestions = correctCount + incorrectCount;
        if (answeredQuestions === totalQuestions) {
            this.renderEndMessage(category, totalQuestions, correctCount, incorrectCount);
            this.clearAnswerButtons();
        }
    }

    renderCurrentTask(totalQuestions, currentTaskIndex) {
        const currentTaskElement = document.getElementById("currentTask");
        currentTaskElement.textContent = `${currentTaskIndex} von ${totalQuestions} Aufgaben`;
    }

    clearAnswerButtons() {
        const buttonsElement = document.getElementById("answers-buttons");
        buttonsElement.innerHTML = "";
    }

    renderTask(frag, category, taskElement) {
        const taskParagraph = document.createElement("p");
        const taskText = (category === "teil-mathe") ? "" : "";
        taskParagraph.innerHTML = taskText + this.getTaskContent(frag, category);
        taskParagraph.style.textAlign = "center";
        taskElement.appendChild(taskParagraph);
    }

    getTaskContent(frag, category) {
        return (category === "teil-mathe") ? katex.renderToString(frag.a, { throwOnError: false }) : frag.a;
    }

    renderAnswerButtons(frag, category) {
        const buttonsElement = document.getElementById("answers-buttons");
        buttonsElement.innerHTML = "";

        const answersWithIndices = frag.l.map((answer, index) => ({ answer, index }));
        const correctAnswerIndex = answersWithIndices.findIndex(entry => entry.index === 0);

        const shuffledAnswers = this.shuffleAnswers(answersWithIndices);
        shuffledAnswers.forEach(({ answer, index }) => {
            const button = document.createElement("button");
            const buttonText = (category === "teil-mathe") ? katex.renderToString(answer, { throwOnError: false }) : answer;

            button.innerHTML = buttonText;
            button.value = (index === correctAnswerIndex) ? "correct" : "incorrect";
            buttonsElement.appendChild(button);
            this.adjustButtonWidth(button);
        });
    }

    addButtonHandlers() {
        const answerButtons = document.querySelectorAll("#answers-buttons button");
        answerButtons.forEach(button => {
            button.addEventListener("click", () => {
                const value = button.value;
                if (value === "correct") {
                    this.p.increaseCorrectCount();
                    console.log("Anzahl der richtigen Antworten:", this.p.correctCount);
                } else {
                    this.p.increaseIncorrectCount();
                    console.log("Anzahl der falschen Antworten:", this.p.incorrectCount);
                }

                const totalQuestions = this.p.m.totalQuestions;
                if (totalQuestions === (this.p.correctCount + this.p.incorrectCount)) {
                    this.renderEndMessage(this.category, totalQuestions, this.p.correctCount, this.p.incorrectCount);
                    this.clearAnswerButtons();
                } else {
                    this.p.setTask(this.category);
                }

                // In der View-Klasse
                this.updateProgress(this.p.correctCount, this.p.incorrectCount, totalQuestions);
            });
        });
    }

    adjustButtonWidth(button) {
        const width = Math.max(button.clientWidth, button.scrollWidth);
        button.style.width = width + "px";
    }

    renderEndMessage(category, totalQuestions, correctCount, incorrectCount) {
        const taskElement = document.getElementById("task");
        taskElement.innerHTML = ""; // Löschen des vorherigen Inhalts

        const resultParagraph = document.createElement("p");
        resultParagraph.textContent = `Du hast ${correctCount} von ${totalQuestions} Fragen gelöst!`;

        resultParagraph.style.textAlign = "center";

        taskElement.appendChild(resultParagraph);

        const statisticsContainer = document.getElementById("statisticsContainer");
        const canvas = document.createElement("canvas");
        canvas.id = "statisticsChart";
        statisticsContainer.prepend(canvas);

        this.renderStatistics(correctCount, incorrectCount);

        // Erfolgsquote berechnen und im Local Storage speichern
        const erfolgsquote = Math.round((correctCount / totalQuestions) * 100);

        if (category === 'teil-mathe') {
            document.querySelector('.erfolgsquote-liste li:nth-child(1) .erfolgsquote').textContent = `${erfolgsquote}%`;
            localStorage.setItem('mathErfolgsquote', erfolgsquote);
        }

        if (category === 'teil-internettechnologien') {
            document.querySelector('.erfolgsquote-liste li:nth-child(2) .erfolgsquote').textContent = `${erfolgsquote}%`;
            localStorage.setItem('internetErfolgsquote', erfolgsquote);
        }

        if (category === 'teil-allgemein') {
            document.querySelector('.erfolgsquote-liste li:nth-child(3) .erfolgsquote').textContent = `${erfolgsquote}%`;
            localStorage.setItem('allgemeinErfolgsquote', erfolgsquote);
        }

        if (category === 'teil-spanisch') {
            document.querySelector('.erfolgsquote-liste li:nth-child(4) .erfolgsquote').textContent = `${erfolgsquote}%`;
            localStorage.setItem('spanischErfolgsquote', erfolgsquote);
        }
    }

    updateProgress(correctCount, incorrectCount, totalQuestions) {
        const correctCountElement = document.getElementById("correctCount");
        const incorrectCountElement = document.getElementById("incorrectCount");

        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;

        const progressBarGreen = document.querySelector('.progress-bar-right');
        const progressBarRed = document.querySelector('.progress-bar-wrong');

        const greenWidth = (correctCount / totalQuestions) * 100;
        const redWidth = 100 - greenWidth;

        progressBarGreen.style.width = greenWidth + '%';
        progressBarRed.style.width = redWidth + '%';
    }

    renderStatistics(correctCount, incorrectCount) {
        const canvas = document.getElementById("statisticsChart");
        const ctx = canvas.getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Richtig", "Falsch"],
                datasets: [
                    {
                        label: "Fragen",
                        data: [correctCount, incorrectCount],
                        backgroundColor: ["green", "darkred"],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            precision: 0
                        },
                        max: this.p.m.totalQuestions // Skala an die Gesamtzahl der Fragen anpassen
                    }
                }
            }
        });
    }


    clearStatistics() {
        const taskElement = document.getElementById("task");
        taskElement.innerHTML = ""; // Löschen des vorherigen Inhalts

        const statisticsContainer = document.getElementById("statisticsContainer");
        statisticsContainer.innerHTML = ""; // Löschen der Statistik-Anzeige
    }

    disableAnswerButtons() {
        const answerButtons = document.querySelectorAll("#answers-buttons button");
        answerButtons.forEach(button => {
            button.style.display = "none";
        });
    }

    enableAnswerButtons() {
        const answerButtons = document.querySelectorAll("#answers-buttons button");
        answerButtons.forEach(button => {
            button.style.display = "block";
        });
    }

}
