# Lernportfolio

In diesem Lernportfolio möchte ich meine Fortschritte, Erfahrungen und Lernerfolge zur Entwicklung des Lernprogramm-Projekts teilen.

## Lernerfolge
Während der Entwicklung des Lernprogramms habe ich einige Erfolge erzielen und meine Fähigkeiten in den folgenden Bereichen verbessern bzw. erweitern können:

1. Strukturierung des Lernprogramms mit HTML

- Zu Beginn der Entwicklung habe ich mit der Struktur des Lernprogramms beschäftigt. Dabei habe ich mich an die Vorlesung und das Praktikum orientiert und gelernt, wie man HTML-Tags verwendet, um eine klare Struktur zu erstellen
- Auch habe ich gelernt, wie man mit den Attributen der HTML-Tags umgeht. Zum Beispiel wie die Tags anhand von `id` und `class` später im JavaScript weiter verwendet werden können.

2. Design des Lernprogramms mit CSS

- Mit CSS habe ich mich auseinandergesetzt und dabei die Gestaltung und Formatierung des Lernprogramms gelernt. Hier habe ich mich auch an die Vorlesung und an das Praktikum orientiert, wurde allerdings auch selbst
  kreativ und habe z.B. unterschiedliche Möglichkeiten der Darstellung der Navigation ausprobiert oder wie die Buttons für die Antwortmöglichkeiten beim drüberfahren der Maus dargestellt werden können. Für das
  Lernprogramm habe ich mich dazu entschieden passend zum HTWD Logo das Design des Lernprogramms zu gestalten.

3. Integration von Funktionalitäten mit JavaScript
- Mit JavaScript habe ich gelernt, wie ich einzelne Elemente und Funktionen in das Lernprogramm implementieren kann. Ein Beispiel wäre dafür die Umsetzung eines Fortschrittsbalkens, der den Aufgabenfortschritt des Benutzers visuell darstellt.
- Außerdem habe ich versucht, eine grafische Darstellung der richtigen und falschen Antworten als Balkendiagramm am Ende einer Lernrunde einzufügen. Leider hat das nut teilweise funktioniert, da sich die Darstellung nach jeder neuen Aufgabe
  zurückgesetzt hat und damit den aktuellen Stand des Benutzers nicht richtig dargestellt hat.
- Zusätzlich konnte ich erfolgreiche das lokale Speichern der Erfolgsquoten umsetzen, sodass sie auch nach dem Neuladen der Seite weiterhin verfügbar sind.

4. Responsive-Design
- Das responsive Design konnte ich erfolgreich umsetzen, sodass die Webanwendung an verschiedenen Bildschirmgrößen und Geräten angepasst wird. Dabei habe ich auch das Entwicklertool von Firefox verwendet, um das Design anzupassen und sicherzustellen,
  dass die Inhalte auf allen Geräten richtig dargestellt werden.

5. Ajax-Request
- Die Ajax-Requests konnte ich auch erfolgreich für das Lernprogramm umsetzen, um die Aufgaben und Antworten vom Quiz-Server abzurufen. Ebenso ist es mir gelungen einen eigenen Account anzulegen und eigene Aufgaben zu erstellen und hochzuladen.

5. Unterstützung durch ChatGPT
- Für das Mischen der Aufgaben in der Aufgabensammlung habe ich den Fisher-Yates-Algorithmus umgesetzt, welches ChatGPT mir auf Anfrage vorgeschlagen hat, um zu gewährleisten, dass die Aufgaben nach jeder neuen Runde neu gemischt werden.
- Zudem habe ich auch einen Vorschlag für ein Webmanifest angenommen und dabei die Farbe und den Namen entsprechend dem Lernprogramm angepasst.

## Misserfolge

Es gab auch (kleinere) Herausforderungen während der Entwicklung des Projektes:

1. Anpassung des Button-Handlers
- Bei der Anpassung der Buttons, basierend auf den Antworten vom Server, bin ich auch Schwierigkeiten gestoßen. Zuvor habe ich die Lösungsmöglichkeiten zu gestaltet, dass die richtige Antwort immer an erster Stelle stand und den Buttons so zugewiesen und erst dann gemischt.
  Allerdings musste ich dies anpassen, da das JSON-Object für die Antworten vom Serves anders strukturiert ist, was etwas Zeit in Anspruch genommen hat, um dies anzupassen.

