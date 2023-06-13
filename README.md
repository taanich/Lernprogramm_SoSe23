## Quiz-App

Dies ist eine Quiz-App, die verschiedene Fragen in den Bereichen Mathematik, Internet Technologie, Allgemeinwissen und Spanisch stellt. Die App bietet mehrere Kategorien zur Auswahl und zeigt Fragen mit mehreren Antwortmöglichkeiten an. Der Benutzer kann eine Antwort auswählen und erhält Feedback über die Richtigkeit seiner Antwort. Die App enthält auch eine Punktzählung, um den Fortschritt des Benutzers zu verfolgen.

### Verwendung

Um das Quiz zu starten, wählen Sie eine Kategorie aus den verfügbaren Optionen aus. Klicken Sie auf den entsprechenden Radio-Button, um die Fragen in dieser Kategorie anzuzeigen. Die Fragen werden dynamisch geladen und angezeigt. Wählen Sie eine Antwort aus den vorgegebenen Optionen aus, indem Sie auf den entsprechenden Button klicken. Sie erhalten sofortiges Feedback zu Ihrer Antwort. Um das Quiz zurückzusetzen und erneut zu starten, wählen Sie eine andere Kategorie aus.

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

### Anpassung

Sie können die Fragen in den verschiedenen Kategorien anpassen, indem Sie die entsprechenden Arrays in der Datei `script.js` bearbeiten. Sie können neue Fragen hinzufügen oder vorhandene Fragen entfernen oder ändern. Stellen Sie sicher, dass das Datenformat der Fragen beibehalten wird, um die Funktionalität der App nicht zu beeinträchtigen.

Bei Bedarf können Sie auch das Erscheinungsbild der App anpassen, indem Sie das CSS in der `styles.css`-Datei bearbeiten.

### Autoren

Diese Quiz-App wurde entwickelt von Tanja Dietrich.