# Projektdokumentation

## Stuktur und Design der Webanwendung
Die Webanwendung besteht aus einer HTML-Datei, einer CSS-Datei und mehreren JavaScript-Dateien, die zusammenarbeiten, um das Lernprogramm zu erstellen. Der Code ist in HTML, CSS und JavaScript geschrieben und verwendet die MVP (Model-View-Presenter)-Architektur.

### HTML-Struktur
Die HTML-Datei enthält die grundlegende Struktur der Webanwendung. Sie besteht aus den folgenden Hauptkomponenten:

- `<!doctype html>`: Diese Deklaration der Datei gibt an, dass es sich um ein HTML5-Dokument handelt.
- `<html lang="de">`: Das Element `<html>` ist das oberste Element und enthält den gesamten Inhalt der Seite. Das Attribut `lang="de"` gibt die Sprache Deutsch des Dokuemntes an. 


- `<head>`: Enthält Metadaten und Verweise auf externe Ressourcen. Hier werden Informationen wie die Zeichencodierung, die Ansichtsgröße, das PWA-Manifest und der Seitentitel angegeben. 
  
  - `<meta charset="UTF-8">`: Legt die Zeichencodierung des Dokuemnets auf UTF-8 fest, um korrekte Darstellung von Sonderzeichen und internationalen Zeichen zu gewährleisten.
  - `<meta name="viewport" content="width=device-width,initial-scale=1.0"/>`: Das Viewport-Meta-Element sorgt dafür, dass die Seite auf verschiedenen Geräten und Bildschirmgrößen richtig skaliert und dargestellt wird.
  - `<meta name="mobile-web-app-capable"content="yes"/>`: Dieses Meta-Element ermöglicht es der Webanwendung, als eigenständige mobile Web-App auf mobilen Geräten installiert und ausgeführt zu werden.
  - `<meta name="ROBOTS"content="INDEX,FOLLOW/">`: Gibt an, dass Suchmaschinen den Inhalt der Seite indexieren und den Link auf der Seite folgen sollen.
  - `<link rel="manifest" href="manifest.webmanifest">`: Verweist auf die Manifest-Datei für die Progressive Web App (PWA). Das Manifest enthält Konfigurationsinformationen wie den App-Namen, das Icon und die Start-URL der PWA.
  - `<link rel="icon" size="512x512" href="images/01_HTWD_logo_RGB_wordmark_color.png"/>`: Verweist auf das Favicon der Seite, das als kleines Icon im Browser-Tab und Lesezeichen angeziegt wird.
  

- `<body>`: Enthält die sichtbaren Inhalte der Webseite.

  - `<header>`: Stellt den Kopfbereich der Seite dar und enthält den Titel des Lernprogramms sowie das Logo von der Hochschule für Technik und Wirtschadt Dresden.
  - `<main>`: Enthält den Hauptinhalt der Webanwendung, einschließlich der Navigation, der Hauptseite, des Fortschrittsbalkens und der Ergebnisanzeige.

    - `<nav>`: Stellt die Navigation für die verschiedenen Lernbereiche dar. Die Auswahl wird in Form von Radio-Buttons dargestellt, um den gewünschten Lernbereich dazustellen.
    - `<article>`: Ist der Hauptbereich der Webanwendung, der den aktuellen Lerninhalt anzeigt. Es enthält Überschriften, eine Aufgabenanzeige, Antwortoptionen und eine Fortschrittsanzeige.
      - `<div id="aufgaben-fortschritt">`: Ein Container, der den Fortschritt des Benutzers bei den Aufgaben anzeigt
      - `<div id="progress-container">`: Ein Container für den Fortschrittsbalken.
      - `<div id="ergebnis-anzeige">`: Ein Container, der das Endergebnis der Aufgabenanzeige anzeigt.

    - `<aside>`: Eine Seitenleiste, die die Erfolgsquoten des Benutzers für verschiedene Lernbereiche anzeigt.
    - `<footer>`: Der Fußbereich der Seite, der Informationen zum Semester und dem Kurs entählt.

### Design der Webanwendung
Dies ist eine zusammengefasste Dokumentation der wichtigsten CSS-Stilelemente, die in der Webanwendung verwendet werden. Diese Stile definieren das Erscheinungsbild der einzelnen Elemente auf der Webseite.

#### Farben und Schriftarten
Der `body`-Element-Stil definiert die Hintergrundfarbe und die Schriftart für den gesamten Inhalt der Webseite.
```
body {
    background-color: var(--main-color);
    font-family: "Arial";
}
```

#### Rahmen und Abstände
Die Element-Boxen `header`, `article`, `nav`, `aside` und `footer` haben alle einen Rahmen, einen definierten Abstand un abgerundete Ecken.
```
header, article, nav, aside, footer {
    margin: 0.5em;
    padding: 0.75em;
    border-radius: 0.5em;
}
```

#### Überschriften 
Die Schriftgröße, Schriftstärke und der untere Abstand der Überschriften in den einzelnen Element-Boxen `article`, `nav` und `aside` sind definiert.
```
h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 14px;
}
```

#### Navigation
Die Radiobuttons in der Navigation haben spezifische Stile für den Container, den Radiobutton selbst das Label und den ausgewählten Zustand.
```
.radio {
    display: flex;
    align-items: center;
    margin: 10px;
}

.radio input[type="radio"] {
    /* ... */
}

.radio label {
    /* ... */
}

.radio input[type="radio"]:checked {
    /* ... */
}

.radio input[type="radio"]:checked + label {
    /* ... */
}

.radio input[type="radio"]:hover {
    /* ... */
}
```

#### Allgemeiner Button-Stil
Die Buttons haben einen einheitlichen Stil.
```
#options {
    /* ... */
}

.option-button {
    /* ... */
}

button {
    /* ... */
}

button:hover {
    /* ... */
}
```




## Architektur der Webanwendung
### Model-View-Presenter-Architektur (MVP)
Die MVP-Architektur ist ein Architekturmuster zur Strukturierung von Softwareprojekten, insbesondere bei der Entwicklung von Benutzeroberflächen. Sie trennt die verschiedenen Komponenten der Anwendung, um die Wiederverwendbarkeit, Testbarkeit und Wartbarkeit zu verbessern.

#### Model
Das Model repräsentiert 

#### View

#### Presenter