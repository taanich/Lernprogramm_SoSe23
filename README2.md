## Lernprogramm

Das Lernprogramm ist eine Webanwendung, die es Benutzern ermöglicht, Lernfragen aus verschiedenen Bereichen zu beantworten. Die Anwendung bietet Fragen aus den Bereichen Mathematik, Internet-Technologie, Allgemeinwissen und Spanisch. Der Benutzer kann einen Lernbereich auswählen und dazu die Fragen beantworten, indem er den Button mit der richtigen Antwort auswählt. Die Anwendung zeigt auch den Fortschritt des Benutzers an und wertet die Antworten in "Richtige Antwort" und "Falsche Antwort" aus. 

### Installation
Um das Lernprogramm auszuführen, müssen die folgenden Schritte ausgeführt werden:
1. Klonen des Lernprogramm-Repository auf den lokalen Computer.
2. Öffnen der `index.html`-Datei in einem Webbrowser. 

### Verwendung

Nachdem Sie die Quiz-App geöffnet haben, können Sie einen Bereich auswählen, indem Sie auf einen der Radio-Buttons klicken. Die verfügbaren Bereiche sind Mathematik, Internet-Technologie, Allgemeinwissen und Spanisch. Nach der Auswahl eines Bereichs werden Fragen zu diesem Bereich angezeigt.

Um eine Frage zu beantworten, wählen Sie die richtige Antwort aus den angegebenen Optionen aus, indem Sie auf die entsprechende Schaltfläche klicken. Nachdem Sie eine Antwort ausgewählt haben, wird die nächste Frage angezeigt. Der Fortschritt des Benutzers wird ebenfalls angezeigt.

Nachdem alle Fragen beantwortet wurden, zeigt die Anwendung die Anzahl der richtigen und falschen Antworten an. Sie können das Quiz auch zurücksetzen und ein anderes Thema auswählen, um weitere Fragen zu beantworten.

### Technologien

Die Quiz-App wurde mit HTML, CSS und JavaScript entwickelt. Sie verwendet das Model-View-Presenter (MVP)-Muster, um die Trennung von Datenmodell, Präsentationslogik und Benutzeroberfläche zu ermöglichen. Die Anwendung verwendet auch AJAX, um Quizfragen vom Server abzurufen.

### Code-Überblick

Der Code besteht aus vier Hauptkomponenten: `Model`, `Presenter`, `View` und `Server`. Diese Komponenten arbeiten zusammen, um das Quiz zu verwalten, die Fragen anzuzeigen und die Antworten des Benutzers zu verarbeiten.

- `Model`: Verwaltet den aktuellen Zustand des Quiz, einschließlich der ausgewählten Kategorie, der aktuellen Frage und der Punktzahl.
- `Presenter`: Nimmt Benutzerinteraktionen entgegen und aktualisiert das Modell entsprechend. Es kommuniziert auch mit der `View`, um die Fragen und Feedback anzuzeigen.
- `View`: Verantwortlich für die Darstellung der Fragen, Optionen und des Feedbacks auf der Benutzeroberfläche. Es empfängt Benutzeraktionen und benachrichtigt den `Presenter`.
- `Server`: Stellt die Fragen für jede Kategorie bereit und ermöglicht die Kommunikation zwischen dem Client und dem Server.

### Abhängigkeiten

Die Quiz-App verwendet HTML, CSS und JavaScript. Es werden keine zusätzlichen Frameworks oder Bibliotheken verwendet. Die App ist darauf ausgelegt, in einem modernen Webbrowser ausgeführt zu werden.

### Setup

Um das Quiz auszuführen, öffnen Sie die `index.html`-Datei in einem Webbrowser. Stellen Sie sicher, dass Sie mit dem Internet verbunden sind, um die Fragen aus dem Server abzurufen.

Bitte beachten Sie, dass die Fragen dynamisch vom Server geladen werden, daher kann es zu Verzögerungen kommen, wenn die Verbindung zum Server langsam ist.

### Quizfragen
Die Quizfragen sind in separaten Arrays für jeden Bereich definiert: Mathematik, Internet-Technologie, Allgemeinwissen und Spanisch. Jede Frage hat einen Text und eine Liste von möglichen Antworten. Der Benutzer kann die richtige Antwort auswählen, indem er auf die entsprechende Schaltfläche klickt.

### Anpassung

Sie können die Fragen in den verschiedenen Kategorien anpassen, indem Sie die entsprechenden Arrays in der Datei `script.js` bearbeiten. Sie können neue Fragen hinzufügen oder vorhandene Fragen entfernen oder ändern. Stellen Sie sicher, dass das Datenformat der Fragen beibehalten wird, um die Funktionalität der App nicht zu beeinträchtigen.

Bei Bedarf können Sie auch das Erscheinungsbild der App anpassen, indem Sie das CSS in der `styles.css`-Datei bearbeiten.

### Autoren

Diese Quiz-App wurde entwickelt von Tanja Dietrich.