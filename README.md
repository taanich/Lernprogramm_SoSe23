# Lernprogramm

## Beschreibung
Das Lernprogramm ist eine interaktive Webanwendung, die es den Nutzern ermöglicht aus verschiedenen Lernbereichen zu wählen und die entsprechenden Fragen interaktiv zu beantworten. Es umfasst Lernfragen zu Mathematik, Internet Technologie, Allgemeinwissen, Persönlichkeiten und Spanisch-Vokabeln. Der Nutzer kann einen Lernbereich auswählen und die Fragen beantworten, indem er den entsprechenden Button mit der richtigen Antwort auswählt. Während der Nutzung wird der Aufgaben-Fortschritt des Nutzers durch einen wachsenden Balken dargestellt, einschließlich der Anzahl der richtig und falsch beantworteten Fragen.

## Lernbereiche
Das Lernprogramm umfasst folgende Lernbereiche:

- Mathematik
- Internet Technologie
- Allgemeinwissen
- Persönlichkeiten
- Spanisch

## Funktionalitäten
Das Lernprogramm bietet eine Vielzahl von Funktionen:

-  **Vier Lernbereiche**

    Das Programm besitzt lokal gespeicherte Lernbereiche wie Mathematik, Internet Technologie, Allgemeinwissen und Spanisch.

- [x] **Aufgaben vom Server**

    Mithilfe von Ajax und REST-API werden Aufgaben aus der Kategorie "Personen" vom Server abgerufen und im Lernprogramm unter "Persönlichkeiten" dargestellt.

- [x] **Zufällige Darstellung von Aufgaben**

    Die Aufgaben werden zufällig angezeigt, um Abwechslung und Vielfalt bei der Lösung der Aufgaben zu bringen.

- [x] **Fortschrittsbalken**

    Ein Fortschrittsbalken zeigt den aktuellen Stand der Aufgabenbearbeitung an.

- [x] **Aktualisierung der Antworten**

  Die richtig und falsch beantworteten Aufgaben werden nach jeder Beantwortung aktualisiert.

- [x] **Statistik-Funktionalität**

  Am Ende eines Durchlaufs wird angezeigt, wie viele Aufgaben korrekt beantwortet wurden. Die Erfolgsquote für den Lernbereich wird lokal im Browser gespeichert, sodass beim Neuladen der Seite der aktuelle Stand weiterhin angezeigt wird.

- [x] **Responsive Design**
  
  Die Webanwendung passt sich automatisch verschiedenen Geräten wie Smartphones und Tablets an.

- [x] **Offline-Funktionalität**

    Das Lernprogramm kann als App auch Smartphones und Tablets heruntergeladen und auch ohne Internetverbindung verwendet werden.

## Installation
Um die Webanwendung zu installieren, sind folgende Schritte erforderlich:
1. Klone das Repository auf deine lokalen Computer.
2. Öffne das Terminal und wechsel in das Verzeichnis des geklonten Repositories.
3. Verschiebe das geklonte Repository in den öffentlichen HTML-Ordner deines Webservers, damit es von dort aus erreichbar ist.

Das Lernprogramm sollte nun von deinem Webserver aus erreichbar sein.

## Anwendung

Für die Anwendung des Lernprogramms wurde der Firefox Browser verwendet.

1. Öffne deine Webbrowser und gehe zur URL deines Webservers. In diesem Beispiel wird die URL< https://www.informatik.htw-dresden.de/~s83797/Lernprogramm/ verwendet.
2. Wähle ein Lernmodul im Lernbereich aus.
3. Es erscheint eine Frage. Löse die Frage, indem du die richtige Antwort auswählst.
4. Nach Auswählen einer Antwort, erscheint eine Anzeige, ob die gewählte Antwort richtig oder falsch war. 
5. Verfolge deinen Lernfortschritt über den Fortschrittsbalken und der Anzahl einer bisher richtig und falsch beantworteten Aufgaben.
6. Am Ende eines Durchlaufs wird die Anzahl der richtig beantworteten Aufgaben angezeigt.
7. Die Erfolgsquote von dem Durchlauf wird angezeigt und im Browser lokal gespeichert.
8. Um eine neue Runde zu beginnen, kann wieder im Lernbereich auf ein Lernmodul geklickt werden.

## Technologien
Das Lernprogrmamm verwendet folgende Technologien:

- JavaScript
- HTML
- CSS
- Ajax
- REST-API

## Anpassungen 
Fall Anpassungen an der Webanwendung vorgenommen werden sollen, können folgende Dateien bearbeitet werden:

- `index.html`: Hier kann das Layout und die Struktur der Webanwendung angepasst werden.
- `stylesheet.css`: Hier kann das Design und das Erscheinungsbild der Webanwendung angepasst werden.
- `mvp.js`: Hier kann die Logik der Webanwendung angepasst und neue Funktionalitäten hinzugefügt werden.
- `service-worker.js`: Hier kann der Service-Worker angepasst werden, um das Verhalten der Webanwendung bei Offline-Verfügbarkeit zu steuern

Zusätzlich kann im `manifest.webmanifest` Anpassungen vorgenommen werden, um die App-Darstellung auf Smartphones und Tablets zu beeinflussen. Hier können z.B. App-Icon, den Namen der Anwendung und weitere Einstellungen festgelegt werden.

## Autor
Das Lernprogramm wurde von Tanja Dietrich entwickelt.