2. Schwierigkeiten mathematische Formeln mit Katex zu rendern
- Für das Rendern der mathematischen Formeln stieß ich auf Herausforderungen, bei der mir ChatGPT geholfen hat, diese zu lösen. Zuvor konnten die Lösungsmöglichkeiten nicht mit Katex gerendert werden, da sie als Objekt nicht mehr als gültigen Parameter für die einzelnen Methoden erkannt wurde. 
Mithilfe von ChatGPT konnte ich das Rendern anpassen, indem nicht der gesamte Inhalt gerendert wird, sondern durch reguläre Ausdrücke nur die explizite mathematische Formel gerendert werden. So ist es mir später gelungen, die mathematischen Ausdrücke auch auf den Antwort-Buttons darzustellen.

3. Schwierigkeit beim Event-Handling
- Nachdem ich die mathematischen Ausdrücke auf den Antwort-Buttons erfolgreich rendern konnte, war es nicht mehr möglich das Klick-Event der Buttons auszuwerten. Es wurde eine Fehlermeldung ausgelöst, sobald auf den Antwort-Button geklickt wurde.
Mithilfe von ChatGPT konnte ich das Problem lösen, in dem der darüberliegende Katex-Tag mit der Eigenschaft `pointer-events: none;` deaktiviert wird, um so wieder das Klick-Event auf die Antwort-Buttons zuordnen zu können. 

4. Schwierigkeiten bei der Umsetzung der Offline-Funktionalität 
- Anhand des Beispiels von Herrn Prof. Vogt, habe ich versucht den Service Worker in mein Lernprogramm zu integrieren. Leider funktionierte dies nicht vollständig, da der Service Worker meist nur registriert, aber nicht installiert bzw. aktiviert wird. Zum Teil hat es funktioniert, dass der Service Worker
aktiviert wurde, aber dies geschah eher zufällig. Auch mithilfe von ChatGPT konnte ich diesen Fehler lösen.

ChatGPT wurde überwiegend für das Debuggen bei kleineren Fehlermeldungen verwendet, da es schnell z.B. Schreibfehler erkannte oder hilfreiche Hinweise bot. Allerdings war es nicht immer hilfreich, da es bei Schwierigkeiten wie z.B. mit dem Service Worker nur begrenzt helfen konnte und entsprechend wiederholt die gleichen 
Lösungsvorschläge anbot.

 
## Fazit 
Trotz der kleineren Herausforderungen bin ich zufrieden mit meinem erreichten Lernerfolg. Ich habe erfolgreich Ajax-Requests implementiert, um Aufgaben und Antworten vom Server abzurufen und konnte sogar eigene Fragen über meinen persönlichen Account erstellen und hochladen. 
Das Projekt hat meine Fähigkeiten in HTML, CSS und JavaScript erweitert und wertvolle Erfahrungen im Umgang mit Ajax vermittelt.
Ich bin zuversichtlich, dass ich auch in Zukunft weiterhin meinen Fähigkeiten in diesem Bereich erweitern werde und dies auch für private Projekte nutzen werde.

## Vorschläge zur Erweiterung des Beleges
- Sobald eine bestimmte Erfolgsquote erreicht wurde (z.B. 80%), könnte ein Abschlusstest für den jeweiligen Lernbereich freigeschaltet werden, welches auf Zeit gelöst werden muss, um die Schwierigkeit zu erhöhen.
- Aufgaben, welche vom Benutzer öfters falsch beantwortet wurden, werden öfters in der Lernrunde angezeigt, um diese richtig zu lernen.
- Hinzufügen von Erklärungstexten oder Rechenwegen bei mathematischen Aufgaben, um dem Benutzer aufzuzeigen, warum die Antwort richtig bzw. falsch war.
- Hinzufügen von Texteingaben des Benutzers z.B, bei Lückentext Aufgaben, um die Interaktivität mit dem Lernprogramm zu erhöhen.