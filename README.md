# Lernprogramm 
Das Lernprogramm ist eine interaktive Webanwendung, mit der Benutzer verschiedene Lernbereiche auswählen und die dazugehörigen Fragen beantworten können. Es bietet Lernfragen zu Mathematik, Internet Technologie, Allgemeinwissen, Persönlichkeiten und Spanisch-Vokabeln an. Der Benutzer kann einen Lernbereich auswählen und die Fragen beantworten, indem er den entsprechenden Button mit der richtigen Antwort auswählt. Während der Anwendung wird der Fortschritt des Benutzers angezeigt, einschließlich des aktuellen Aufgabenstandes und der Anzahl der richtig und falsch beantworteten Fragen.

## Funktionalität
Die wichtigsten Funktionen des Lernprogramms umfassen:
- Auswahl des Lernbereichs über Radio-Buttons

- Anzeige einer Überschrift basierend auf der ausgewählten Kategorie

- Anzeige von Fragen und Antwortmöglichkeiten

- Überprüfung der vom Benutzer ausgewählten Antwort

- Aktualisierung des Fortschrittsbalkens und der Anzahl der richtigen udn falschen Antworten

- Anzeige der Erfolgsquote am Ende der Lernrunde

- Speichern der Erfolgsquote für jeden Lernbereich im localStorage

## Installation 
Um das Lernprogramm auszuführen, müssen folgende Schritte ausgeführt werden:
1. Klonen Sie das Lernprogramm-Repository auf Ihren lokalen Computer.
2. Platzieren Sie das geklonte Repository im öffentlichen HTML-Ordner.

## Setup
Um das Lernprogramm vollständig nutzen zu können, stellen Sie sicher, dass Sie eine Internetverbindung haben, die Fragen vom Server abzurufen. Bitte beachten Sie, dass die Fragen und Antworten dynamisch vom Server geladen werden und es daher zu Verzögerungen kommen kann.

## Verwendung
1. Öffnen Sie die `index.html`-Datei in einem Webbrowser.
2. Wählen Sie unter Lernbereich ein Modul aus, welches Sie lernen möchten (Mathematik, Internet Technologie, Allgemeinwissen, Persönlichkeiten oder Spanisch).
3. Für jede Frage erhalten Sie vier Antwortmöglichkeiten. Die richtige Antwort wird mit einem Klick auf den richtigen Button ausgewählt.
4. Ihre Antwort wird geprüft und gibt Ihnen an, ob die gewählte Antwort richtig oder falsch war.
5. Die bisher richtig und falsch beantworteten Fragen werden dabei laufend nach jeder beantworteten Aufgabe aktualisiert
6. Nach Beantwortung aller Fragen, wird zum Schluss ausgegeben, wie viel Fragen Sie insgesamt richtig beantwortet haben.
7. Die Erfolgsquote aus der Lernrunde wird von dem entsprechenden Lernbereich unter "Meine Erfolgsquote" aktulisiert.
8. Die Lernrunde können Sie wiederholen, indem Sie unter "Lernbereiche" wieder das Modul oder ein anderes Modul auswählen.

## Technologien
Das Lernprogramm wurde mit HTML, CSS und JavaScript entwickelt. Sie verwendet das Model-View-Presenter-Architektur, um die Trennung von Datenmodell, Präsentationslogik und Benutzeroberfläche zu ermöglichen.
Die Amnwendung verwendet auch AJAX, um Quizfragen vom Server abzurufen.

## Code-Überblick 
Der Code besteht aus drei Hauptkomponenten: `Model`, `Presenter` und `View`. Dies Komponenten arbeiten zusammen, um das Quiz zu verwalten:

- `Model`: Verwaltet den aktuellen Zustand des Quiz, einschließlich der ausgewählten Kategoriem der aktuellen Frage und der Punktzahl.
- `Presenter`: Nimmt Benutzerinteraktionen entgegen und aktualisiert das Modell entsprechend. Es kommunizert auch mit der View, um due Fragen und Feedback anzuzeigen.
- `View`: Verantwortlich für die Darstellung der Fragen, Antwortmöglichkeiten und des Feedbacks auf der Benutzeroberfläche. Es empfängt Benutzerinteraktionen und benachrichtigt den `Presenter`.

## Abhängigkeiten
Das Lernprogramm verwendet HTML, CSS und JavaScript. Es werden keine zusätzlichen Frameworks oder Bibliotheken verwendet. Die Anwendung ist darauf ausgelegt, in einem modernen Webbrowser wie Firefox, GoogleChrome oder Erdge ausgeführt zu werden.

## Lernfragen
Die lokalen Lernfragen zu den Modulen Mathematik, Internet Technologie, Allgemeinwissen und Spanisch, sind in separaten Arrays definiert. JEde Frafe hat einen Text und eine Liste von Antwortmöglichkeiten.

### Anpassungen
Sie können die Fragen in den verschiedenen Modulen anpassen, indem Sie die entsprechenden Arrays in der Datei `/scripts/mvp.js` bearbeiten. Es können neue Aufgaben hinzugefügt oder vorhandene Aufgaben entfernt oder geändert werden. Wichtig ist dabei, dass das Datenformat der Fragen in JSON Format beibehalten wird, um die Funktionalität des Lernprogramms nicht zu beeinträchtigen.

## Autor
Dieses Lernprogramm wurde von Tanja Dietrich entwickelt.

